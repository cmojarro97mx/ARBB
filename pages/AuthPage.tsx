import React, { useState } from 'react';
import { AlaslaLogo, UserCircle, Home, Mail, Lock } from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

// Reusable UI Components redesigned for an Airbnb-style look

const InputField: React.FC<{ label: string, icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, icon: Icon, ...props }) => (
    <div className="flex flex-col px-4 py-2.5 border-b border-alasla-gray-medium last:border-b-0 group">
        <label className="text-[10px] font-bold text-alasla-gray-dark uppercase tracking-wider">{label}</label>
        <div className="flex items-center pt-1">
             <Icon className="w-4 h-4 text-alasla-gray-dark mr-3 flex-shrink-0 transition-colors group-focus-within:text-alasla-red-start" />
             <input
                {...props}
                className="w-full bg-transparent focus:outline-none text-alasla-dark placeholder:text-alasla-gray-medium"
            />
        </div>
    </div>
);


const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        {...props}
        className="w-full px-4 py-3.5 text-white bg-gradient-to-r from-alasla-red-start to-alasla-red-end rounded-full font-bold text-base hover:opacity-95 transition-all focus:outline-none focus:ring-2 focus:ring-alasla-red/50 focus:ring-offset-2 active:scale-[0.98]"
    >
        {children}
    </button>
);

const RoleSelector: React.FC<{ selectedRole: UserRole, setSelectedRole: (role: UserRole) => void }> = ({ selectedRole, setSelectedRole }) => {
    return (
        <div className="space-y-4">
             <p className="text-center text-sm font-semibold text-alasla-dark">Selecciona tu tipo de cuenta</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setSelectedRole(UserRole.CLIENTE)}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl text-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${selectedRole === UserRole.CLIENTE ? 'bg-gradient-to-r from-alasla-red-start to-alasla-red-end text-white ring-2 ring-alasla-red/50 ring-offset-2' : 'border border-alasla-gray-medium text-alasla-dark hover:border-alasla-dark bg-white'}`}
                >
                    <UserCircle className="w-8 h-8 mb-2" />
                    <span className="font-semibold">Cliente</span>
                    <span className="text-xs mt-1 opacity-80">Busca y reserva alojamientos</span>
                </button>
                <button
                    type="button"
                    onClick={() => setSelectedRole(UserRole.ANFITRION)}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl text-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${selectedRole === UserRole.ANFITRION ? 'bg-gradient-to-r from-alasla-red-start to-alasla-red-end text-white ring-2 ring-alasla-red/50 ring-offset-2' : 'border border-alasla-gray-medium text-alasla-dark hover:border-alasla-dark bg-white'}`}
                >
                     <Home className="w-8 h-8 mb-2" />
                    <span className="font-semibold">Anfitrión</span>
                    <span className="text-xs mt-1 opacity-80">Ofrece tu espacio a viajeros</span>
                </button>
            </div>
        </div>
    );
};


const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!email || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        login(email);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-alasla-dark">Bienvenido</h2>
              <p className="text-alasla-gray-dark mt-2">Ingresa a tu cuenta para continuar.</p>
            </div>
            <div className="border border-alasla-gray-medium rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-alasla-red/50 focus-within:border-alasla-red-start">
                <InputField icon={Mail} label="Correo electrónico" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                <InputField icon={Lock} label="Contraseña" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit">Iniciar Sesión</Button>
            <div className="text-xs text-center text-alasla-gray-dark pt-2">
                Prueba con: <code className="bg-alasla-gray-medium/50 px-1 py-0.5 rounded">host@alasla.com</code> o <code className="bg-alasla-gray-medium/50 px-1 py-0.5 rounded">client@alasla.com</code>
            </div>
        </form>
    );
};

const RegisterForm: React.FC = () => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.CLIENTE);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        register(name, email, role);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
             <div className="text-center">
              <h2 className="text-3xl font-bold text-alasla-dark">Crea tu cuenta</h2>
              <p className="text-alasla-gray-dark mt-2">Únete a Alasla y encuentra tu próximo hogar.</p>
            </div>
            <RoleSelector selectedRole={role} setSelectedRole={setRole} />
            <div className="border border-alasla-gray-medium rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-alasla-red/50 focus-within:border-alasla-red-start">
              <InputField icon={UserCircle} label="Nombre completo" type="text" placeholder="Juan Pérez" value={name} onChange={e => setName(e.target.value)} required />
              <InputField icon={Mail} label="Correo electrónico" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <InputField icon={Lock} label="Contraseña" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit">Registrarse</Button>
        </form>
    );
};


const AuthPage: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-alasla-gray-light p-4">
            <div className="w-full max-w-lg">
                <div className="bg-white p-10 rounded-2xl shadow-lg">
                    {isLoginView ? <LoginForm /> : <RegisterForm />}
                    <div className="mt-8 pt-6 border-t border-alasla-gray-medium text-center">
                        <p className="text-sm text-alasla-dark">
                            {isLoginView ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
                            <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-alasla-red-start hover:underline focus:outline-none">
                                {isLoginView ? 'Regístrate' : 'Inicia Sesión'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;