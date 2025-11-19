
import React, { useState, useEffect, useMemo } from 'react';
import { XIcon, LightbulbIcon, CheckCircle, Home, FileText } from './Icons';

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

const AlaslaBotAvatar: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center justify-center bg-gradient-to-br from-alasla-red-start to-alasla-red-end text-white shadow-sm rounded-full overflow-hidden ${className}`}>
        <svg viewBox="0 0 40 40" fill="currentColor" className="w-3/5 h-3/5">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5 8L4 32H11.5L14.5 27H26.5L29.5 32H37L20.5 8ZM20.5 14L16.5 22H24.5L20.5 14Z" />
        </svg>
    </div>
);

const OnboardingAssistant: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  const currentTips = useMemo(() => assistantTips[currentStep] || [], [currentStep]);

  useEffect(() => {
    setIsOpen(false);
    setKey(prevKey => prevKey + 1);
  }, [currentStep]);

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = window.setTimeout(() => {
        setIsOpen(false);
      }, 15000); // Extended time for reading
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
      <div className="flex items-start space-x-3 p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in mb-2 last:mb-0" style={{ animationDelay: `${delay}ms`}}>
        <div className="flex-shrink-0 mt-0.5 p-1.5 bg-alasla-red-start/10 rounded-lg">
            <Icon className="w-4 h-4 text-alasla-red-start" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-alasla-dark">{tip.title}</h4>
          <p className="text-xs text-alasla-gray-dark mt-1 leading-relaxed">{tip.content}</p>
        </div>
      </div>
    );
  };
  
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-full bg-alasla-dark text-white shadow-lg shadow-alasla-dark/30 flex items-center justify-center transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-alasla-gray-medium group"
            aria-label="Abrir asistente"
        >
             {/* Chat Bubble Icon (Airbnb Style - Filled with dots) */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 p-0.5">
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.678 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
            </svg>
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alasla-red-start opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-alasla-red-start border-2 border-white"></span>
            </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
        <div className={`bg-alasla-gray-light rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 backdrop-blur-sm transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            {/* Professional Header */}
            <header className="flex items-center justify-between p-4 bg-white rounded-t-2xl border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <AlaslaBotAvatar className="w-10 h-10 ring-2 ring-offset-2 ring-gray-100" />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500" title="En línea"></span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight">Asistente Alasla</h3>
                        <div className="flex items-center mt-0.5">
                             <p className="text-[10px] font-medium text-gray-500">Ayuda para el paso actual</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    aria-label="Cerrar chat"
                >
                    <XIcon className="w-4 h-4" />
                </button>
            </header>
            
            {/* Body */}
            <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto bg-gray-50/50 rounded-b-2xl" key={key}>
                 {currentTips.length > 0 && (
                    <div className="text-center mb-2">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sugerencias</span>
                    </div>
                 )}
                {currentTips.map((tip, index) => (
                    <TipBubble key={index} tip={tip} delay={index * 150} />
                ))}
                {currentTips.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-xs">
                        No hay sugerencias específicas para este paso.
                    </div>
                )}
            </div>
             
        </div>
    </div>
  );
};

export default OnboardingAssistant;
