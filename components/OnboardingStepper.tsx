
// Fix: Imported `useCallback` from 'react' to resolve the "Cannot find name 'useCallback'" error.
import React, { useState, useMemo, useRef, useEffect, createRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, UploadCloud, TrashIcon, Check, Edit3, UserCircle, MapPin, FileText, CreditCard, FileClock, Home, ShieldCheck, DollarSign, XIcon, Signature, PhoneIcon, HashIcon, ClipboardListIcon, UsersIcon, Mail, Building, ImageIcon, InfoIcon, CalendarIcon, GlobeIcon, ArrivingCarAnimation, AlertTriangleIcon, PenToolIcon } from './Icons';
import OnboardingAssistant from './OnboardingAssistant';
import { OnboardingData } from '../types';
import ContractDisplay from './ContractDisplay';

// --- Helper Functions ---
const capitalize = (s?: string) => s ? s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

const nationalities = [
    "Mexicana", "Estadounidense", "Canadiense", "Española", "Argentina", "Colombiana", 
    "Brasileña", "Peruana", "Venezolana", "Chilena", "Ecuatoriana", "Guatemalteca",
    "Cubana", "Boliviana", "Hondureña", "Salvadoreña", "Nicaragüense", "Costarricense",
    "Panameña", "Uruguaya", "Paraguaya", "Dominicana", "Francesa", "Alemana", "Italiana",
    "Británica", "China", "Japonesa", "Otra"
];

const banks = [
    "ABC Capital", "Accendo Banco", "Actinver", "Afirme", "American Express", "Autofin",
    "Azteca", "Bajío", "Bankaool", "Banjercito", "Banorte", "Banregio", "Bansí", "BBVA México",
    "CIBanco", "Citibanamex", "Compartamos", "Consubanco", "Coppel", "Credit Suisse",
    "Dondé Banco", "Famsa", "Fundación Dondé", "HSBC", "Inbursa", "Inmobiliario Mexicano",
    "Intercam", "Invex", "Monex", "Multiva", "Santander", "Scotiabank",
    "STP (Sistema de Transferencias y Pagos)", "Ve por Más (Bx+)", "Volkswagen Bank", "Otro"
].sort();


// --- Redesigned, Premium UI Components ---

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => (
    <button
        {...props}
        className={`px-6 py-3 rounded-lg font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
            props.variant === 'secondary'
                ? 'bg-alasla-gray-medium text-alasla-dark hover:bg-alasla-gray-dark/20 focus:ring-alasla-gray-dark/50'
                : 'text-white bg-gradient-to-r from-alasla-red-start to-alasla-red-end hover:opacity-95 focus:ring-alasla-red/50'
        }`}
    >
        {children}
    </button>
);


const InputField = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ElementType; onTutorialClick?: () => void }>((props, ref) => {
    const { label, icon: Icon, onTutorialClick, ...rest } = props;
    const isDate = props.type === 'date';
    return (
        <div className={`relative group ${props.className ?? ''}`}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-alasla-gray-dark group-focus-within:text-alasla-red-start">
                <Icon className="w-5 h-5" />
            </div>
            <input
                ref={ref}
                id={props.name}
                {...rest}
                placeholder=" "
                className={`peer block w-full bg-transparent border-b-2 border-alasla-gray-medium focus:border-alasla-red-start focus:outline-none text-base text-alasla-dark px-10 py-3 transition-colors ${onTutorialClick ? 'pr-16' : ''} ${isDate && !props.value ? 'text-transparent' : ''}`}
            />
            <label
                htmlFor={props.name}
                className={`absolute left-10 top-3 text-alasla-gray-dark transition-all duration-300 transform origin-[0] -translate-y-6 scale-75 ${isDate ? '' : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'} peer-focus:scale-75 peer-focus:-translate-y-6 group-focus-within:text-alasla-red-start`}
            >
                {label}
            </label>
            {onTutorialClick && (
                <button
                    type="button"
                    onClick={onTutorialClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-alasla-gray-dark hover:bg-alasla-gray-medium/50 hover:text-alasla-red-start transition-colors"
                    aria-label="Mostrar ayuda"
                >
                    <InfoIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    );
});


const SelectField = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; icon: React.ElementType }>((props, ref) => {
    const { label, icon: Icon, children, ...rest } = props;
    const hasValue = props.value && props.value !== '';
    return (
        <div className={`relative group ${props.className ?? ''}`}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-alasla-gray-dark group-focus-within:text-alasla-red-start">
                <Icon className="w-5 h-5" />
            </div>
            <select
                ref={ref}
                id={props.name}
                {...rest}
                className="peer block w-full appearance-none bg-transparent border-b-2 border-alasla-gray-medium focus:border-alasla-red-start focus:outline-none text-base text-alasla-dark px-10 py-3 transition-colors"
            >
                {children}
            </select>
             <label
                htmlFor={props.name}
                className={`absolute left-10 top-3 text-alasla-gray-dark transition-all duration-300 transform origin-[0] -translate-y-6 scale-75 ${!hasValue ? 'peer-focus:scale-75 peer-focus:-translate-y-6' : ''} group-focus-within:text-alasla-red-start`}
            >
                {label}
            </label>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-alasla-gray-dark group-focus-within:text-alasla-red-start">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    );
});


const TextAreaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; icon: React.ElementType }> = (props) => {
    const { label, icon: Icon, ...rest } = props;
    return (
        <div className={`relative group ${props.className ?? ''}`}>
            <div className="absolute left-3 top-5 transition-colors text-alasla-gray-dark group-focus-within:text-alasla-red-start">
                <Icon className="w-5 h-5" />
            </div>
            <textarea
                id={props.name}
                {...rest}
                rows={4}
                placeholder=" "
                className="peer block w-full bg-transparent border-b-2 border-alasla-gray-medium focus:border-alasla-red-start focus:outline-none text-base text-alasla-dark px-10 py-3 transition-colors resize-y"
            />
            <label
                htmlFor={props.name}
                className="absolute left-10 top-3 text-alasla-gray-dark transition-all duration-300 transform origin-[0] -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 group-focus-within:text-alasla-red-start"
            >
                {label}
            </label>
        </div>
    );
};

const FileUpload: React.FC<{file: File | null, onFileChange: (file: File | null) => void, accept: string, label: React.ReactNode}> = ({ file, onFileChange, accept, label }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const hasFile = file !== null;

    useEffect(() => {
        if (hasFile) {
            const timer = setTimeout(() => setUploadProgress(100), 100);
            return () => {
                clearTimeout(timer);
                setUploadProgress(0);
            };
        } else {
            setUploadProgress(0);
        }
    }, [hasFile]);
    
    const handleFileChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            onFileChange(files[0]);
        }
    };

    const onRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFileChange(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    };

    const getFileTypeIcon = () => {
        if (!file) return <FileText className="w-8 h-8 text-alasla-gray-dark" />;
        if (file.type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-blue-500" />;
        if (file.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-600" />;
        return <FileText className="w-8 h-8 text-alasla-gray-dark" />;
    };

    return (
        <div>
            <div className="block text-sm font-medium text-alasla-dark mb-1.5">{label}</div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files)}
                accept={accept}
                className="hidden"
            />

            {hasFile ? (
                <div className="mt-1.5 p-4 bg-white border border-green-300 rounded-xl animate-fade-in">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                            {getFileTypeIcon()}
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                            <p className="font-semibold text-alasla-dark truncate text-sm">{file.name}</p>
                            <p className="text-xs text-alasla-gray-dark">{Math.round(file.size / 1024)} KB</p>
                            <div className="mt-2 h-1.5 rounded-full bg-alasla-gray-medium overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                        <button
                            onClick={onRemoveFile}
                            className="ml-4 p-1.5 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`mt-1.5 flex flex-col items-center justify-center p-8 bg-alasla-gray-light/60 rounded-xl cursor-pointer border-2 border-dashed transition-all duration-300 ${
                        isDragging ? 'border-alasla-red-start bg-alasla-red/10' : 'border-alasla-gray-medium hover:border-alasla-gray-dark'
                    }`}
                >
                    <UploadCloud className={`mx-auto h-12 w-12 transition-colors ${isDragging ? 'text-alasla-red-start' : 'text-alasla-gray-dark/60'}`} />
                    <div className="mt-4 text-sm text-center text-alasla-dark">
                        {isDragging ? (
                            <span className="font-bold text-alasla-red-start">¡Suelta el archivo para subirlo!</span>
                        ) : (
                            <>
                                <span className="font-semibold">Arrastra y suelta</span> o <span className="font-semibold text-alasla-red-start">haz clic aquí</span>
                            </>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-alasla-gray-dark/80">
                        {accept.includes('pdf') && 'PDF. '}
                        {accept.includes('image') && 'PNG, JPG. '}
                        Tamaño máx. 10MB
                    </p>
                </div>
            )}
        </div>
    );
};

// --- Tutorial Modal ---

const TutorialModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'recent' | 'old'>('recent');

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const TabButton: React.FC<{tabId: 'recent' | 'old'; children: React.ReactNode}> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-colors ${
                activeTab === tabId ? 'bg-alasla-red-start/10 text-alasla-red-start' : 'text-alasla-gray-dark hover:bg-alasla-gray-light'
            }`}
        >
            {children}
        </button>
    );
    
    const IneCardMockup: React.FC<{isRecent?: boolean}> = ({ isRecent = false }) => (
        <div className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-200/80 w-full max-w-sm mx-auto aspect-[1.586] relative overflow-hidden font-sans text-left">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-50"></div>
            {isRecent ? (
                <>
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800"></div>
                    <div className="absolute top-12 left-4 right-4 flex space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-[8px] text-gray-400">QR</div>
                        <div className="flex-1 space-y-2">
                             <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                             <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                             <div className="w-3/4 h-2 bg-gray-200 rounded-sm"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 p-2 border-2 border-alasla-red-start rounded-md bg-white/80 shadow-lg animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                        <p className="text-[7px] text-gray-500 font-semibold">IDMEX<span className="text-alasla-red-start font-mono tracking-tighter">&lt;1234567890123&gt;</span></p>
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800"></div>
                     <div className="absolute top-10 left-4 right-4 flex space-x-4">
                        <div className="flex-1 space-y-2">
                             <div className="w-full h-2 bg-gray-200 rounded-sm"></div>
                             <div className="w-3/4 h-2 bg-gray-200 rounded-sm"></div>
                        </div>
                     </div>
                     <div className="absolute bottom-4 left-4 right-4 p-2 border-2 border-alasla-red-start rounded-md bg-white/80 shadow-lg animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                        <p className="text-[7px] text-gray-500 font-semibold">OCR: <span className="text-alasla-red-start font-mono">1234567890123</span></p>
                    </div>
                </>
            )}
        </div>
    );

    const TutorialContent: React.FC<{isRecent: boolean}> = ({isRecent}) => (
         <div className="flex flex-col items-center text-center animate-fade-in">
            <IneCardMockup isRecent={isRecent} />
            <div className="mt-6 space-y-2">
                 {isRecent ? (
                     <>
                        <h4 className="font-bold text-lg text-alasla-dark">Credenciales emitidas desde 2014</h4>
                        <p className="text-sm text-alasla-gray-dark leading-relaxed max-w-md">
                            Busca el número de 13 dígitos <span className="font-semibold text-alasla-dark">al reverso</span> de tu credencial. Está identificado como <span className="font-semibold text-alasla-dark">IDMEX</span> y se encuentra en la parte inferior.
                        </p>
                     </>
                 ) : (
                    <>
                        <h4 className="font-bold text-lg text-alasla-dark">Credenciales más antiguas</h4>
                        <p className="text-sm text-alasla-gray-dark leading-relaxed max-w-md">
                            En modelos anteriores, el número se encuentra <span className="font-semibold text-alasla-dark">en el reverso</span> y puede estar identificado como <span className="font-semibold text-alasla-dark">OCR</span>.
                        </p>
                    </>
                 )}
            </div>
        </div>
    );


    return (
        <div 
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-5 border-b border-alasla-gray-medium flex-shrink-0">
                    <h3 className="text-lg font-bold text-alasla-dark">¿Dónde encontrar tu número?</h3>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-alasla-gray-medium text-alasla-gray-dark">
                        <XIcon className="w-5 h-5" />
                    </button>
                </header>
                <div className="flex-1 flex flex-col p-6 min-h-0">
                    <div className="flex-shrink-0 mb-5 border-b border-alasla-gray-medium pb-4">
                        <div className="flex items-center space-x-2">
                           <TabButton tabId="recent">Modelos Recientes</TabButton>
                           <TabButton tabId="old">Modelos Anteriores</TabButton>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                       {activeTab === 'recent' ? <TutorialContent isRecent /> : <TutorialContent isRecent={false} />}
                    </div>
                </div>
                <footer className="p-5 border-t border-alasla-gray-medium text-right flex-shrink-0 bg-alasla-gray-light/50 rounded-b-2xl">
                    <Button onClick={onClose}>
                        Entendido
                    </Button>
                </footer>
            </div>
        </div>
    );
};


// --- Fiscal Tutorial Modal ---
const FiscalTutorialModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    useEffect(() => {
       const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') onClose();
       };
       if (isOpen) {
           window.addEventListener('keydown', handleEsc);
       }
       return () => window.removeEventListener('keydown', handleEsc);
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   const steps = [
       { title: "Ingresa al portal del SAT", description: "Abre tu navegador y ve a www.sat.gob.mx." },
       { title: "Busca la opción correcta", description: "En el menú superior, ve a 'Otros trámites y servicios' y haz clic en 'Genera tu Constancia de Situación Fiscal'." },
       { title: "Inicia sesión", description: "Necesitarás tu RFC y Contraseña, o bien, tu e.firma (firma electrónica) para acceder al sistema." },
       { title: "Genera el documento", description: "Una vez dentro, busca y haz clic en el botón 'Generar Constancia'. El sistema preparará tu documento." },
       { title: "Descarga y guarda", description: "Tu constancia se generará como un archivo PDF. Descárgalo y guárdalo en un lugar seguro para subirlo a nuestra plataforma." }
   ];

   return (
       <div 
           className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in"
           onClick={onClose}
           aria-modal="true"
           role="dialog"
       >
           <div 
               className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
               onClick={e => e.stopPropagation()}
           >
               <header className="flex items-center justify-between p-5 border-b border-alasla-gray-medium flex-shrink-0">
                   <h3 className="text-lg font-bold text-alasla-dark">Obtén tu Constancia de Situación Fiscal</h3>
                   <button onClick={onClose} className="p-1.5 rounded-full hover:bg-alasla-gray-medium text-alasla-gray-dark">
                       <XIcon className="w-5 h-5" />
                   </button>
               </header>
               <div className="flex-1 p-8 overflow-y-auto">
                  <ol className="space-y-6">
                       {steps.map((step, index) => (
                           <li key={index} className="flex">
                               <div className="flex-shrink-0">
                                   <span className="flex items-center justify-center h-8 w-8 rounded-full bg-alasla-red-start text-white font-bold text-sm">
                                       {index + 1}
                                   </span>
                               </div>
                               <div className="ml-4">
                                   <h4 className="text-base font-bold text-alasla-dark">{step.title}</h4>
                                   <p className="mt-1 text-sm text-alasla-gray-dark">{step.description}</p>
                               </div>
                           </li>
                       ))}
                  </ol>
                  <div className="mt-8 text-center text-xs text-alasla-gray-dark/80">
                       <p>Recuerda que la interfaz del portal del SAT puede cambiar. Estos pasos son una guía general.</p>
                  </div>
               </div>
               <footer className="p-5 border-t border-alasla-gray-medium text-right flex-shrink-0 bg-alasla-gray-light/50 rounded-b-2xl">
                   <Button onClick={onClose}>
                       Entendido
                   </Button>
               </footer>
           </div>
       </div>
   );
};

// --- Signature Guide Animation ---
const SignatureGuideAnimation: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <svg className="w-2/3 h-2/3 overflow-visible" viewBox="0 0 150 100">
            <path
                d="M 20 60 Q 50 10 80 50 T 140 50"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="text-alasla-gray-dark/40 animate-draw-signature"
                style={{ strokeDasharray: 255, strokeDashoffset: 255 }}
            />
            {/* Animated Pen Icon */}
            <g className="animate-move-hand">
                 <PenToolIcon className="w-8 h-8 text-alasla-red-start" />
            </g>
        </svg>
    </div>
);


// --- Signature Modal ---
const SignatureModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasSignedRef = useRef(false);
  const [showAnimation, setShowAnimation] = useState(true);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#484848';
    ctx.lineWidth = 2; // Adjusted for better feel
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setupCanvas();
      hasSignedRef.current = false;
      setShowAnimation(true); // Reset animation state
    }, 150); // Wait for modal animation

    window.addEventListener('resize', setupCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', setupCanvas);
    };
  }, [isOpen, setupCanvas]);

  const getCoordinates = (event: MouseEvent | TouchEvent): { x: number, y: number } | null => {
      if (!canvasRef.current) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    setShowAnimation(false); // Hide animation on first interaction
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const coords = getCoordinates(event.nativeEvent);
    if (!ctx || !coords) return;
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    isDrawingRef.current = true;
    hasSignedRef.current = true;
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    event.preventDefault(); // Prevents scrolling on touch devices
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const coords = getCoordinates(event.nativeEvent);
    if (!ctx || !coords) return;
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.closePath();
    }
    isDrawingRef.current = false;
  };

  const handleClear = () => {
    setupCanvas();
    hasSignedRef.current = false;
    setShowAnimation(true); // Show animation again after clearing
  };

  const handleSave = () => {
    if (!hasSignedRef.current) {
        alert("Por favor, estampa tu firma en el recuadro antes de guardar.");
        return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      // Create a temporary canvas to draw the signature on a white background
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
          tempCtx.fillStyle = 'white';
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          tempCtx.drawImage(canvas, 0, 0);
          const dataUrl = tempCanvas.toDataURL('image/png');
          onSave(dataUrl);
      } else {
         // Fallback for context creation failure
         onSave(canvas.toDataURL('image/png'));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b border-alasla-gray-medium">
          <h3 className="text-lg font-bold text-alasla-dark flex items-center">
            <PenToolIcon className="w-5 h-5 mr-2" />
            Estampa tu firma
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-alasla-gray-medium text-alasla-gray-dark">
            <XIcon className="w-5 h-5" />
          </button>
        </header>
        <div className="p-5">
            <p className="text-sm text-alasla-gray-dark mb-3 text-center">Dibuja tu firma en el siguiente recuadro.</p>
            <div className="relative w-full h-48 bg-alasla-gray-light rounded-lg border-2 border-dashed border-alasla-gray-medium cursor-crosshair touch-none">
                {showAnimation && <SignatureGuideAnimation />}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
        </div>
        <footer className="p-5 border-t border-alasla-gray-medium flex justify-between bg-alasla-gray-light/50 rounded-b-2xl">
          <Button onClick={handleClear} variant="secondary">
            Limpiar
          </Button>
          <Button onClick={handleSave}>
            Confirmar Firma y Enviar
          </Button>
        </footer>
      </div>
    </div>
  );
};


// --- Step Data Structure ---
interface StepProps {
    data: OnboardingData;
    updateData: (fields: Partial<OnboardingData>) => void;
    goToStep?: (step: number) => void;
    setHasAgreedToContract?: (agreed: boolean) => void;
    hasAgreedToContract?: boolean;
}

const StepHeader: React.FC<{title: string; subtitle: string, actions?: React.ReactNode}> = ({title, subtitle, actions}) => (
    <div className="mb-10">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-bold text-alasla-dark">{title}</h2>
                <p className="text-alasla-gray-dark mt-2 text-base">{subtitle}</p>
            </div>
            {actions && <div className="ml-4 flex-shrink-0">{actions}</div>}
        </div>
    </div>
);

// --- Step Components ---

const Step1_Personal: React.FC<StepProps> = ({ data, updateData }) => {
    const [showTutorial, setShowTutorial] = useState(false);
    
    return (
        <>
            <div className="space-y-10">
                <StepHeader title="Información Personal" subtitle="Confirma tu identidad con tus datos oficiales."/>
                <div className="space-y-8">
                    <InputField icon={UserCircle} name="fullNameOfficial" label="Nombre completo oficial" value={data.fullNameOfficial} onChange={e => updateData({ fullNameOfficial: e.target.value })} required />
                     <div className="grid md:grid-cols-2 gap-8">
                        <InputField icon={CalendarIcon} name="dateOfBirth" label="Fecha de nacimiento" type="date" value={data.dateOfBirth} onChange={e => updateData({ dateOfBirth: e.target.value })} required />
                        <SelectField icon={UsersIcon} name="gender" label="Sexo al nacer" value={data.gender} onChange={e => updateData({ gender: e.target.value as OnboardingData['gender'] })} required>
                            <option value="" disabled>Selecciona una opción</option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                        </SelectField>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <SelectField icon={GlobeIcon} name="nationality" label="Nacionalidad" value={data.nationality} onChange={e => updateData({ nationality: e.target.value })} required>
                            <option value="" disabled>Selecciona una nacionalidad</option>
                            {nationalities.map(nat => <option key={nat} value={nat}>{nat}</option>)}
                        </SelectField>
                        <SelectField icon={UsersIcon} name="maritalStatus" label="Estado civil" value={data.maritalStatus} onChange={e => updateData({ maritalStatus: e.target.value as OnboardingData['maritalStatus'] })} required>
                            <option value="" disabled>Selecciona una opción</option>
                            <option value="soltero">Soltero/a</option>
                            <option value="casado">Casado/a</option>
                            <option value="divorciado">Divorciado/a</option>
                            <option value="viudo">Viudo/a</option>
                            <option value="unión libre">Unión Libre</option>
                        </SelectField>
                    </div>
                    <InputField 
                        icon={CreditCard} 
                        name="ineNumber" 
                        label="Número de credencial para votar" 
                        minLength={10} 
                        value={data.ineNumber} 
                        onChange={e => updateData({ ineNumber: e.target.value })} 
                        required 
                        onTutorialClick={() => setShowTutorial(true)}
                    />
                     <div className="grid md:grid-cols-2 gap-8">
                        <InputField icon={PhoneIcon} name="cellPhone" label="Número de celular" minLength={10} value={data.cellPhone} onChange={e => updateData({ cellPhone: e.target.value })} required />
                        <InputField icon={PhoneIcon} name="landlinePhone" label="Teléfono fijo (opcional)" minLength={8} value={data.landlinePhone} onChange={e => updateData({ landlinePhone: e.target.value })} />
                    </div>
                </div>
            </div>
            <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
        </>
    );
};

const Step2_Address: React.FC<StepProps> = ({ data, updateData }) => (
    <div className="space-y-10">
        <StepHeader title="Domicilio del Cliente" subtitle="Ingresa la dirección que aparece en tu identificación oficial."/>
        <div className="space-y-8">
            <InputField icon={MapPin} name="street" label="Calle" value={data.street} onChange={e => updateData({ street: e.target.value })} required />
            <div className="grid grid-cols-2 gap-8">
                <InputField icon={HashIcon} name="exteriorNumber" label="Número exterior" value={data.exteriorNumber} onChange={e => updateData({ exteriorNumber: e.target.value })} required />
                <InputField icon={HashIcon} name="interiorNumber" label="Número interior (opcional)" value={data.interiorNumber} onChange={e => updateData({ interiorNumber: e.target.value })} />
            </div>
            <InputField icon={MapPin} name="neighborhood" label="Colonia" value={data.neighborhood} onChange={e => updateData({ neighborhood: e.target.value })} required />
            <div className="grid grid-cols-5 gap-8">
                <InputField icon={Mail} name="postalCode" label="Código postal" maxLength={5} value={data.postalCode} onChange={e => updateData({ postalCode: e.target.value.replace(/\D/g, '') })} required className="col-span-2" />
                <InputField icon={MapPin} name="city" label="Ciudad" value={data.city} onChange={e => updateData({ city: e.target.value })} required className="col-span-3"/>
            </div>
            <InputField icon={MapPin} name="state" label="Estado" value={data.state} onChange={e => updateData({ state: e.target.value })} required />
        </div>
    </div>
);

const Step3_RFC: React.FC<StepProps> = ({ data, updateData }) => {
    const [showFiscalTutorial, setShowFiscalTutorial] = useState(false);

    return (
        <>
            <div className="space-y-10">
                <StepHeader title="RFC y Constancia Fiscal" subtitle="Necesitamos tu RFC y tu constancia de situación fiscal para validar tu información." />
                <div className="space-y-8">
                    <InputField icon={FileText} name="rfc" label="RFC (con homoclave)" maxLength={13} value={data.rfc} onChange={e => updateData({ rfc: e.target.value.toUpperCase() })} required />
                    
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-300">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-semibold text-yellow-800">Atención: Régimen Fiscal Requerido</h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        Para evitar problemas, es indispensable que estés dado de alta bajo el <strong className="font-bold">Régimen de Actividades Empresariales con ingresos a través de Plataformas Tecnológicas</strong>.
                                        Si no cuentas con este régimen, se requiere la actualización lo antes posible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <FileUpload
                        label={
                            <div className="flex justify-between items-center w-full">
                                <span>Constancia de situación fiscal</span>
                                <button
                                    type="button"
                                    onClick={() => setShowFiscalTutorial(true)}
                                    className="flex items-center space-x-1 text-sm font-semibold text-alasla-red-start hover:underline focus:outline-none"
                                >
                                    <InfoIcon className="w-4 h-4" />
                                    <span>¿Cómo la obtengo?</span>
                                </button>
                            </div>
                        }
                        file={data.fiscalCertificate}
                        onFileChange={file => updateData({ fiscalCertificate: file })}
                        accept="application/pdf"
                    />
                </div>
            </div>
            <FiscalTutorialModal isOpen={showFiscalTutorial} onClose={() => setShowFiscalTutorial(false)} />
        </>
    );
};

const Step4_Identification: React.FC<StepProps> = ({ data, updateData }) => (
    <div className="space-y-10">
        <StepHeader title="Identificación Oficial" subtitle="Sube imágenes del frente y reverso de tu INE, Pasaporte o Cédula Profesional."/>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
            <FileUpload label="Frente de la identificación" file={data.idFront} onFileChange={file => updateData({ idFront: file })} accept="image/*" />
            <FileUpload label="Reverso de la identificación" file={data.idBack} onFileChange={file => updateData({ idBack: file })} accept="image/*" />
        </div>
    </div>
);

const Step5_ProofAddress: React.FC<StepProps> = ({ data, updateData }) => (
    <div className="space-y-10">
        <StepHeader title="Comprobante de Domicilio" subtitle="Sube un comprobante de domicilio reciente (no mayor a 3 meses)."/>
        <div className="space-y-8">
            <SelectField icon={FileClock} name="addressProofType" label="Tipo de comprobante" value={data.addressProofType} onChange={e => updateData({ addressProofType: e.target.value as OnboardingData['addressProofType'] })} required>
                <option value="" disabled>Selecciona una opción</option>
                <option value="luz">Luz</option><option value="agua">Agua</option><option value="teléfono">Teléfono</option>
                <option value="internet">Internet</option><option value="gas">Gas</option><option value="predial">Predial</option>
            </SelectField>
            <FileUpload label="Subir comprobante" file={data.addressProofFile} onFileChange={file => updateData({ addressProofFile: file })} accept="application/pdf,image/*" />
        </div>
    </div>
);

const Step6_PropertyAddress: React.FC<StepProps> = ({ data, updateData }) => (
    <div className="space-y-10">
        <StepHeader title="Domicilio del Inmueble" subtitle="Proporciona la dirección y detalles de la propiedad que vas a anunciar."/>
        <div className="space-y-8">
            <InputField icon={Home} name="propertyStreet" label="Calle" value={data.propertyStreet} onChange={e => updateData({ propertyStreet: e.target.value })} required/>
            <div className="grid grid-cols-2 gap-8"><InputField icon={HashIcon} name="propertyExteriorNumber" label="Número exterior" value={data.propertyExteriorNumber} onChange={e => updateData({ propertyExteriorNumber: e.target.value })} required /><InputField icon={HashIcon} name="propertyInteriorNumber" label="Número interior (opcional)" value={data.propertyInteriorNumber} onChange={e => updateData({ propertyInteriorNumber: e.target.value })} /></div>
            <InputField icon={MapPin} name="propertyNeighborhood" label="Colonia" value={data.propertyNeighborhood} onChange={e => updateData({ propertyNeighborhood: e.target.value })} required />
            <div className="grid grid-cols-5 gap-8">
                <InputField icon={Mail} name="propertyPostalCode" label="Código postal" maxLength={5} value={data.propertyPostalCode} onChange={e => updateData({ propertyPostalCode: e.target.value.replace(/\D/g, '') })} required className="col-span-2"/>
                <InputField icon={MapPin} name="propertyCity" label="Ciudad" value={data.propertyCity} onChange={e => updateData({ propertyCity: e.target.value })} required className="col-span-3"/>
            </div>
            <InputField icon={MapPin} name="propertyState" label="Estado" value={data.propertyState} onChange={e => updateData({ propertyState: e.target.value })} required />
            <TextAreaField icon={ClipboardListIcon} name="propertyDescription" label="Descripción de la propiedad" value={data.propertyDescription} onChange={e => updateData({ propertyDescription: e.target.value })} minLength={10} required />
        </div>
    </div>
);

const Step7_PropertyDeed: React.FC<StepProps> = ({ data, updateData }) => (
    <div className="space-y-10">
        <StepHeader title="Escritura del Inmueble" subtitle="Sube una copia digital de la escritura pública para verificar la propiedad."/>
        <FileUpload label="Copia de la escritura pública" file={data.propertyDeed} onFileChange={file => updateData({ propertyDeed: file })} accept="application/pdf" />
    </div>
);

const Step8_Banking: React.FC<StepProps> = ({ data, updateData }) => (
    <div className="space-y-10">
        <StepHeader title="Información Bancaria" subtitle="Ingresa tu CLABE interbancaria para recibir los pagos de tus reservas."/>
         <div className="space-y-8">
            <SelectField icon={Building} name="bankName" label="Nombre del banco" value={data.bankName} onChange={e => updateData({ bankName: e.target.value })} required>
                <option value="" disabled>Selecciona un banco</option>
                {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
            </SelectField>
            <InputField icon={DollarSign} name="clabeNumber" label="CLABE interbancaria (18 dígitos)" maxLength={18} value={data.clabeNumber} onChange={e => updateData({ clabeNumber: e.target.value.replace(/\D/g, '') })} required/>
        </div>
    </div>
);

const Step9_Review: React.FC<StepProps> = ({ data, goToStep }) => {
    const ReviewSection: React.FC<{title: string; stepIndex: number; children: React.ReactNode}> = ({title, stepIndex, children}) => (
        <div className="p-6 border border-alasla-gray-medium rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-alasla-dark">{title}</h3>
                <button onClick={() => goToStep?.(stepIndex)} className="flex items-center space-x-1.5 text-sm font-bold text-alasla-dark hover:text-alasla-red-start transition-colors">
                    <Edit3 className="w-4 h-4" />
                    <span>Editar</span>
                </button>
            </div>
            <div className="space-y-3 border-t border-alasla-gray-medium/50 pt-4">{children}</div>
        </div>
    );
    const renderField = (label: string, value?: string | null) => value ? <div className="flex justify-between items-start text-sm"><span className="text-alasla-gray-dark">{label}</span><span className="font-medium text-alasla-dark text-right">{value}</span></div> : null;
    const renderFile = (label: string, file?: File | null) => file ? <div className="flex justify-between items-start text-sm"><span className="text-alasla-gray-dark">{label}</span><span className="font-medium text-right text-green-600 truncate flex items-center gap-1.5">✓ <span className="max-w-xs truncate">{file.name}</span></span></div> : null;
    
    return (
        <div className="space-y-8">
            <StepHeader title="Revisa y envía" subtitle="Asegúrate de que todos los datos y documentos son correctos antes de finalizar."/>
            <ReviewSection title="Información Personal" stepIndex={0}>
                {renderField('Nombre', data.fullNameOfficial)}
                {renderField('Fecha de Nacimiento', data.dateOfBirth)}
                {renderField('Nacionalidad', data.nationality)}
                {renderField('Sexo al nacer', capitalize(data.gender))}
                {renderField('INE', data.ineNumber)}
                {renderField('Estado Civil', capitalize(data.maritalStatus))}
                {renderField('Tel. Fijo', data.landlinePhone)}
                {renderField('Celular', data.cellPhone)}
            </ReviewSection>
            <ReviewSection title="Domicilio del Cliente" stepIndex={1}>
                {renderField('Dirección', `${data.street} ${data.exteriorNumber} ${data.interiorNumber || ''}, ${data.neighborhood}, ${data.postalCode}, ${data.city}, ${data.state}`)}
            </ReviewSection>
            <ReviewSection title="RFC y Constancia Fiscal" stepIndex={2}>
                {renderField('RFC', data.rfc)}
                {renderFile('Constancia Fiscal', data.fiscalCertificate)}
            </ReviewSection>
            <ReviewSection title="Identificación Oficial" stepIndex={3}>
                {renderFile('ID Frente', data.idFront)}
                {renderFile('ID Reverso', data.idBack)}
            </ReviewSection>
            <ReviewSection title="Comprobante de Domicilio" stepIndex={4}>
                {renderField('Tipo', data.addressProofType)}
                {renderFile('Comprobante', data.addressProofFile)}
            </ReviewSection>
            <ReviewSection title="Domicilio del Inmueble" stepIndex={5}>
                 {renderField('Dirección', `${data.propertyStreet} ${data.propertyExteriorNumber} ${data.propertyInteriorNumber || ''}, ${data.propertyNeighborhood}, ${data.propertyPostalCode}, ${data.propertyCity}, ${data.propertyState}`)}
                 {renderField('Descripción', data.propertyDescription)}
            </ReviewSection>
             <ReviewSection title="Escritura del Inmueble" stepIndex={6}>
                {renderFile('Escritura', data.propertyDeed)}
            </ReviewSection>
            <ReviewSection title="Información Bancaria" stepIndex={7}>
                {renderField('Banco', data.bankName)}
                {renderField('CLABE', data.clabeNumber)}
            </ReviewSection>
        </div>
    );
};


const Step10_Contract: React.FC<StepProps> = ({ data, hasAgreedToContract, setHasAgreedToContract }) => {
    return (
         <div className="space-y-8">
            <StepHeader 
                title="Contrato de Administración" 
                subtitle="Por favor, lee cuidadosamente el contrato y acéptalo para finalizar tu registro."
            />
            <div className="border border-alasla-gray-medium rounded-xl max-h-[50vh] overflow-y-auto bg-white shadow-inner">
                <div className="p-6 md:p-8">
                    <ContractDisplay data={data} />
                </div>
            </div>
            <div className="pt-6 border-t border-alasla-gray-medium">
                 <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 transition-shadow">
                    <label className="flex items-start space-x-4 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={hasAgreedToContract}
                            onChange={(e) => setHasAgreedToContract?.(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="relative flex-shrink-0 w-6 h-6 mt-0.5 rounded-md flex items-center justify-center border-2 border-alasla-gray-dark/50 group-hover:border-alasla-dark transition-all duration-200 ease-in-out peer-checked:border-alasla-red-start peer-checked:bg-alasla-red-start">
                            <Check className="w-4 h-4 text-white transform scale-0 opacity-0 transition-all duration-200 ease-in-out peer-checked:scale-100 peer-checked:opacity-100" />
                        </div>
                        <div className="flex-1">
                            <span className="text-base font-semibold text-alasla-dark">Aceptación del Contrato</span>
                            <p className="text-sm text-alasla-gray-dark mt-1 leading-relaxed">
                                Al marcar esta casilla, confirmo que he leído, comprendido y acepto íntegramente los <strong className="font-semibold text-alasla-dark">términos y condiciones</strong> del Contrato de Administración.
                            </p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

// --- Main Stepper Component ---

const steps = [
    { name: 'Personal', description: 'Datos de contacto e identidad.', component: Step1_Personal, fields: ['fullNameOfficial', 'ineNumber', 'maritalStatus', 'dateOfBirth', 'nationality', 'cellPhone', 'gender'], icon: UserCircle },
    { name: 'Domicilio', description: 'Tu dirección de residencia.', component: Step2_Address, fields: ['street', 'exteriorNumber', 'neighborhood', 'postalCode', 'city', 'state'], icon: MapPin },
    { name: 'RFC', description: 'Información para facturación.', component: Step3_RFC, fields: ['rfc', 'fiscalCertificate'], icon: FileText },
    { name: 'Identificación', description: 'Credencial oficial vigente.', component: Step4_Identification, fields: ['idFront', 'idBack'], icon: CreditCard },
    { name: 'Comprobante', description: 'Verificación de domicilio.', component: Step5_ProofAddress, fields: ['addressProofType', 'addressProofFile'], icon: FileClock },
    { name: 'Inmueble', description: 'Dirección de la propiedad.', component: Step6_PropertyAddress, fields: ['propertyStreet', 'propertyExteriorNumber', 'propertyNeighborhood', 'propertyPostalCode', 'propertyCity', 'propertyState', 'propertyDescription'], icon: Home },
    { name: 'Escritura', description: 'Documento legal de propiedad.', component: Step7_PropertyDeed, fields: ['propertyDeed'], icon: ShieldCheck },
    { name: 'Bancaria', description: 'Cuenta para recibir pagos.', component: Step8_Banking, fields: ['bankName', 'clabeNumber'], icon: DollarSign },
    { name: 'Revisión', description: 'Verifica tus datos finales.', component: Step9_Review, fields: [], icon: CheckCircle },
    { name: 'Contrato', description: 'Firma legal del acuerdo.', component: Step10_Contract, fields: [], icon: Signature }
];

// Mock data initialized to empty values
export const mockOnboardingData: OnboardingData = {
    fullNameOfficial: '',
    ineNumber: '',
    maritalStatus: '',
    dateOfBirth: '',
    nationality: '',
    landlinePhone: '',
    cellPhone: '',
    gender: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    neighborhood: '',
    postalCode: '',
    city: '',
    state: '',
    rfc: '',
    fiscalCertificate: null,
    idFront: null,
    idBack: null,
    addressProofType: '',
    addressProofFile: null,
    propertyStreet: '',
    propertyExteriorNumber: '',
    propertyInteriorNumber: '',
    propertyNeighborhood: '',
    propertyPostalCode: '',
    propertyCity: '',
    propertyState: '',
    propertyDescription: '',
    propertyDeed: null,
    bankName: '',
    clabeNumber: '',
};


export const OnboardingStepper: React.FC = () => {
    const { user, completeOnboarding } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [hasAgreedToContract, setHasAgreedToContract] = useState(false);
    const [isSignatureModalOpen, setSignatureModalOpen] = useState(false);
    
    const [data, setData] = useState<OnboardingData>(mockOnboardingData);

    const storageKey = useMemo(() => user ? `onboardingProgress_${user.id}` : null, [user]);

    // This component no longer uses localStorage for mock data stability.
    // The following useEffects can be re-enabled for production use.
    
    // // Effect to load saved progress on mount
    // useEffect(() => { ... });
    // // Effect to save progress on change
    // useEffect(() => { ... });

    const mainContentRef = useRef<HTMLElement>(null);
    const stepRefs = useRef<Array<React.RefObject<HTMLLIElement>>>([]);
    if (stepRefs.current.length !== steps.length) {
      stepRefs.current = Array(steps.length).fill(null).map((_, i) => stepRefs.current[i] || createRef<HTMLLIElement>());
    }

    useEffect(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
      }
    }, [currentStep]);
    
    // Effect to scroll sidebar to active step
    useEffect(() => {
        const activeStepRef = stepRefs.current[currentStep];
        if (activeStepRef?.current) {
            activeStepRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentStep]);

    const updateData = (fields: Partial<OnboardingData>) => {
        setData(prev => ({ ...prev, ...fields }));
    };
    
    const goToStep = (stepIndex: number) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrentStep(stepIndex);
        }
    };

    const isStepComplete = (stepIndex: number): boolean => {
        const step = steps[stepIndex];
        if (!step || !step.fields || step.fields.length === 0) {
            return true; // Steps without fields (like Review & Contract) are considered complete by default.
        }
        const fields = step.fields as (keyof OnboardingData)[];
        return fields.every(field => {
            const value = data[field];
            return !(value === null || value === '' || value === undefined);
        });
    };

    const isReadyForSubmission = useMemo(() => {
        const allStepsComplete = steps
            .slice(0, steps.length - 1) // All steps except the final contract signing page
            .every((_, index) => isStepComplete(index));
        
        return allStepsComplete && hasAgreedToContract;
    }, [data, hasAgreedToContract]);


    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinalSubmit = (signatureDataUrl: string) => {
        console.log("Submitting data:", data);
        console.log("With signature:", signatureDataUrl.substring(0, 50) + "..."); // Log a snippet
        setSignatureModalOpen(false);
        
        if (user) {
            sessionStorage.setItem(`contract_status_${user.id}`, 'pending');
            
            const propertyDataForDashboard = {
                street: data.propertyStreet,
                exteriorNumber: data.propertyExteriorNumber,
                interiorNumber: data.propertyInteriorNumber,
                city: data.propertyCity,
                state: data.propertyState,
                description: data.propertyDescription
            };
            localStorage.setItem(`property_listing_${user.id}`, JSON.stringify(propertyDataForDashboard));
        }

        alert("¡Registro completado! Serás redirigido al panel principal.");
        if (storageKey) {
            localStorage.removeItem(storageKey);
        }
        completeOnboarding();
    };

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row max-w-6xl md:h-[calc(100vh-8.5rem)] w-full mx-auto animate-fade-in overflow-hidden">
                <aside className="md:w-[320px] flex-shrink-0 bg-gray-900 text-white p-8 flex flex-col rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                    <div className="mb-10 flex-shrink-0">
                        <ArrivingCarAnimation className="h-20 w-auto text-gray-300" />
                        <h2 className="text-xl font-bold mt-4 text-gray-100">Conviértete en anfitrión</h2>
                    </div>
                    <nav className="relative -ml-4 pr-4 overflow-y-auto flex-1 min-h-0">
                        <ol>
                            {steps.map((step, index) => {
                                const StepIcon = step.icon;
                                const isCompleted = isStepComplete(index);
                                return (
                                    <li key={step.name} ref={stepRefs.current[index]} className="relative pb-10 last:pb-0">
                                        {index < steps.length - 1 && <div className={`absolute top-4 left-4 -ml-px w-0.5 h-full ${isCompleted ? 'bg-alasla-red-start' : 'bg-gray-700'}`} aria-hidden="true" />}
                                        <button onClick={() => goToStep(index)} className="w-full text-left focus:outline-none group">
                                            <div className="relative flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    {isCompleted && index !== currentStep ? (
                                                        <div className="h-8 w-8 rounded-full bg-alasla-red-start flex items-center justify-center">
                                                            <Check className="w-5 h-5 text-white" />
                                                        </div>
                                                    ) : (
                                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                                                            index === currentStep
                                                                ? 'border-alasla-red-start bg-alasla-red-start/10'
                                                                : 'border-gray-600 bg-gray-800 group-hover:border-gray-400'
                                                        }`}>
                                                            <StepIcon className={`w-5 h-5 transition-colors ${
                                                                index === currentStep ? 'text-alasla-red-start' : 'text-gray-500 group-hover:text-gray-300'
                                                            }`} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col pt-1 min-w-0">
                                                    <span className={`font-bold text-sm truncate ${index === currentStep ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{step.name}</span>
                                                    <span className="text-sm text-gray-400 truncate">{step.description}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </aside>
                <main ref={mainContentRef} className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                           <CurrentStepComponent data={data} updateData={updateData} goToStep={goToStep} hasAgreedToContract={hasAgreedToContract} setHasAgreedToContract={setHasAgreedToContract} />
                        </div>
                        <div className="mt-auto p-8 border-t border-alasla-gray-medium flex justify-between items-center flex-shrink-0 bg-white">
                            <div>
                                {currentStep > 0 && (
                                    <Button type="button" onClick={handleBack} variant="secondary">
                                        Anterior
                                    </Button>
                                )}
                            </div>
                            <div>
                                {currentStep < steps.length - 1 ? (
                                    <Button type="button" onClick={handleNext}>
                                        Siguiente
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={() => setSignatureModalOpen(true)} disabled={!isReadyForSubmission}>
                                        Proceder a la Firma
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <SignatureModal
                isOpen={isSignatureModalOpen}
                onClose={() => setSignatureModalOpen(false)}
                onSave={handleFinalSubmit}
            />

            <OnboardingAssistant currentStep={currentStep} />
        </div>
    );
};

export default OnboardingStepper;
