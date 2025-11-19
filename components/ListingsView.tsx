import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Home, ShieldCheck, ImageIcon, CheckCircle, PlusIcon } from './Icons';

interface PropertyData {
    street: string;
    exteriorNumber: string;
    interiorNumber: string;
    city: string;
    state: string;
    description: string;
}

interface ListingsViewProps {
    isContractPending: boolean;
}

const PropertyListingCard: React.FC<{ property: PropertyData, isPending: boolean }> = ({ property, isPending }) => {
    const fullAddress = `${property.street} ${property.exteriorNumber}${property.interiorNumber ? ` ${property.interiorNumber}` : ''}`;
    const location = `${property.city}, ${property.state}`;

    return (
        <div className="bg-white rounded-2xl border border-alasla-gray-medium overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group hover:scale-[1.02] transform">
            <div className="relative aspect-video bg-alasla-gray-light flex items-center justify-center overflow-hidden">
                <ImageIcon className="w-16 h-16 text-alasla-gray-medium transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent"></div>
                
                {isPending ? (
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-md border border-blue-200/50">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Pendiente de Aprobación</span>
                    </div>
                ) : (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-md border border-green-200/50">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Activo</span>
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col h-full">
                <div className='flex-grow'>
                    <p className="font-semibold text-lg text-alasla-dark truncate" title={fullAddress}>{fullAddress}</p>
                    <p className="text-sm text-alasla-gray-dark">{location}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-alasla-gray-medium/50">
                     <button 
                        disabled={isPending}
                        className="w-full text-center px-4 py-2 bg-alasla-dark text-white text-sm font-semibold rounded-lg hover:bg-alasla-dark/90 transition-colors focus:outline-none focus:ring-2 focus:ring-alasla-red-start/50 disabled:bg-alasla-gray-dark disabled:cursor-not-allowed">
                        Administrar
                     </button>
                </div>
            </div>
        </div>
    );
};

const EmptyState: React.FC = () => (
    <div className="text-center py-16 px-6 border-2 border-dashed border-alasla-gray-medium rounded-2xl bg-white">
        <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-alasla-gray-light mb-6">
            <Home className="w-8 h-8 text-alasla-gray-dark" />
        </div>
        <h2 className="text-xl font-bold text-alasla-dark">Aún no se muestra tu inmueble</h2>
        <p className="text-base text-alasla-gray-dark max-w-sm mx-auto mt-2">
            Tu propiedad aparecerá aquí una vez que nuestro equipo haya aprobado tu cuenta. ¡Gracias por tu paciencia!
        </p>
    </div>
);


const ListingsView: React.FC<ListingsViewProps> = ({ isContractPending }) => {
    const { user } = useAuth();
    const [property, setProperty] = useState<PropertyData | null>(null);

    useEffect(() => {
        if (user) {
            const savedPropertyData = localStorage.getItem(`property_listing_${user.id}`);
            if (savedPropertyData) {
                setProperty(JSON.parse(savedPropertyData));
            }
        }
    }, [user]);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-alasla-dark">Mi Inmueble</h1>
                 <button
                    disabled={isContractPending}
                    className="flex items-center space-x-2 px-4 py-2 bg-alasla-red-start text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-alasla-red/50 focus:ring-offset-2 disabled:bg-alasla-red-start/50 disabled:cursor-not-allowed"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Añadir Inmueble</span>
                </button>
            </div>
            
            {property ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PropertyListingCard property={property} isPending={isContractPending} />
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default ListingsView;