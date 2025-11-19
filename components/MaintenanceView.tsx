import React, { useState, useMemo, useEffect, useRef } from 'react';
import { WrenchIcon, ArrowRightIcon, ChevronDownIcon, XIcon, ImageIcon, InfoIcon } from './Icons';

// --- Mock Data ---
const properties = [
    { id: 'prop1', name: 'Casa de Campo', address: 'Av. Siempre Viva 742' },
    { id: 'prop2', name: 'Departamento Céntrico', address: 'Calle Falsa 123' },
    { id: 'prop3', name: 'Villa con Alberca', address: 'Paseo de la Reforma 222' },
];

const maintenanceTickets = [
    { id: 'm1', propertyId: 'prop1', description: 'Fuga en lavabo del baño principal', category: 'Plomería', status: 'completado', dateReported: '2024-07-10', dateCompleted: '2024-07-12', cost: 850.00, details: 'Se reemplazó el empaque del grifo y se selló la base. El material utilizado fue de alta durabilidad para prevenir futuras fugas.', photos: [] },
    { id: 'm2', propertyId: 'prop2', description: 'Cambio de cerradura en puerta principal', category: 'Cerrajería', status: 'completado', dateReported: '2024-06-25', dateCompleted: '2024-06-25', cost: 1200.50, details: 'Se instaló una cerradura de alta seguridad marca Phillips. Se entregaron 3 copias de la nueva llave.', photos: [] },
    { id: 'm3', propertyId: 'prop1', description: 'Corto circuito en la cocina', category: 'Electricidad', status: 'en_progreso', dateReported: '2024-07-18', dateCompleted: null, cost: null, details: 'El electricista está revisando el cableado. Parece ser un problema con el tomacorriente del refrigerador. Se requiere cambio de pastilla térmica.', photos: [] },
    { id: 'm4', propertyId: 'prop3', description: 'Mantenimiento preventivo del aire acondicionado', category: 'General', status: 'completado', dateReported: '2024-05-15', dateCompleted: '2024-05-16', cost: 2500.00, details: 'Limpieza de filtros, revisión de niveles de gas y lubricación de motor. Equipo funcionando en óptimas condiciones.', photos: [] },
    { id: 'm5', propertyId: 'prop2', description: 'Pintura de la habitación de invitados', category: 'Pintura', status: 'pendiente', dateReported: '2024-07-20', dateCompleted: null, cost: null, details: 'Se requiere pintar la pared norte que tiene manchas de humedad. Se comprará pintura antihongos. Programado para la próxima semana.', photos: [] },
    { id: 'm6', propertyId: 'prop1', description: 'Reparación de calentador de agua', category: 'Plomería', status: 'completado', dateReported: '2024-04-01', dateCompleted: '2024-04-02', cost: 1800.00, details: 'El termostato del calentador estaba fallando. Se reemplazó por una pieza nueva y se purgó el sistema.', photos: [] },
];

// --- Types and Helpers ---
type Ticket = typeof maintenanceTickets[0];
type Category = 'Todos' | 'Plomería' | 'Electricidad' | 'Cerrajería' | 'Pintura' | 'General';

const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return 'Pendiente';
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};

const getStatusChip = (status: Ticket['status']) => {
    switch (status) {
        case 'completado':
            return <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Completado</div>;
        case 'en_progreso':
            return <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">En Progreso</div>;
        case 'pendiente':
            return <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-alasla-gray-medium text-alasla-dark">Pendiente</div>;
        default:
            return null;
    }
};

// --- Sub-components ---

const TicketCard: React.FC<{ ticket: Ticket; onSelect: () => void }> = ({ ticket, onSelect }) => {
    const property = properties.find(p => p.id === ticket.propertyId);
    const statusClasses = {
        completado: 'bg-green-500',
        en_progreso: 'bg-yellow-500',
        pendiente: 'bg-alasla-gray-dark',
    };

    return (
        <button 
            onClick={onSelect} 
            className="w-full text-left bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform flex overflow-hidden border border-alasla-gray-medium"
        >
            <div className={`w-2 flex-shrink-0 ${statusClasses[ticket.status] || 'bg-gray-400'}`}></div>
            <div className="flex-1 p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-bold text-alasla-dark truncate">{property?.name}</p>
                        <p className="text-xs text-alasla-gray-dark -mt-0.5">{property?.address}</p>
                    </div>
                    {getStatusChip(ticket.status)}
                </div>
                <div className="my-4 border-t border-dashed border-alasla-gray-medium"></div>
                <div>
                    <h3 className="font-semibold text-alasla-dark text-base leading-tight">{ticket.description}</h3>
                    <div className="mt-3 flex justify-between items-center text-sm">
                        <div>
                            <span className="text-alasla-gray-dark">Reportado: </span>
                            <span className="font-medium text-alasla-dark">{new Date(ticket.dateReported).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-alasla-dark group-hover:text-alasla-red-start transition-colors">
                            <span className="font-semibold text-xs mr-1">VER DETALLES</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

const TicketDetailContent: React.FC<{ ticket: Ticket, onClose: () => void }> = ({ ticket, onClose }) => (
    <>
        <header className="p-6 bg-alasla-gray-light border-b border-alasla-gray-medium">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-alasla-red-start uppercase tracking-wider">{ticket.category}</p>
                    <h2 className="text-xl font-bold text-alasla-dark mt-1">{ticket.description}</h2>
                </div>
                <button onClick={onClose} className="ml-4 p-2 rounded-full hover:bg-alasla-gray-medium text-alasla-gray-dark transition-colors">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-4 rounded-lg bg-alasla-gray-light border border-alasla-gray-medium">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="col-span-2"><dt className="text-sm font-medium text-alasla-gray-dark">Estado</dt><dd className="mt-1">{getStatusChip(ticket.status)}</dd></div>
                    <div><dt className="text-sm font-medium text-alasla-gray-dark">Propiedad</dt><dd className="mt-1 font-semibold text-alasla-dark truncate">{properties.find(p => p.id === ticket.propertyId)?.name}</dd></div>
                    <div><dt className="text-sm font-medium text-alasla-gray-dark">Costo Total</dt><dd className="mt-1 font-semibold text-alasla-dark">{formatCurrency(ticket.cost)}</dd></div>
                    <div><dt className="text-sm font-medium text-alasla-gray-dark">Fecha de Reporte</dt><dd className="mt-1 text-sm text-alasla-dark">{new Date(ticket.dateReported).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</dd></div>
                    <div><dt className="text-sm font-medium text-alasla-gray-dark">Fecha de Finalización</dt><dd className="mt-1 text-sm text-alasla-dark">{ticket.dateCompleted ? new Date(ticket.dateCompleted).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}</dd></div>
                </dl>
            </div>
            <div><h3 className="font-bold text-alasla-dark">Detalles del Reporte</h3><p className="mt-2 text-sm text-alasla-gray-dark leading-relaxed">{ticket.details}</p></div>
            <div>
                 <h3 className="font-bold text-alasla-dark">Fotografías</h3>
                 {ticket.photos.length > 0 ? (
                    <div className="mt-2 grid grid-cols-2 gap-4"> {/* Placeholder for photos */} </div>
                ) : (
                    <div className="mt-2 flex flex-col items-center justify-center p-6 bg-alasla-gray-light rounded-lg text-center border border-alasla-gray-medium"><ImageIcon className="w-8 h-8 text-alasla-gray-dark" /><p className="mt-2 text-sm text-alasla-gray-dark">No se adjuntaron fotografías.</p></div>
                )}
            </div>
        </div>
    </>
);

const EmptyState: React.FC = () => (
    <div className="text-center py-16 px-6 border-2 border-dashed border-alasla-gray-medium rounded-2xl bg-white mt-8">
        <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-alasla-gray-light mb-6">
            <WrenchIcon className="w-8 h-8 text-alasla-gray-dark" />
        </div>
        <h2 className="text-xl font-bold text-alasla-dark">Sin Mantenimientos para Mostrar</h2>
        <p className="text-base text-alasla-gray-dark max-w-sm mx-auto mt-2">
            No se encontraron registros que coincidan con los filtros seleccionados.
        </p>
    </div>
);

// --- Main View Component ---
const MaintenanceView: React.FC = () => {
    const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || 'all');
    const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredTickets = useMemo(() => {
        return maintenanceTickets
            .filter(ticket => selectedPropertyId === 'all' || ticket.propertyId === selectedPropertyId)
            .filter(ticket => selectedCategory === 'Todos' || ticket.category === selectedCategory)
            .sort((a, b) => new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime());
    }, [selectedPropertyId, selectedCategory]);

    const handleSelectTicket = (ticket: Ticket) => { setSelectedTicket(ticket); setIsDrawerOpen(true); };
    const handleCloseDrawer = () => { setIsDrawerOpen(false); setTimeout(() => setSelectedTicket(null), 300); };
    const handleSelectProperty = (propertyId: string) => { setSelectedPropertyId(propertyId); setIsDropdownOpen(false); };

    const selectedProperty = useMemo(() => properties.find(p => p.id === selectedPropertyId), [selectedPropertyId]);
    const categories: Category[] = ['Todos', 'Plomería', 'Electricidad', 'Cerrajería', 'Pintura', 'General'];

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-alasla-dark">Historial de Mantenimiento</h1>
                 <p className="text-alasla-gray-dark mt-1">Consulta las reparaciones y mantenimientos de tus inmuebles.</p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start space-x-3">
                <div className="flex-shrink-0 pt-0.5"><InfoIcon className="w-5 h-5 text-blue-500" /></div>
                <p className="text-sm text-blue-800">Esta sección muestra los mantenimientos registrados por administración. Para reportar una nueva incidencia, contacta a tu gestor asignado.</p>
            </div>
            
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div ref={dropdownRef} className="relative inline-block text-left w-full md:w-auto">
                        <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="inline-flex justify-between w-full rounded-lg border border-alasla-gray-medium shadow-sm px-4 py-3 bg-white text-sm font-medium text-alasla-dark hover:bg-alasla-gray-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-alasla-red-start">
                            <span className="truncate pr-2">{selectedProperty ? selectedProperty.name : 'Todas las propiedades'}</span>
                            <ChevronDownIcon className="-mr-1 h-5 w-5 flex-shrink-0" />
                        </button>
                        {isDropdownOpen && (
                            <div className="origin-top-left absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in" style={{animationDuration: '150ms'}}>
                                <div className="py-1">
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleSelectProperty('all'); }} className="block px-4 py-2 text-sm text-alasla-dark hover:bg-alasla-gray-light">Todas las propiedades</a>
                                    {properties.map(prop => <a key={prop.id} href="#" onClick={(e) => { e.preventDefault(); handleSelectProperty(prop.id); }} className="block px-4 py-2 text-sm text-alasla-dark hover:bg-alasla-gray-light">{prop.name}</a>)}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === cat ? 'bg-alasla-dark text-white' : 'bg-white text-alasla-dark border border-alasla-gray-medium hover:bg-alasla-gray-light'}`}>{cat}</button>)}
                    </div>
                </div>

                {filteredTickets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} onSelect={() => handleSelectTicket(ticket)} />)}
                    </div>
                ) : <EmptyState />}
            </div>

            {isDrawerOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={handleCloseDrawer}
                        className="fixed inset-0 bg-black/60 z-50 transition-opacity animate-fade-in"
                        aria-hidden="true"
                    />

                    {/* Drawer Panel */}
                    <div className="fixed inset-y-0 right-0 max-w-full flex z-50" role="dialog" aria-modal="true">
                        <div className={`w-screen max-w-md transform transition ease-in-out duration-300 ${isDrawerOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}>
                            <div className="h-full flex flex-col bg-white shadow-xl">
                                {selectedTicket && <TicketDetailContent ticket={selectedTicket} onClose={handleCloseDrawer} />}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MaintenanceView;