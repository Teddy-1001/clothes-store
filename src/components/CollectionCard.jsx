import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const CollectionCard = ({ collectionImg, collectionAlt, collectionName, collectionHref, productCount }) => {
    return (
        <Link
            href={collectionHref}
            className='relative h-[420px] overflow-hidden rounded-3xl group block'
        >
            <Image
                src={collectionImg}
                alt={collectionAlt}
                fill
                priority
                className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t
                      from-black/70 via-black/10 to-transparent
                      transition-opacity duration-500
                      group-hover:from-black/80" />

            {/* Product Count Badge */}
            {productCount && (
                <span className="absolute top-5 right-5
                    rounded-full bg-white/15 backdrop-blur-md
                    px-3 py-1.5
                    text-[10px] font-medium tracking-wider
                    text-white/80
                    border border-white/10
                    opacity-0 scale-90
                    transition-all duration-500
                    group-hover:opacity-100 group-hover:scale-100"
                >
                    {productCount} Products
                </span>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                <h2 className="text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-1">
                    {collectionName}
                </h2>

                <div
                    className="mt-2 inline-flex items-center gap-2
                        text-sm font-medium
                        opacity-0 translate-y-2
                        transition-all duration-300
                        group-hover:opacity-100
                        group-hover:translate-y-0"
                >
                    Explore Collection
                    <ArrowRight
                        size={16}
                        className="transition-transform duration-300
                            group-hover:translate-x-1"
                    />
                </div>
            </div>
        </Link>
    )
}

export default CollectionCard