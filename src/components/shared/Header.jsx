import { useEffect, useState } from "react";
import TopHeader from "./TopHeader";

const Header = () => {
    const [fontScale, setFontScale] = useState(100);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontScale}%`;
    }, [fontScale]);

    return (
        <header className="w-full">
            <TopHeader />
            {/* Main Header */}
            <div className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-neutral-900">
                    <div className="flex flex-col items-start justify-between gap-2 sm:gap-3 sm:flex-row sm:items-center">
                        {/* Left: Emblem + TSRS logo text */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            {/* Emblem placeholder */}
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-neutral-200 grid place-items-center text-neutral-500 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm0 3a7 7 0 110 14 7 7 0 010-14Z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <div className="text-xs sm:text-sm text-neutral-600 truncate">
                                    <span className="hidden md:inline">Government of India</span>
                                    <span className="md:hidden">GoI</span>
                                </div>
                                <div className="text-lg sm:text-xl font-semibold leading-5 sm:leading-6">TSRS</div>
                                <div className="text-[10px] sm:text-[11px] text-neutral-500 tracking-wide truncate">
                                    <span className="hidden sm:inline">Textile Statistical Returns System</span>
                                    <span className="sm:hidden">Textile Returns System</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Links */}
                        <nav className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-end">
                            <a
                                href="#help"
                                className="flex items-center gap-1 sm:gap-1.5 text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded text-sm sm:text-base"
                            >
                                {/* Headset icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                                    <path d="M12 2a8 8 0 00-8 8v3a3 3 0 003 3h1v-6H5v-0.5A7 7 0 0112 3a7 7 0 017 7.5V10h-3v6h1a3 3 0 003-3v-3a8 8 0 00-8-8Z" />
                                </svg>
                                <span className="hidden md:inline">Help &amp; Support</span>
                                <span className="md:hidden">Help</span>
                            </a>
                            <a
                                href="#login"
                                className="text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 sm:bg-transparent font-medium text-sm sm:text-base"
                            >
                                Login
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;