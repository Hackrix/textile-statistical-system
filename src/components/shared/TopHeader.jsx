import { useState, useEffect } from 'react';

export default function TopHeader(){
    const [fontScale, setFontScale] = useState(100);

    useEffect(() => {
        // Apply font scale to the entire document
        document.documentElement.style.fontSize = `${fontScale}%`;
    }, [fontScale]);

    return(
        <>
        {/* Top Bar */}
            <div className="bg-[#101828] text-white text-xs h-10 sm:h-10">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 h-full">
                    <div className="flex items-center justify-between gap-2 sm:gap-3 h-full">
                        {/* Left: Flag + Text */}
                        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                            <span role="img" aria-label="India flag" className="text-sm sm:text-base flex-shrink-0">🇮🇳</span>
                            <span className="font-medium truncate text-[10px] sm:text-xs">
                                <span className="hidden md:inline">भारत सरकार | </span>
                                <span className="hidden sm:inline">Government of India</span>
                                <span className="sm:hidden">GoI</span>
                            </span>
                        </div>

                        {/* Right: Skip, Font size, Language */}
                        <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-shrink-0">
                            <a
                                href="#main-content"
                                className="hidden sm:inline underline underline-offset-2 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-[10px] sm:text-xs"
                            >
                                Skip to content
                            </a>

                            <div className="flex items-center gap-0.5 sm:gap-1" aria-label="Font size controls">
                                <button
                                    type="button"
                                    onClick={() => setFontScale((s) => Math.min(125, s + 10))}
                                    className="px-1 sm:px-1.5 py-0.5 rounded hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-[10px] sm:text-xs"
                                    aria-label="Increase font size"
                                >
                                    A+
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFontScale(100)}
                                    className="px-1 sm:px-1.5 py-0.5 rounded hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-[10px] sm:text-xs"
                                    aria-label="Default font size"
                                >
                                    A
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFontScale((s) => Math.max(85, s - 10))}
                                    className="px-1 sm:px-1.5 py-0.5 rounded hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-[10px] sm:text-xs"
                                    aria-label="Decrease font size"
                                >
                                    A-
                                </button>
                            </div>

                            <button
                                type="button"
                                className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                aria-label="Language selector"
                            >
                                {/* Globe icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 sm:h-4 sm:w-4">
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm7.93 9h-3.06a15.33 15.33 0 00-1.2-5.03A8.03 8.03 0 0119.93 11ZM15.7 11H8.3a13.9 13.9 0 011.33-4.58C10.34 5.4 10.88 4.7 12 4.7s1.66.7 2.37 1.72A13.9 13.9 0 0115.7 11Zm-7.64 2h7.88a13.9 13.9 0 01-1.33 4.58c-.71 1.02-1.25 1.72-2.37 1.72s-1.66-.7-2.37-1.72A13.9 13.9 0 018.06 13Zm6.91-9.03A15.33 15.33 0 0115.87 11H19c-.2-2.17-1.27-4.14-2.99-5.53ZM5 11h3.13c.2-2.17 1.27-4.14 2.99-5.53A8.03 8.03 0 005 11Zm0 2c.2 2.17 1.27 4.14 2.99 5.53A8.03 8.03 0 008.13 13H5Z" />
                                </svg>
                                <span className="text-[10px] sm:text-xs">
                                    <span className="hidden sm:inline">English</span>
                                    <span className="sm:hidden">EN</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
