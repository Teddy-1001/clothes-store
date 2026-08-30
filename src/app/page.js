import CollectionCard from "@/components/CollectionCard";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { collections, products } from "@/data/collections";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[580px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-image.jpeg"
          alt="Latest footwear collection"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center text-white">
              {/* Label */}
              <p
                className="inline-block text-xs font-semibold uppercase
                            tracking-[0.3em] border border-white/40
                            rounded-full px-4 py-2"
              >
                New Collection
              </p>

              {/* Heading */}
              <h1
                className="mt-5 text-4xl md:text-6xl
                             font-extrabold leading-[1.05]"
              >
                Step Into Your Best Self.
                <br />
                In Your Size.
              </h1>

              {/* Description */}
              <p
                className="mt-6 max-w-xl
                            rounded-2xl
                            border border-white/20
                            bg-black/70
                            backdrop-blur-md
                            px-6 py-4
                            text-sm md:text-base
                            leading-relaxed
                            text-white/90"
              >
                Premium footwear for every stride. Boots that command respect,
                loafers that whisper luxury, sneakers built for the streets —
                and beyond. Delivered countrywide.
              </p>

              {/* Buttons */}
              <div className="mt-7 flex items-center gap-4">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all duration-300"
                >
                  Explore Collection
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300
               group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/new-arrivals"
                  className="rounded-md border border-white/20
                             px-7 py-3.5 text-sm font-semibold
                             text-white hover:bg-white/10 transition  bg-black/70
                            backdrop-blur-md"
                >
                  View New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link
          href='#collections'
          aria-label="Scroll down"
          className="absolute z-30 bottom-3 left-1/2 -translate-x-1/2
             w-10 h-13
             rounded-full
             border border-white/30
             bg-white/5
             backdrop-blur-sm
             flex flex-col items-center justify-center
             text-white
             animate-bounce
             hover:bg-white/20
             transition"
        >
          <ArrowDown size={18} />

          <span className="text-[7px] font-medium tracking-widest mt-1">
            SCROLL
          </span>
        </Link>
      </section>

      {/* collections */}
      <section id="featured-products" className="bg-white">
        <div className="pt-10">
          <div className="h-px max-w-7xl mx-auto bg-gray-200" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-6xl font-bold text-gray-800 leading-tight">
            Every Occasion Covered
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base
                leading-relaxed text-gray-500">
            From the boardroom to the streets — we have the perfect pair
            for every step you take.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6 py-20">
          {collections.slice(0, 4).map((collection) => (
            <CollectionCard
              key={collection.id}
              collectionImg={collection.image}
              collectionAlt={collection.alt}
              collectionName={collection.name}
              collectionHref={collection.href}
            />
          ))}
        </div>
      </section>

      <section id="collections" className="bg-white">
        <div className="pt-10">
          <div className="h-px w-7xl mx-auto bg-gray-200" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-6xl font-bold text-gray-800 leading-tight">
            Shoes That Turn Heads
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base
                leading-relaxed text-gray-500">
            Our best-selling pairs — chosen by customers who know a great shoe when they see one.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6 py-20">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* who we are */}
      <section className="bg-[#fafaf9] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              Who we are
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
              More than shoes.
              <br />
              It's how you show up.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-500">
              We believe the right pair can change the way you walk into
              a room, step onto the street, or start your day. That's why
              we curate footwear that combines comfort, character and
              timeless style.
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
            >
              Discover our story

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative h-[450px] overflow-hidden rounded-3xl">
            <Image
              src="/images/about-shoes.jpg"
              alt="Our footwear collection"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
