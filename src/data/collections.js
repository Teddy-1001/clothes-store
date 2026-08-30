export const collections = [
  {
    id: 1,
    name: "Running Shoes",
    image: "/images/running-shoes.jpg",
    alt: "Running shoes collection",
    description: "Lightweight and comfortable shoes built for every run.",
    href: "/shop/running-shoes",
  },

  {
    id: 2,
    name: "Casual Shoes",
    image: "/images/slides.jpg",
    alt: "Casual shoes collection",
    description: "Everyday styles that keep you comfortable and looking sharp.",
    href: "/shop/slides",
  },

  {
    id: 3,
    name: "Slides & Sandals",
    image: "/images/slides.jpg",
    alt: "Slides and sandals collection",
    description: "Easygoing comfort for relaxed days and warm weather.",
    href: "/shop/slides-sandals",
  },

  {
    id: 4,
    name: "Boots",
    image: "/images/boots.jpg",
    alt: "Boots collection",
    description: "Bold and durable footwear built to make an impression.",
    href: "/shop/boots",
  },

  {
    id: 5,
    name: "Sneakers",
    image: "/images/sneakers.jpg",
    alt: "Sneakers collection",
    description: "Fresh streetwear styles made for everyday movement.",
    href: "/shop/sneakers",
  },

  {
    id: 6,
    name: "Formal Shoes",
    image: "/images/formal-shoes.jpg",
    alt: "Formal shoes collection",
    description: "Refined footwear for work, events and special occasions.",
    href: "/shop/formal-shoes",
  },

  {
    id: 7,
    name: "Loafers",
    image: "/images/loafers.jpg",
    alt: "Loafers collection",
    description: "Effortless sophistication with timeless comfort.",
    href: "/shop/loafers",
  },

  {
    id: 8,
    name: "Heels",
    image: "/images/heels.jpg",
    alt: "Heels collection",
    description: "Elegant silhouettes designed to elevate every outfit.",
    href: "/shop/heels",
  },
];

export const products = [
    {
        id: 1,
        name: "Urban Runner",
        category: "Running Shoes",
        slug: "urban-runner",

        price: 4500,
        oldPrice: 5200,

        image: "/images/running-shoes.jpg",

        images: [
            "/images/running-shoes.jpg",
            "/images/running-shoes-side.jpg",
            "/images/running-shoes-back.jpg",
        ],

        alt: "Urban Runner running shoes",

        description:
            "Lightweight running shoes designed for comfort and everyday performance.",

        sizes: [39, 40, 41, 42, 43, 44],

        colors: ["Black", "White"],

        rating: 4.8,
        reviews: 124,

        inStock: true,
        featured: true,
    },


    {
        id: 2,
        name: "Classic Leather",
        category: "Formal Shoes",
        slug: "classic-leather",

        price: 5500,
        oldPrice: 6500,

        image: "/images/formal-shoes.jpg",

        images: [
            "/images/formal-shoes.jpg",
            "/images/formal-shoes-side.jpg",
            "/images/formal-shoes-back.jpg",
        ],

        alt: "Classic leather formal shoes",

        description:
            "Premium leather shoes designed for formal occasions and professional wear.",

        sizes: [40, 41, 42, 43, 44],

        colors: ["Black", "Brown"],

        rating: 4.9,
        reviews: 87,

        inStock: true,
        featured: true,
    },


    {
        id: 3,
        name: "Street Flex",
        category: "Sneakers",
        slug: "street-flex",

        price: 3800,

        image: "/images/sneakers.jpg",

        images: [
            "/images/sneakers.jpg",
            "/images/sneakers-side.jpg",
            "/images/sneakers-back.jpg",
        ],

        alt: "Street Flex sneakers",

        description:
            "Modern sneakers combining street style with all-day comfort.",

        sizes: [38, 39, 40, 41, 42, 43, 44],

        colors: ["Black", "Grey", "White"],

        rating: 4.7,
        reviews: 213,

        inStock: true,
        featured: true,
    },


    {
        id: 4,
        name: "Desert Boot",
        category: "Boots",
        slug: "desert-boot",

        price: 6200,

        image: "/images/boots.jpg",

        images: [
            "/images/boots.jpg",
            "/images/boots-side.jpg",
            "/images/boots-back.jpg",
        ],

        alt: "Desert boots",

        description:
            "Rugged yet refined boots made for everyday adventures.",

        sizes: [40, 41, 42, 43, 44, 45],

        colors: ["Brown", "Black"],

        rating: 4.6,
        reviews: 76,

        inStock: true,
        featured: false,
    },


    {
        id: 5,
        name: "Easy Slide",
        category: "Slides & Sandals",
        slug: "easy-slide",

        price: 1800,

        image: "/images/slides.jpg",

        images: [
            "/images/slides.jpg",
            "/images/slides-side.jpg",
            "/images/slides-back.jpg",
        ],

        alt: "Comfortable casual slides",

        description:
            "Simple and comfortable slides for relaxed everyday wear.",

        sizes: [39, 40, 41, 42, 43, 44],

        colors: ["Black", "Brown", "Cream"],

        rating: 4.5,
        reviews: 158,

        inStock: true,
        featured: false,
    },


    {
        id: 6,
        name: "Premium Loafer",
        category: "Loafers",
        slug: "premium-loafer",

        price: 4800,
        oldPrice: 5500,

        image: "/images/loafers.jpg",

        images: [
            "/images/loafers.jpg",
            "/images/loafers-side.jpg",
            "/images/loafers-back.jpg",
        ],

        alt: "Premium leather loafers",

        description:
            "Elegant loafers crafted for effortless sophistication.",

        sizes: [40, 41, 42, 43, 44],

        colors: ["Black", "Brown"],

        rating: 4.8,
        reviews: 91,

        inStock: true,
        featured: true,
    },


    {
        id: 7,
        name: "City Heels",
        category: "Heels",
        slug: "city-heels",

        price: 4200,

        image: "/images/heels.jpg",

        images: [
            "/images/heels.jpg",
            "/images/heels-side.jpg",
            "/images/heels-back.jpg",
        ],

        alt: "Women's city heels",

        description:
            "Elegant heels designed to elevate your everyday and evening looks.",

        sizes: [36, 37, 38, 39, 40, 41],

        colors: ["Black", "Red", "Nude"],

        rating: 4.7,
        reviews: 64,

        inStock: true,
        featured: true,
    },


    {
        id: 8,
        name: "Everyday Casual",
        category: "Casual Shoes",
        slug: "everyday-casual",

        price: 3200,

        image: "/images/slides.jpg",

        images: [
            "/images/slides.jpg",
            "/images/slides-side.jpg",
            "/images/slides-back.jpg",
        ],

        alt: "Everyday casual shoes",

        description:
            "Versatile casual shoes that pair effortlessly with any outfit.",

        sizes: [39, 40, 41, 42, 43, 44],

        colors: ["White", "Black", "Grey"],

        rating: 4.6,
        reviews: 112,

        inStock: true,
        featured: false,
    },
];