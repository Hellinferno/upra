import React from 'react';
import Logo from '../components/Logo';
import { Search, User } from 'lucide-react';
import MegaMenu from '../components/MegaMenu';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children, user }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* 3-ZONE NAVBAR ARCHITECTURE 
        Zone 1 (Left): Logo (Fixed width)
        Zone 2 (Center): Navigation (Flex-grow, Centered)
        Zone 3 (Right): Search/Actions (Fixed width, Right aligned)
      */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* ZONE 1: LOGO */}
                    <div className="flex-shrink-0 w-[200px] flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <Logo />
                    </div>

                    {/* ZONE 2: CENTER MENU (Hidden on mobile) */}
                    <div className="hidden lg:flex flex-1 justify-center items-center px-4">
                        <MegaMenu />
                    </div>

                    {/* ZONE 3: ACTIONS */}
                    <div className="flex-shrink-0 w-[200px] flex items-center justify-end gap-3">
                        {/* Search Input - Desktop */}
                        <div className="hidden md:flex items-center relative group">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                placeholder="Search..."
                                className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full w-32 focus:w-48 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                            />
                        </div>

                        {/* Partner Link */}
                        <button onClick={() => navigate('/partners')} className="hidden md:block text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mr-2">
                            For Partners
                        </button>

                        {/* Login Button */}
                        {user ? (
                            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                                <User className="w-4 h-4" />
                                <span>Dashboard</span>
                            </button>
                        ) : (
                            <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                                <User className="w-4 h-4" />
                                <span>Login</span>
                            </button>
                        )}
                    </div>

                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-0">
                {children}
            </main>

            {/* Optional: Footer can go here */}
        </div>
    );
};

export default MainLayout;
