import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlaslaLogo } from './Icons';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-alasla-gray-medium shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <AlaslaLogo className="h-8 w-auto text-alasla-red" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-alasla-dark hidden sm:block">
                            Hola, {user?.name}
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 border border-alasla-gray-medium text-sm font-semibold rounded-full text-alasla-dark bg-white hover:bg-alasla-gray-light transition-colors focus:outline-none focus:ring-2 focus:ring-alasla-red-start/50"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;