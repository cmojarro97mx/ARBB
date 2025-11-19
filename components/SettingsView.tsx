import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockOnboardingData } from './OnboardingStepper';
import { UserCircle, FileText, InfoIcon, Lock } from './Icons';

type SettingsSection = 'personal' | 'fiscal' | 'seguridad';

const capitalize = (s?: string) => s ? s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

// --- Reusable Sub-components ---

const SettingsMenuItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-semibold rounded-lg text-left transition-colors relative ${
            isActive 
                ? 'bg-alasla-gray-light text-alasla-dark' 
                : 'text-alasla-gray-dark hover:bg-alasla-gray-light hover:text-alasla-dark'
        }`}
    >
        <Icon className={`w-5 h-5 ${isActive ? 'text-alasla-red-start' : ''}`} />
        <span>{label}</span>
    </button>
);

const SettingsRow: React.FC<{
    label: string;
    value?: string | null;
    isProtected?: boolean;
    actionLabel?: string;
    onActionClick?: () => void;
}> = ({ label, value, isProtected = true, actionLabel = "Editar", onActionClick }) => {
    const tooltipText = "Para cambiar estos datos, contacta a soporte.";

    return (
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-alasla-gray-medium last:border-b-0">
            <dt className="text-sm font-medium text-alasla-dark">{label}</dt>
            <dd className="mt-1 flex text-sm text-alasla-gray-dark sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{value || 'No proporcionado'}</span>
                <span className="ml-4 flex-shrink-0 relative group">
                     <button
                        type="button"
                        onClick={onActionClick}
                        disabled={isProtected}
                        className="bg-white rounded-md font-semibold text-alasla-red-start hover:text-alasla-red-end focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-alasla-red-start disabled:text-alasla-gray-dark/50 disabled:cursor-not-allowed disabled:hover:text-alasla-gray-dark/50"
                    >
                        {actionLabel}
                    </button>
                    {isProtected && (
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 text-xs font-normal text-white bg-alasla-dark rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            {tooltipText}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-alasla-dark"></div>
                        </div>
                    )}
                </span>
            </dd>
        </div>
    );
};


// --- Content Sections ---

const PersonalInfoSection: React.FC = () => {
    const data = mockOnboardingData;
    const fullAddress = `${data.street} ${data.exteriorNumber}${data.interiorNumber ? ' int. ' + data.interiorNumber : ''}, ${data.neighborhood}, C.P. ${data.postalCode}, ${data.city}, ${data.state}`;

    return (
        <div className="bg-white rounded-2xl border border-alasla-gray-medium shadow-sm">
             <header className="p-5">
                <h2 className="text-xl font-bold text-alasla-dark">Información personal</h2>
                <p className="text-sm text-alasla-gray-dark mt-1">Tu información como anfitrión, tal como aparece en tu contrato.</p>
            </header>
            <div className="border-t border-alasla-gray-medium">
                <dl className="divide-y divide-alasla-gray-medium">
                    <div className="px-5">
                        <SettingsRow label="Nombre completo" value={data.fullNameOfficial} />
                        <SettingsRow label="Fecha de nacimiento" value={data.dateOfBirth} />
                        <SettingsRow label="Nacionalidad" value={data.nationality} />
                        <SettingsRow label="Sexo al nacer" value={capitalize(data.gender)} />
                        <SettingsRow label="Estado civil" value={capitalize(data.maritalStatus)} />
                        <SettingsRow label="Número de credencial (INE)" value={data.ineNumber} />
                        <SettingsRow label="Número de celular" value={data.cellPhone} />
                        <SettingsRow label="Teléfono fijo" value={data.landlinePhone} />
                        <SettingsRow label="Domicilio" value={fullAddress} />
                    </div>
                </dl>
            </div>
        </div>
    );
};

const FiscalInfoSection: React.FC = () => {
    const data = mockOnboardingData;
    return (
        <div className="bg-white rounded-2xl border border-alasla-gray-medium shadow-sm">
            <header className="p-5">
                <h2 className="text-xl font-bold text-alasla-dark">Datos fiscales y de pago</h2>
                <p className="text-sm text-alasla-gray-dark mt-1">Información usada para la facturación y para depositar tus ganancias.</p>
            </header>
            <div className="border-t border-alasla-gray-medium">
                <dl className="divide-y divide-alasla-gray-medium">
                    <div className="px-5">
                        <SettingsRow label="RFC (con homoclave)" value={data.rfc} />
                        <SettingsRow label="Banco" value={data.bankName} />
                        <SettingsRow label="CLABE Interbancaria" value={data.clabeNumber} />
                    </div>
                </dl>
            </div>
        </div>
    );
};

const SecuritySection: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="bg-white rounded-2xl border border-alasla-gray-medium shadow-sm">
            <header className="p-5">
                <h2 className="text-xl font-bold text-alasla-dark">Seguridad de la cuenta</h2>
                <p className="text-sm text-alasla-gray-dark mt-1">Administra tu contraseña y protege tu cuenta.</p>
            </header>
            <div className="border-t border-alasla-gray-medium">
                <dl className="divide-y divide-alasla-gray-medium">
                    <div className="px-5">
                        <SettingsRow label="Correo electrónico" value={user?.email} />
                        <SettingsRow label="Contraseña" value="••••••••••••" isProtected={false} actionLabel="Cambiar" />
                        <SettingsRow label="Autenticación de dos factores" value="Desactivada" isProtected={false} actionLabel="Activar" />
                        <SettingsRow label="Historial de inicio de sesión" value="Última sesión: Hoy a las 10:30 AM" isProtected={true} actionLabel="Ver historial" />
                    </div>
                </dl>
            </div>
        </div>
    );
};


// --- Main Component ---

const SettingsView: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('personal');
    
    const menuItems = [
        { id: 'personal' as SettingsSection, label: 'Información personal', icon: UserCircle },
        { id: 'fiscal' as SettingsSection, label: 'Datos fiscales y de pago', icon: FileText },
        { id: 'seguridad' as SettingsSection, label: 'Seguridad de la cuenta', icon: Lock },
    ];
    
    const renderContent = () => {
        switch (activeSection) {
            case 'personal': return <PersonalInfoSection />;
            case 'fiscal': return <FiscalInfoSection />;
            case 'seguridad': return <SecuritySection />;
            default: return <PersonalInfoSection />;
        }
    };

    return (
        <div className="animate-fade-in space-y-8 max-w-6xl mx-auto">
             <div>
                <h1 className="text-3xl font-bold text-alasla-dark">Configuración</h1>
                <p className="text-alasla-gray-dark mt-1">Administra la información de tu cuenta.</p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-12">
                {/* Left: Navigation */}
                <aside className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
                    <nav className="space-y-1 sticky top-8">
                        {menuItems.map(item => (
                             <SettingsMenuItem 
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                isActive={activeSection === item.id}
                                onClick={() => setActiveSection(item.id)}
                            />
                        ))}
                    </nav>
                </aside>
                
                {/* Right: Content */}
                <main className="flex-1 min-w-0">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start space-x-3 mb-8">
                        <div className="flex-shrink-0 pt-0.5">
                            <InfoIcon className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-sm text-blue-800">
                           Tu información fue verificada y sellada en tu contrato. Por este motivo, los datos de las secciones "Personal" y "Fiscal" son de solo lectura. Para realizar cambios, por favor contacta a soporte.
                        </p>
                    </div>

                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default SettingsView;