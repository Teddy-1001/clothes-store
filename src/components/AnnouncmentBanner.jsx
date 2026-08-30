import React from 'react'

const AnnouncmentBanner = () => {
    return (
        <div className='overflow-hidden bg-black text-white'>
            <div className="flex w-max animate-marquee whitespace-nowrap">
                <div className="flex items-center gap-10 px-6 py-2.5 text-[11px]">
                    <span>Serving customers since 2017.</span>

                    <span className="h-1 w-1 rounded-full bg-white/50" />

                    <span>
                        Free countrywide delivery on orders over KES 5,000
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/50" />

                    <span>
                        Order via WhatsApp: 0713 075 115 / 0742 447 423
                    </span>

                    <span className="h-1 w-1 rounded-full bg-white/50" />
                </div>

                <div className="flex items-center gap-10 px-6 py-2.5 text-[11px]">
                    <span>Serving customers since 2017.</span>

                    <span className="h-1 w-1 rounded-full bg-white/50" />

                    <span>
                        Free countrywide delivery on orders over KES 5,000
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/50" />

                    <span>
                        Order via WhatsApp: 0713 075 115 / 0742 447 423
                    </span>

                    <span className="h-1 w-1 rounded-full bg-white/50" />
                </div>
            </div>
        </div>
    )
}

export default AnnouncmentBanner