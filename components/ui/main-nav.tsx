'use client';

import { useState } from 'react';
import Link from 'next/link';

export function MainNav() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <>
            {/* Utility Bar */}
            <div className="bg-gray-100 border-b border-gray-200 text-xs py-2">
                <div className="container mx-auto px-4 flex justify-end">
                    <Link className="text-gray-600 hover:text-black font-medium" href="/partners">Partner Login</Link>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">U</div>
                            <span className="text-xl font-bold tracking-tight text-black">UPRA</span>
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-black"
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        aria-expanded={isNavOpen ? "true" : "false"}
                        aria-label="Toggle navigation"
                    >
                        ☰
                    </button>

                    <nav className={`${isNavOpen ? 'absolute top-16 left-0 w-full bg-white border-b border-gray-200 p-4 shadow-lg flex flex-col' : 'hidden'} md:static md:w-auto md:bg-transparent md:border-none md:p-0 md:shadow-none md:flex md:flex-row md:items-center gap-6 text-sm font-medium`}>
                        <Link href="/startup" className="hover:text-purple-600 transition-colors text-black">Startup</Link>
                        <Link href="#" className="hover:text-purple-600 transition-colors text-black">Registrations</Link>
                        <Link href="#" className="hover:text-purple-600 transition-colors text-black">GST</Link>
                        <Link href="#" className="hover:text-purple-600 transition-colors text-black">Income Tax</Link>
                        <Link href="#" className="hover:text-purple-600 transition-colors text-black">MCA</Link>
                        <Link href="#" className="hover:text-purple-600 transition-colors text-black">Compliances</Link>
                        <Link href="#" className="hover:text-purple-600 transition-colors text-black">Global</Link>
                    </nav>

                    <div className="hidden md:block">
                        <Link href="/login" className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                            Login
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
