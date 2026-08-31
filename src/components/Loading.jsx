import React from 'react'

const Loading = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#fafaf9]">
                <div className="flex flex-col items-center">

                    <div className="relative flex h-28 w-28 items-center justify-center">

                        {/* Rotating ring */}
                        <div className="absolute inset-0 rounded-full border border-gray-200 border-t-gray-900 animate-spin" />

                        {/* Logo */}
                        <div className="relative flex h-20 w-20 items-center justify-center animate-pulse">
                            <img
                                src="/images/logo_header_png.png"
                                alt="Your Store"
                                className="max-h-14 max-w-[70px] object-contain"
                            />
                        </div>

                    </div>

                    <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-400">
                        Curating your style
                    </p>

                    <div className="mt-4 flex gap-1">
                        <span className="h-1 w-1 rounded-full bg-gray-900 animate-bounce" />
                        <span className="h-1 w-1 rounded-full bg-gray-900 animate-bounce [animation-delay:150ms]" />
                        <span className="h-1 w-1 rounded-full bg-gray-900 animate-bounce [animation-delay:300ms]" />
                    </div>

                </div>
            </main>
  )
}

export default Loading