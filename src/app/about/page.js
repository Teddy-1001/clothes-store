"use client"

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Sparkles,
    Heart,
    Gem,
    Clock,
} from "lucide-react";
import Header from "@/components/Header";
import AnnouncmentBanner from "@/components/AnnouncmentBanner";
import { motion } from "motion/react";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const AboutPage = () => {

    return (

        <main className="bg-[#fafaf9] text-gray-900">
            <AnnouncmentBanner />
            <Header />
            {/* Hero */}

            <section className="relative overflow-hidden bg-[#f5f4f1]">

                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/shoe-store-bg.jpg"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover -scale-x-100 animate-hero-bg"
                    />
                </div>

                {/* Image overlay */}
                <div className="absolute inset-0 bg-[#f5f4f1]/75" />

                {/* Left-to-right fade for readable text */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f5f4f1]/80 via-[#f5f4f1]/65 to-[#f5f4f1]/30" />
                {/* Content */}
                <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28 lg:gap-24">

                    {/* TEXT */}
                    <div className="relative z-10">

                        <div className="animate-hero-left flex items-center gap-3">
                            <span className="h-px w-8 bg-gray-900" />

                            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-500">
                                Who We Are
                            </p>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 9.9,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="animate-hero-up mt-7 max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-gray-900 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                            Walk with

                            <span className="block font-normal italic text-gray-400">
                                confidence.
                            </span>
                        </motion.h1>

                        <p className="animate-hero-up mt-8 max-w-md text-[15px] leading-7 text-gray-500">
                            We believe the right pair of shoes can transform more than
                            an outfit. It can change the way you move, feel and show up
                            in the world.
                        </p>

                        <div className="mt-10 flex items-center gap-6">

                            <Link
                                href="/shop"
                                className="animate-hero-up group inline-flex items-center gap-3 rounded-full bg-gray-900 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                            >
                                Explore Collection

                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:block">
                                Est. 2026
                            </span>

                        </div>

                    </div>


                    {/* IMAGE COMPOSITION */}
                    <div className="relative mx-auto w-full max-w-[480px]">

                        {/* Decorative circle */}
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-gray-300/60 md:h-40 md:w-40" />


                        {/* Main image */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 100,
                                scale: 0.9,
                                rotate: 3,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                rotate: 0,
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative z-10 ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[2rem] bg-gray-200 shadow-2xl">

                            <Image
                                src="/images/store-1.jpg"
                                alt="Our shoe collection"
                                fill
                                priority
                                sizes="(max-width: 768px) 80vw, 400px"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />

                            {/* Image gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Image text */}
                            <div className="absolute bottom-6 left-6">

                                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70">
                                    The Collection
                                </p>

                                <p className="mt-1 text-lg font-medium text-white">
                                    Designed to move with you.
                                </p>

                            </div>

                        </motion.div>
                        {/* Philosophy card */}
                        <div className="absolute -bottom-8 right-0 z-20 hidden rounded-2xl bg-white/95 px-6 py-5 shadow-xl backdrop-blur-sm md:block">

                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                Our Philosophy
                            </p>

                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                Simple. Confident. Timeless.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Story */}
            <section className="border-t border-gray-200/70 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

                    <div className="grid gap-12 md:grid-cols-[0.7fr_1fr]">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                                Our Story
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                                More than clothes.
                                <span className="block text-gray-400">
                                    A way to express yourself.
                                </span>
                            </h2>
                        </div>

                        <div className="max-w-2xl text-gray-500">
                            <p className="leading-8">
                                We started with a simple belief: fashion should
                                feel personal. Your clothes should not only look
                                good, they should make you feel good.
                            </p>

                            <p className="mt-6 leading-8">
                                Our collections are thoughtfully curated around
                                modern silhouettes, timeless essentials and
                                pieces that can become part of your everyday
                                wardrobe.
                            </p>

                            <p className="mt-6 leading-8">
                                From the first piece you discover to the moment
                                it becomes your favorite, we want every part of
                                your experience with us to feel considered.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


            {/* Values */}
            <section className="bg-[#f3f2ef]">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            What We Believe
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                            Style with intention.
                        </h2>
                    </motion.div>

                    <div className="mt-14 grid gap-5 md:grid-cols-3">
                        <ValueCard
                            number=""
                            icon={Sparkles}
                            title="Individuality"
                            text="We believe fashion should reflect who you are, not simply what is trending."
                        />
                        <ValueCard
                            number=""
                            icon={Gem}
                            title="Quality"
                            text="Every piece is thoughtfully selected for its character, quality and lasting appeal."
                        />

                        <ValueCard
                            number=""
                            icon={Clock}
                            title="Timelessness"
                            text="We look beyond seasons to pieces that remain relevant long after the moment has passed."
                        />

                    </div>

                </div>
            </section>


            {/* Statement */}
            <section className="relative overflow-hidden bg-gray-950 text-white">

                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/clothes-hanger.jpg"
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover opacity-20"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gray-950/30" />
                </div>

                {/* Content */}
                <div className="animate-hero-up relative mx-auto max-w-5xl px-6 py-28 text-center md:py-36">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                        Our Philosophy
                    </p>

                    <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
                        The best style is the one
                        <span className="text-gray-500">
                            {" "}that feels like your own.
                        </span>
                    </h2>

                    <div className="mx-auto mt-10 h-px w-10 bg-gray-700" />

                </div>

            </section>


            {/* CTA */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                        Find Your Style
                    </p>

                    <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                        Discover your next favorite piece.
                    </h2>

                    <Link
                        href="/shop/shoes"
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-gray-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        Shop the Collection
                        <ArrowRight size={16} />
                    </Link>

                </div>
            </section>

        </main>
    );
};


// const ValueCard = ({ icon: Icon, title, text }) => {
//     return (
//         <div className="rounded-3xl bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
//                 <Icon size={20} strokeWidth={1.6} />
//             </div>

//             <h3 className="mt-8 text-xl font-semibold">
//                 {title}
//             </h3>

//             <p className="mt-3 text-sm leading-7 text-gray-500">
//                 {text}
//             </p>

//         </div>
//     );
// };

const ValueCard = ({ number, icon: Icon, title, text }) => {
    return (
        <motion.article
            variants={fadeUp}
            whileHover={{
                y: -10,
                transition: {
                    duration: 0.3,
                },
            }}
            className="
                group relative
                overflow-hidden
                border border-gray-200/80
                bg-white
                px-7 py-8
                transition-all duration-500
                hover:-translate-y-1
                hover:border-gray-300
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]
                sm:px-8 sm:py-9
            "
        >

            {/* Top row */}
            <div className="flex items-start justify-between">

                {/* Icon */}
                <div
                    className="
                        flex h-11 w-11
                        items-center justify-center
                        border border-gray-200
                        bg-gray-50
                        text-gray-700
                        transition-all duration-500
                        group-hover:border-gray-900
                        group-hover:bg-gray-900
                        group-hover:text-white
                    "
                >
                    <Icon
                        size={18}
                        strokeWidth={1.5}
                    />
                </div>

                {/* Number */}
                {number && (
                    <span
                        className="
                            text-[10px]
                            font-semibold
                            tracking-[0.2em]
                            text-gray-300
                            transition-colors duration-300
                            group-hover:text-gray-500
                        "
                    >
                        {number}
                    </span>
                )}

            </div>

            {/* Content */}
            <div className="mt-12">

                <h3
                    className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-950
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-3
                        max-w-sm
                        text-sm
                        leading-7
                        text-gray-500
                    "
                >
                    {text}
                </p>

            </div>

            {/* Bottom accent */}
            <div
                className="
                    absolute bottom-0 left-0
                    h-px w-0
                    bg-gray-900
                    transition-all duration-500
                    group-hover:w-full
                "
            />

        </motion.article>
    );
};

export default AboutPage;