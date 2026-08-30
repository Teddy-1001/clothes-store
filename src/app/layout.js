import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Toast from "@/components/Toast";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Your Clothing Store — Premium Footwear Delivered Countrywide",
  description: "Discover premium footwear for every occasion. Boots, sneakers, loafers, heels & more — delivered countrywide across Kenya.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} min-h-full flex flex-col antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <Toast />
                {children}
              </CompareProvider>
            </WishlistProvider>
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}