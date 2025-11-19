
import React from 'react';
import ContractDisplay from './ContractDisplay';
import { mockOnboardingData } from './OnboardingStepper'; 

const ContractView: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center no-print">
                <h1 className="text-3xl font-bold text-alasla-dark">Tu Contrato de Administración</h1>
                <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-alasla-dark text-white text-sm font-semibold rounded-lg hover:bg-alasla-dark/90 transition-colors focus:outline-none focus:ring-2 focus:ring-alasla-red-start/50"
                >
                    Imprimir o Guardar PDF
                </button>
            </div>
            <p className="text-alasla-gray-dark no-print">
                Este es el contrato que aceptaste durante tu registro. Puedes revisarlo en cualquier momento.
            </p>
            <div id="printable-contract-area">
                <style>
                    {`
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            #printable-contract-area, #printable-contract-area * {
                                visibility: visible;
                            }
                            #printable-contract-area {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                max-height: none;
                                overflow: visible;
                                -webkit-print-color-adjust: exact;
                                print-color-adjust: exact;
                            }
                            #printable-contract-area .border {
                                border: none !important;
                                box-shadow: none !important;
                            }
                             .no-print {
                                display: none !important;
                             }
                        }
                    `}
                </style>
                <div className="border border-alasla-gray-medium rounded-xl max-h-[70vh] overflow-y-auto bg-white shadow-inner">
                    <div className="p-6 md:p-8">
                        <ContractDisplay data={mockOnboardingData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractView;