
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlaslaLogo, LayoutGridIcon, SettingsIcon, LogOutIcon } from './Icons';
import { ViewType } from '../pages/HostDashboardPage';

interface SideMenuProps {
    activeView: ViewType;
    onNavigate: (view: ViewType) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ activeView, onNavigate }) => {
    const { user, logout } = useAuth();

    const menuItems = [
        { id: 'dashboard' as ViewType, icon: LayoutGridIcon, label: 'Dashboard' },
    ];

    return (
        <aside className="w-20 bg-white border-r border-alasla-gray-medium flex flex-col h-screen fixed top-0 left-0 z-40">
            <div className="h-16 flex-shrink-0 flex items-center justify-center border-b border-alasla-gray-medium">
                 <AlaslaLogo className="h-8 w-auto text-alasla-red" />
            </div>
            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                {menuItems.map(item => (
                    <div key={item.id} className="px-2">
                        <button
                            onClick={() => onNavigate(item.id)}
                            className={`relative flex w-full items-center justify-center p-3 rounded-lg transition-colors group text-left ${
                                activeView === item.id ? 'bg-alasla-red/10 text-alasla-red-start' : 'text-alasla-gray-dark hover:bg-alasla-gray-light'
                            }`}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="absolute left-full ml-4 px-3 py-1.5 text-sm font-semibold text-white bg-alasla-dark rounded-md shadow-lg opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap z-10">
                                {item.label}
                            </span>
                        </button>
                    </div>
                ))}
            </nav>
            <div className="py-4 border-t border-alasla-gray-medium space-y-1">
                 <div className="px-2">
                    <button 
                        onClick={() => onNavigate('configuracion')}
                        className={`relative flex w-full items-center justify-center p-3 rounded-lg group transition-colors ${
                            activeView === 'configuracion' ? 'bg-alasla-red/10 text-alasla-red-start' : 'text-alasla-gray-dark hover:bg-alasla-gray-light'
                        }`}
                    >
                        <SettingsIcon className="h-6 w-6" />
                        <span className="absolute left-full ml-4 px-3 py-1.5 text-sm font-semibold text-white bg-alasla-dark rounded-md shadow-lg opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap z-10">
                            Configuración
                        </span>
                    </button>
                </div>
                <div className="px-2">
                    <button onClick={logout} className="relative flex w-full items-center justify-center p-3 rounded-lg text-alasla-gray-dark hover:bg-alasla-gray-light group">
                        <LogOutIcon className="h-6 w-6" />
                         <span className="absolute left-full ml-4 px-3 py-1.5 text-sm font-semibold text-white bg-alasla-dark rounded-md shadow-lg opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap z-10">
                            Cerrar Sesión
                        </span>
                    </button>
                </div>
            </div>
             <div className="p-4 border-t border-alasla-gray-medium">
                 <div className="relative group flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-alasla-gray-medium flex items-center justify-center font-bold text-alasla-dark flex-shrink-0 cursor-pointer">
                        {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute left-full ml-4 px-3 py-1.5 text-sm font-semibold text-white bg-alasla-dark rounded-md shadow-lg opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none whitespace-nowrap z-10">
                        {user?.name}
                    </span>
                </div>
            </div>
        </aside>
    );
}

export default SideMenu;
