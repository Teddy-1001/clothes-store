"use client";

import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsAppButton = () => {
    const phoneNumber = "254798125596"; // Your WhatsApp number

    const message = encodeURIComponent(
        "Hello, I would like to know more about your collection."
    );

    return (
        // <a
        //     href={`https://wa.me/${phoneNumber}?text=${message}`}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     aria-label="Chat with us on WhatsApp"
        //     className="
        //         group fixed
        //         bottom-5 right-5
        //         z-[55]
        //         flex items-center
        //         rounded-full
        //         bg-[#25D366]
        //         text-white
        //         shadow-[0_10px_30px_rgba(0,0,0,0.15)]
        //         transition-all duration-300
        //         hover:scale-105
        //         hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]
        //         sm:bottom-6 sm:right-6
        //     "
        // >
        //     {/* Label */}
        //     <span
        //         className="
        //             max-w-0
        //             overflow-hidden
        //             whitespace-nowrap
        //             text-xs font-semibold
        //             opacity-0
        //             transition-all duration-600
        //             group-hover:max-w-[120px]
        //             group-hover:mr-2
        //             group-hover:opacity-100 p-2
        //         "
        //     >
        //         Chat with us
        //     </span>

        //     {/* Icon */}
        //     <span className="flex h-12 w-12 items-center justify-center">
        //         {/* <MessageCircle
        //             size={23}
        //             strokeWidth={1.8}
        //         /> */}
        //          <FaWhatsapp size={28} />
        //     </span>
        // </a>
        <a
    href={`https://wa.me/${phoneNumber}?text=${message}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="
        group fixed bottom-6 right-6 z-50
        flex items-center gap-3
        rounded-full
        bg-gray-900
        py-3 pl-3 pr-5
        text-white
        shadow-xl shadow-gray-900/20
        transition-all duration-300
        hover:bg-[#25D366]
        hover:shadow-2xl
        md:bottom-8 md:right-8
    "
>
    <span className="
        flex h-10 w-10 items-center justify-center
        rounded-full bg-[#25D366]
        transition-transform duration-300
        group-hover:scale-105
    ">
        <FaWhatsapp size={22} />
    </span>

    <span className="hidden text-sm font-medium sm:block">
        Chat with us
    </span>
</a>
    );
};

export default WhatsAppButton;