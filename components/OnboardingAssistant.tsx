
import React, { useState, useEffect, useMemo } from 'react';
import { MessageSquare, XIcon, LightbulbIcon, CheckCircle, Home, FileText } from './Icons';

interface Tip {
  icon: React.ElementType;
  title: string;
  content: string;
}

const assistantTips: Record<number, Tip[]> = {
  0: [
    { icon: LightbulbIcon, title: "¡Bienvenido!", content: "Soy tu asistente. Te guiaré para que completes tu registro de forma rápida y sencilla." },
    { icon: LightbulbIcon, title: "Nombre Oficial", content: "Asegúrate de que tu nombre completo coincida exactamente con el de tu identificación oficial (INE/Pasaporte)." },
  ],
  1: [
    { icon: Home, title: "Tu Domicilio", content: "Ingresa la dirección tal como aparece en tu comprobante de domicilio. Esto es importante para la verificación." },
    { icon: LightbulbIcon, title: "¡Vas muy bien!", content: "Cada paso que completas nos acerca a tener tu propiedad lista para recibir huéspedes." },
  ],
  2: [
    { icon: FileText, title: "Información Fiscal", content: "Tu RFC y Constancia Fiscal son cruciales. Tómate tu tiempo para ingresarlos correctamente." },
    { icon: LightbulbIcon, title: "Régimen Correcto", content: "Recuerda que debes estar en el 'Régimen de Plataformas Tecnológicas' para evitar inconvenientes." },
  ],
  3: [
    { icon: LightbulbIcon, title: "Fotos Claras", content: "Sube fotos nítidas y bien iluminadas de tu identificación. Asegúrate de que todo el texto sea legible." },
  ],
  4: [
    { icon: LightbulbIcon, title: "Documento Reciente", content: "El comprobante de domicilio no debe tener más de 3 meses de antigüedad. ¡Revisa la fecha!" },
  ],
  5: [
    { icon: Home, title: "Detalles del Inmueble", content: "Describe tu propiedad de forma atractiva. Piensa en lo que la hace especial para los futuros huéspedes." },
    { icon: LightbulbIcon, title: "¡Ya casi!", content: "Estás en la recta final de la sección de documentos. ¡Sigue así!" },
  ],
  6: [
    { icon: FileText, title: "Escritura de Propiedad", content: "Este documento verifica que eres el propietario legal. Solo necesitamos la primera hoja donde aparecen los datos clave." },
  ],
  7: [
    { icon: LightbulbIcon, title: "Doble Verificación", content: "Revisa tu CLABE interbancaria dos veces. Un número incorrecto puede causar retrasos en tus pagos." },
  ],
  8: [
    { icon: CheckCircle, title: "Revisión Final", content: "Este es el momento de verificar que toda tu información sea correcta. Un último vistazo te ahorrará tiempo después." },
    { icon: LightbulbIcon, title: "Excelente Trabajo", content: "Has completado toda la información. ¡Solo queda un paso más!" },
  ],
  9: [
    { icon: FileText, title: "El Contrato", content: "Lee con atención los términos y condiciones. Este es el acuerdo que formaliza nuestra colaboración." },
    { icon: LightbulbIcon, title: "¡Felicidades!", content: "Estás a un clic de convertirte oficialmente en anfitrión de Alasla. ¡Estamos emocionados de tenerte!" },
  ]
};

const AlaslaBotAvatar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="avatar-bg-pro" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#484848" />
                <stop offset="1" stopColor="#222222" />
            </linearGradient>
            <linearGradient id="robot-head-pro" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#F7F7F7" />
                <stop offset="1" stopColor="#DCDCDC" />
            </linearGradient>
            <linearGradient id="robot-neck-pro" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop stopColor="#C0C0C0" />
                <stop offset="1" stopColor="#A9A9A9" />
            </linearGradient>
            <filter id="eye-glow-pro" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#avatar-bg-pro)" stroke="#555" strokeWidth="1.5" />
        <path d="M42 75 C 40 85, 60 85, 58 75 Z" fill="url(#robot-neck-pro)" />
        <path d="M28 35 C 28 22, 72 22, 72 35 V 70 C 72 78, 64 80, 50 80 C 36 80, 28 78, 28 70 Z" fill="url(#robot-head-pro)" stroke="#B0B0B0" strokeWidth="1" />
        <path d="M30 35 C 40 32, 60 32, 70 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <g>
            <rect x="35" y="48" width="30" height="10" rx="3" fill="#222222" />
            <rect x="36" y="50" width="28" height="6" rx="2" fill="#FF5A5F" filter="url(#eye-glow-pro)" />
        </g>
        <g transform="translate(70 50)">
            <circle cx="0" cy="0" r="5" fill="#C0C0C0" stroke="#B0B0B0" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#484848" />
        </g>
    </svg>
);


const OnboardingAssistant: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  const currentTips = useMemo(() => assistantTips[currentStep] || [], [currentStep]);

  useEffect(() => {
    setIsOpen(false);
    setKey(prevKey => prevKey + 1);
  }, [currentStep]);

  // Auto-close effect
  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = window.setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [isOpen]);


  const TipBubble: React.FC<{ tip: Tip; delay: number }> = ({ tip, delay }) => {
    const Icon = tip.icon;
    return (
      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg animate-fade-in" style={{ animationDelay: `${delay}ms`}}>
        <div className="flex-shrink-0 mt-1">
            <Icon className="w-5 h-5 text-alasla-red" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-alasla-dark">{tip.title}</h4>
          <p className="text-xs text-alasla-gray-dark mt-0.5">{tip.content}</p>
        </div>
      </div>
    );
  };
  
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-alasla-red/50 focus:ring-offset-2"
            aria-label="Abrir asistente AlaslaBot"
        >
            <AlaslaBotAvatar className="w-full h-full object-cover" />
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alasla-red-start opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-alasla-red-end ring-2 ring-white"></span>
            </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
        <div className={`bg-alasla-gray-light rounded-2xl shadow-2xl border border-alasla-gray-medium transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <header className="flex items-center justify-between p-3 border-b border-alasla-gray-medium bg-white rounded-t-2xl">
                <div className="flex items-center space-x-3">
                    <AlaslaBotAvatar className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-bold text-alasla-dark">AlaslaBot</h3>
                        <p className="text-xs text-alasla-gray-dark -mt-0.5">Asistente Virtual</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-alasla-gray-medium text-alasla-gray-dark">
                    <XIcon className="w-4 h-4" />
                </button>
            </header>
            <div className="p-3 space-y-2 max-h-80 overflow-y-auto" key={key}>
                {currentTips.map((tip, index) => (
                    <TipBubble key={index} tip={tip} delay={index * 150} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default OnboardingAssistant;
