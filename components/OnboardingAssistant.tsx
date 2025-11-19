
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
    <div className={`flex items-center justify-center bg-gradient-to-br from-alasla-red-start to-alasla-red-end text-white shadow-sm rounded-full ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3/5 h-3/5">
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
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
