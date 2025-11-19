
import React, { useState, useEffect, useMemo } from 'react';
import { XIcon, LightbulbIcon, CheckCircle, Home, FileText, InfoIcon } from './Icons';

interface Tip {
  icon: React.ElementType;
  title: string;
  content: string;
}

const assistantTips: Record<number, Tip[]> = {
  0: [
    { icon: LightbulbIcon, title: "Comencemos", content: "Esta guía te acompañará en cada paso. Revisa estos consejos para agilizar tu registro." },
    { icon: FileText, title: "Nombre Oficial", content: "Asegúrate de escribir tu nombre exactamente como aparece en tu identificación oficial (INE o Pasaporte)." },
  ],
  1: [
    { icon: Home, title: "Tu Domicilio", content: "Ingresa la dirección tal como aparece en tu comprobante de domicilio. Esto es vital para la verificación de identidad." },
    { icon: CheckCircle, title: "Progreso", content: "Cada sección completada se guardará automáticamente." },
  ],
  2: [
    { icon: FileText, title: "Información Fiscal", content: "Ten a la mano tu Constancia de Situación Fiscal. Necesitaremos datos exactos de tu régimen." },
    { icon: InfoIcon, title: "Régimen Requerido", content: "Recuerda que debes estar en el 'Régimen de Plataformas Tecnológicas' para evitar retenciones excesivas." },
  ],
  3: [
    { icon: LightbulbIcon, title: "Fotos Claras", content: "Al subir tu identificación, asegúrate de que la imagen no esté borrosa y que los textos sean legibles." },
  ],
  4: [
    { icon: InfoIcon, title: "Vigencia", content: "El comprobante de domicilio no debe tener más de 3 meses de antigüedad." },
  ],
  5: [
    { icon: Home, title: "Describe tu espacio", content: "Piensa en lo que hace especial a tu propiedad. Una buena descripción atrae a mejores huéspedes." },
    { icon: CheckCircle, title: "Casi listo", content: "Estás en la recta final de la sección de captura de datos." },
  ],
  6: [
    { icon: FileText, title: "Escritura", content: "Solo necesitamos la primera hoja de la escritura donde aparecen los datos del propietario y la dirección." },
  ],
  7: [
    { icon: InfoIcon, title: "Pagos", content: "Verifica tu CLABE dos veces. Aquí es donde depositaremos tus ganancias futuras." },
  ],
  8: [
    { icon: CheckCircle, title: "Revisión", content: "Tómate un momento para leer todos los datos. Corregir ahora es más fácil que hacerlo después." },
  ],
  9: [
    { icon: FileText, title: "Contrato Digital", content: "Lee los términos y condiciones. Al firmar, formalizas nuestra colaboración." },
    { icon: LightbulbIcon, title: "¡Finalizar!", content: "Una vez firmado, tu perfil pasará a revisión por nuestro equipo." },
  ]
};

const AlaslaBotAvatar: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative flex items-center justify-center bg-gradient-to-br from-alasla-red-start to-alasla-red-end text-white shadow-sm rounded-full overflow-hidden ${className}`}>
         <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-3/5 h-3/5"
        >
            <style>
                {`
                    .avatar-draw {
                        stroke-dasharray: 50;
                        stroke-dashoffset: 50;
                        animation: drawAvatar 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
                    .avatar-pop {
                        opacity: 0;
                        transform: scale(0.5);
                        transform-origin: center;
                        animation: popAvatar 0.4s 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    }
                    @keyframes drawAvatar { to { stroke-dashoffset: 0; } }
                    @keyframes popAvatar { to { opacity: 1; transform: scale(1); } }
                `}
            </style>
            {/* Simplified House Icon replicating the main animation style */}
            <path 
                d="M3 9.5L12 3L21 9.5V21H3V9.5Z" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="avatar-draw" 
            />
            {/* Heart/Sparkle accent */}
            <path 
                d="M12 13C12 13 13.5 11.5 14.5 12.5C15.5 13.5 14.5 15 12 17C9.5 15 8.5 13.5 9.5 12.5C10.5 11.5 12 13 12 13Z" 
                fill="white" 
                className="avatar-pop"
            />
        </svg>
    </div>
);

const OnboardingAssistant: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Key helps trigger animation when content changes
  const [key, setKey] = useState(0);
  const [hasNewTips, setHasNewTips] = useState(false);

  const currentTips = useMemo(() => assistantTips[currentStep] || [], [currentStep]);

  useEffect(() => {
    // When step changes, briefly highlight the assistant button if closed
    setKey(prevKey => prevKey + 1);
    if (!isOpen) {
        setHasNewTips(true);
    }
  }, [currentStep, isOpen]);

  const handleOpen = () => {
      setIsOpen(true);
      setHasNewTips(false);
  };

  const TipCard: React.FC<{ tip: Tip; delay: number }> = ({ tip, delay }) => {
    const Icon = tip.icon;
    return (
      <div 
        className="flex items-start gap-4 p-4 bg-white border border-alasla-gray-medium/60 rounded-xl hover:border-alasla-gray-medium transition-colors duration-300 animate-fade-in shadow-sm" 
        style={{ animationDelay: `${delay}ms`}}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-alasla-red/5 flex items-center justify-center text-alasla-red-start">
            <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 pt-0.5">
          <h4 className="text-sm font-bold text-gray-900">{tip.title}</h4>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tip.content}</p>
        </div>
      </div>
    );
  };
  
  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
            onClick={handleOpen}
            className="group relative w-14 h-14 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
            aria-label="Ver guía de ayuda"
        >
            <AlaslaBotAvatar className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" />
            
            {/* Notification Badge */}
            {hasNewTips && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alasla-red-start opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-alasla-red-start ring-2 ring-white"></span>
                </span>
            )}
            
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Guía del registro
            </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[22rem] flex flex-col items-end">
        {/* Main Panel */}
        <div className={`w-full bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transition-all duration-300 ease-out transform origin-bottom-right overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
            
            {/* Modern Header - No "Online" status, purely informational */}
            <div className="px-6 py-5 border-b border-gray-100 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <AlaslaBotAvatar className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Asistente Alasla</h3>
                            <p className="text-xs text-gray-500 font-medium">Guía paso a paso</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-2 -mr-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                        aria-label="Cerrar guía"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 bg-gray-50/50 max-h-[60vh] overflow-y-auto" key={key}>
                <div className="space-y-3">
                    {currentTips.length > 0 ? (
                        currentTips.map((tip, index) => (
                            <TipCard key={index} tip={tip} delay={index * 100} />
                        ))
                    ) : (
                        <div className="text-center py-8 px-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-500">Todo se ve bien en este paso. Continúa cuando estés listo.</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200/60 text-center">
                     <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Sugerencias útiles</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OnboardingAssistant;
