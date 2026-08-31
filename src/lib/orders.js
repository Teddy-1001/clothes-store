import pool from "@/lib/db";

const STATUS_LABELS = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    completed: "Completed",
    cancelled: "Cancelled",
};

export function formatOrderStatus(status) {
    return STATUS_LABELS[status] || status;
}

export function formatOrder(row, items = []) {
    const primaryItem = items[0];

    return {
        id: row.id,
        orderNumber: row.order_number,
        customer: row.customer_name,
        email: row.customer_email,
        phone: row.customer_phone,
        product: primaryItem?.product_name || "—",
        itemCount: items.length,
        items: items.map((item) => ({
            id: item.id,
            productId: item.product_id,
            productName: item.product_name,
            productImage: item.product_image,
            size: item.size,
            color: item.color,
            quantity: Number(item.quantity) || 0,
            unitPrice: Number(item.unit_price) || 0,
            lineTotal: Number(item.line_total) || 0,
        })),
        amount: Number(row.total) || 0,
        subtotal: Number(row.subtotal) || 0,
        shipping: Number(row.shipping) || 0,
        status: row.status,
        statusLabel: formatOrderStatus(row.status),
        paymentMethod: row.payment_method,
        createdAt: row.created_at,
        date: row.created_at
            ? new Date(row.created_at).toLocaleDateString("en-KE", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              })
            : "",
    };
}

async function ordersTableExists() {
    const result = await pool.query(
        `SELECT to_regclass('public.orders') AS table_name`,
    );

    return Boolean(result.rows[0]?.table_name);
}

async function loadOrderItems(orderIds) {
    if (!orderIds.length) {
        return new Map();
    }

    const result = await pool.query(
        `SELECT
            id,
            order_id,
            product_id,
            product_name,
            product_image,
            size,
            color,
            quantity,
            unit_price,
            line_total
         FROM order_items
         WHERE order_id = ANY($1::bigint[])
         ORDER BY id ASC`,
        [orderIds],
    );

    const itemsByOrder = new Map();

    for (const item of result.rows) {
        const list = itemsByOrder.get(item.order_id) || [];
        list.push(item);
        itemsByOrder.set(item.order_id, list);
    }

    return itemsByOrder;
}

export async function getOrders({ limit } = {}) {
    if (!(await ordersTableExists())) {
        return [];
    }

    const values = [];
    let limitClause = "";

    if (limit) {
        values.push(limit);
        limitClause = `LIMIT $1`;
    }

    const result = await pool.query(
        `SELECT
            id,
            order_number,
            user_id,
            customer_name,
            customer_email,
            customer_phone,
            status,
            subtotal,
            shipping,
            total,
            payment_method,
            created_at
         FROM orders
         ORDER BY created_at DESC, id DESC
         ${limitClause}`,
        values,
    );

    const orderIds = result.rows.map((row) => row.id);
    const itemsByOrder = await loadOrderItems(orderIds);

    return result.rows.map((row) =>
        formatOrder(row, itemsByOrder.get(row.id) || []),
    );
}

export async function getManagerDashboard() {
    const [productCount, customerCount] = await Promise.all([
        pool.query(`SELECT COUNT(*)::int AS count FROM products`),
        pool.query(
            `SELECT COUNT(*)::int AS count FROM users WHERE role = 'customer'`,
        ),
    ]);

    let orders = [];
    let totalSales = 0;
    let orderCount = 0;

    if (await ordersTableExists()) {
        const [ordersResult, salesResult] = await Promise.all([
            pool.query(
                `SELECT
                    id,
                    order_number,
                    customer_name,
                    customer_email,
                    customer_phone,
                    status,
                    subtotal,
                    shipping,
                    total,
                    payment_method,
                    created_at
                 FROM orders
                 ORDER BY created_at DESC, id DESC
                 LIMIT 5`,
            ),
            pool.query(
                `SELECT
                    COUNT(*)::int AS order_count,
                    COALESCE(SUM(total), 0)::numeric AS total_sales
                 FROM orders
                 WHERE status <> 'cancelled'`,
            ),
        ]);

        const orderIds = ordersResult.rows.map((row) => row.id);
        const itemsByOrder = await loadOrderItems(orderIds);

        orders = ordersResult.rows.map((row) =>
            formatOrder(row, itemsByOrder.get(row.id) || []),
        );

        orderCount = salesResult.rows[0]?.order_count || 0;
        totalSales = Number(salesResult.rows[0]?.total_sales) || 0;
    }

    return {
        stats: {
            totalSales,
            orderCount,
            productCount: productCount.rows[0]?.count || 0,
            customerCount: customerCount.rows[0]?.count || 0,
        },
        recentOrders: orders,
    };
}
