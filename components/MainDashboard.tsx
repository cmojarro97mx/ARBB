
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileClock, Home, TrendingUpIcon, BarChart, UserCircle, CalendarIcon } from './Icons';
import { ViewType } from '../pages/HostDashboardPage';

interface MainDashboardProps {
    isContractPending: boolean;
    onNavigate: (view: ViewType) => void;
}

// --- Mock Data ---
const statsData = {
    activeListings: 0,
    monthlyRevenue: 0,
    revenueChange: 0,
};

const upcomingBookingsData: { guest: string; dates: string; property: string }[] = [];

const recentActivityData: { type: string; description: string; time: string }[] = [];

// --- Sub-components for the Dashboard ---

const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string; change?: number; changeType?: 'increase' | 'decrease' | 'neutral' }> = ({ icon: Icon, title, value, change }) => {
    const isPositive = change !== undefined && change >= 0;
    return (
        <div className="bg-white p-6 rounded-2xl border border-alasla-gray-medium shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-alasla-gray-dark">{title}</h3>
                <div className="p-2 bg-alasla-gray-light rounded-lg">
                    <Icon className="w-5 h-5 text-alasla-dark" />
                </div>
            </div>
            <p className="text-3xl font-bold text-alasla-dark mt-4">{value}</p>
            {change !== undefined && (
                <div className="flex items-center mt-2 text-xs">
                    <TrendingUpIcon className={`w-4 h-4 mr-1 ${isPositive ? 'text-green-500' : 'text-red-500 transform rotate-90'}`} />
                    <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{change.toFixed(2)}%</span>
                    <span className="text-alasla-gray-dark ml-1">vs. mes anterior</span>
                </div>
            )}
        </div>
    );
};


const UpcomingBookingsCard: React.FC<{ bookings: typeof upcomingBookingsData }> = ({ bookings }) => (
    <div className="bg-white p-6 rounded-2xl border border-alasla-gray-medium shadow-sm md:col-span-2">
        <div className="flex items-center mb-4">
             <CalendarIcon className="w-5 h-5 text-alasla-dark mr-3"/>
             <h3 className="text-lg font-bold text-alasla-dark">Próximas Reservas</h3>
        </div>
        {bookings.length > 0 ? (
             <ul className="space-y-4">
                {bookings.map((booking, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-alasla-gray-light rounded-lg">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-alasla-gray-medium flex items-center justify-center mr-3">
                                <UserCircle className="w-5 h-5 text-alasla-gray-dark" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-alasla-dark">{booking.guest}</p>
                                <p className="text-xs text-alasla-gray-dark">{booking.dates}</p>
                            </div>
                        </div>
                        <a href="#" className="text-xs font-bold text-alasla-red-start hover:underline">Ver detalles</a>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="text-center py-8">
                <p className="font-semibold text-alasla-dark">Aún no tienes reservas</p>
                <p className="text-sm text-alasla-gray-dark mt-1">Tus próximas estancias aparecerán aquí.</p>
            </div>
        )}
    </div>
);

const RecentActivityCard: React.FC<{ activities: typeof recentActivityData }> = ({ activities }) => {
    const getIcon = (type: string) => {
        switch(type) {
            case 'contract': return <FileClock className="w-5 h-5 text-blue-600" />;
            case 'account': return <UserCircle className="w-5 h-5 text-green-600" />;
            default: return <BarChart className="w-5 h-5 text-alasla-gray-dark" />;
        }
    };
    const getBgColor = (type: string) => {
        switch(type) {
            case 'contract': return 'bg-blue-100/80';
            case 'account': return 'bg-green-100/80';
            default: return 'bg-alasla-gray-light';
        }
    };

    return (
         <div className="bg-white p-6 rounded-2xl border border-alasla-gray-medium shadow-sm">
             <div className="flex items-center mb-4">
                 <BarChart className="w-5 h-5 text-alasla-dark mr-3"/>
                 <h3 className="text-lg font-bold text-alasla-dark">Actividad Reciente</h3>
            </div>
            {activities.length > 0 ? (
                <ul className="space-y-3">
                    {activities.map((activity, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${getBgColor(activity.type)}`}>
                                {getIcon(activity.type)}
                            </div>
                            <div>
                                <p className="text-sm text-alasla-dark">{activity.description}</p>
                                <p className="text-xs text-alasla-gray-dark">{activity.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                 <div className="text-center py-8">
                    <p className="font-semibold text-alasla-dark">Sin actividad reciente</p>
                    <p className="text-sm text-alasla-gray-dark mt-1">Tus notificaciones aparecerán aquí.</p>
                </div>
            )}
        </div>
    );
};

const MainDashboard: React.FC<MainDashboardProps> = ({ isContractPending, onNavigate }) => {
    const { user } = useAuth();

    return (
        <div className="animate-fade-in space-y-8">
            {isContractPending && (
                <div className="p-6 bg-blue-100/70 border border-blue-200 rounded-xl flex items-start space-x-4 shadow-sm">
                    <div className="flex-shrink-0 bg-blue-200/80 rounded-full p-2">
                        <FileClock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-blue-900">Tu cuenta está en revisión</h3>
                        <p className="text-sm text-blue-700 mt-1">
                            ¡Gracias por completar tu registro! Tu contrato ha sido enviado y nuestro equipo lo está revisando. Este banner desaparecerá y tu anuncio se activará una vez que sea aprobado.
                        </p>
                    </div>
                </div>
            )}

            <div>
                <h1 className="text-3xl font-bold text-alasla-dark">Dashboard</h1>
                <p className="text-alasla-gray-dark mt-1">
                    ¡Bienvenido de nuevo, {user?.name}! Aquí tienes un resumen de tu actividad.
                </p>
            </div>

            {/* Main grid for dashboard cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={Home} title="Inmuebles Activos" value={String(statsData.activeListings)} />
                <StatCard icon={TrendingUpIcon} title="Ingresos (últimos 30 días)" value={`$${statsData.monthlyRevenue.toLocaleString('es-MX')}`} change={statsData.revenueChange} />
                
                {/* Larger cards */}
                <UpcomingBookingsCard bookings={upcomingBookingsData} />
                <RecentActivityCard activities={recentActivityData} />
            </div>
        </div>
    );
};

export default MainDashboard;
