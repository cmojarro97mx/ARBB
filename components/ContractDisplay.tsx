
import React from 'react';
import { OnboardingData } from '../types';

// Helper function
const capitalize = (s?: string) => s ? s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

// --- Contract Generation ---
const generateContractHTML = (d: OnboardingData): string => {
    const P = (text: string) => `<p class="mb-4">${text}</p>`;
    const UList = (items: [string, string][]) => `<ul class="grid grid-cols-2 gap-x-8 gap-y-1 my-4">${items.map(item => `<li class="flex"><span class="mr-2">&#62;</span><span>${item[0]}</span></li><li class="flex"><span class="mr-2">&#62;</span><span>${item[1]}</span></li>`).join('')}</ul>`;
    const H2 = (text: string) => `<h2 class="text-center font-bold text-xl text-alasla-dark mt-8 mb-6 border-b border-alasla-gray-medium pb-3">${text}</h2>`;
    const H3 = (text: string) => `<h3 class="font-bold text-base text-alasla-dark mt-6 mb-3">${text}</h3>`;
    const H4 = (text: string) => `<h4 class="font-bold text-sm text-alasla-dark mt-6 mb-2">${text}</h4>`;
    const B = (text: string) => `<strong class="font-semibold">${text}</strong>`;
    const BLANK = '__________';

    const fullAddress = d.street ? `${d.street || ''} ${d.exteriorNumber || ''} ${d.interiorNumber || ''}`.trim() : BLANK;
    
    // ... constants ...
    const COMPANY_NAME = "ALASLA S.A. DE C.V.";
    const REP_NAME = "RODRIGO ASLA"; // Nombre representativo para la marca
    const RFC_COMPANY = "ALA190101AAA";
    const DEED_INFO = "[DATOS DE ESCRITURA CONSTITUTIVA DE ALASLA]";

    return `
        <div class="text-justify text-alasla-dark text-sm leading-relaxed font-sans" style="font-family: Arial, sans-serif;">
            ${P(`CONTRATO DE ADMINISTRACIÓN DE PLATAFORMAS TECNOLÓGICAS Y BIENES INMUEBLES por medio del uso de tecnologías de la información que celebran por una parte a quien en lo sucesivo se le denominara como el ${B('CLIENTE')}, ${B(d.fullNameOfficial || BLANK)}, y por la otra la sociedad mercantil denominada ${B(COMPANY_NAME)} representada en este acto por su apoderado legal ${B(REP_NAME)}, a quien en lo sucesivo se le denominara como la ${B('ADMINISTRADORA')}, al tenor de lo dispuesto por las siguientes:`)}
            
            ${H2('DECLARACIONES:')}
            ${H3('Primera.- Declara el CLIENTE, a través de su apoderado legal:')}
            ${P(`a. Que es una persona física mayor de edad, mexicano, en pleno ejercicio de sus derechos civiles y con plena capacidad jurídica para obligarse y contraer en términos del ordenamiento Civil, que se identifica con su credencial para votar número ${B(d.ineNumber || BLANK)} expedida por el Instituto Nacional Electoral.`)}
            ${P(`b. Que para efectos del presente contrato su domicilio será el ubicado en ${B(fullAddress)} número ${B(d.exteriorNumber || BLANK)} colonia ${B(d.neighborhood || BLANK)} C.P. ${B(d.postalCode || BLANK)}, en ${B(d.city || BLANK)}, ${B(d.state || BLANK)}.`)}
            ${P(`c. Que es su intención celebrar el presente contrato de comisión, para lograr la venta de uno o varios inmuebles.`)}
            ${P(`d. Que acredita la propiedad del o los inmuebles mediante las copias que se anexan al presente instrumento, mismas que fueron previamente cotejadas con su original.`)}
            ${P(`e. Que cuenta con los recursos económicos necesarios para hacer frente a las obligaciones que a su cargo se derivan del presente CONTRATO.`)}
            ${P(`f. Que su Registro Federal de Contribuyentes es ${B(d.rfc || BLANK)}.`)}

            ${H3('Segunda.- Declara la ADMINISTRADORA por conducto de su representante legal, lo siguiente:')}
            ${P(`a. Que su representada es una Sociedad Mercantil Mexicana debidamente constituida de conformidad con las leyes de los Estados Unidos Mexicanos bajo la denominación “${COMPANY_NAME}", situación que acredita mediante ${DEED_INFO}.`)}
            ${P(`b. Que cuenta con las facultades necesarias y suficientes para obligarla en los términos del presente CONTRATO, situación que acreditan mediante instrumento público antes mencionado, asimismo, manifiesta que dichas facultades no le han sido limitadas, modificadas o revocadas en forma alguna a esta fecha.`)}
            ${P(`c. Que cuenta plenamente con capacidad de goce y ejercicio de sus derechos, y por tanto con las más amplias facultades para celebrar este contrato y obligarse en sus términos, de acuerdo con lo disposto por el artículo 78 del código de comercio.`)}
            ${P(`d. Que sus actividades principales, son entre la prestación de todo tipo de servicios de representación, intermediación, asesoría, interpretación, gestión, así como para llevar a cabo todo tipo de trámites, y demás actividades relacionadas.`)}
            ${P(`e. Que los recursos con los que hará frente a sus obligaciones derivadas del presente CONTRATO provienen de su actividad comercial, en consecuencia, de una fuente lícita.`)}
            ${P(`f. Que su Registro Federal de Contribuyentes es ${RFC_COMPANY}.`)}

            ${H3('Tercera. Declaran ambas PARTES:')}
            ${P(`a. Que se reconocen mutuamente la personalidad, facultades con que comparecen en éste acto y que celebran el mismo de buena fe y lealtad negocial.`)}
            ${P(`b. Que cada uno de los contratantes ejerce su actividad comercial de manera independiente y autónoma con sus propios recursos, de modo que no existe entre ellos ninguna relación de trabajo, dependencia o subordinación que pudiere dar lugar a conflictos de índole laboral.`)}
            ${P(`c. Que es su deseo celebrar el presente contrato administración por lo que manifiestan expresamente su voluntad de contratar, además señalan que no existe vicio alguno de consentimiento, error, dolo o violencia y que la suscripción del mismo se encuentra basada en la legalidad, honradez y buena fe de ambas partes.`)}
            ${P(`Realizadas que fueron por las partes las anteriores declaraciones y manifestándose conformes con el contenido del mismo, están de acuerdo en sujetar su voluntad al cumplimiento del contenido de este contrato, que de común acuerdo han establecido, conforme a los siguientes capítulos de definiciones y clausulas:`)}
            
            ${H2('DEFINICIONES:')}
            ${P(`${B('CATALOGO O LISTAS DE PRECIOS.')} Es el precio mínimo establecido y actualizado de manera unilateral por el Cliente, mismo que será publicado en la plataforma tecnológica a efecto de que se permita su uso y goce temporal.`)}
            ${P(`${B('CARACTERÍSTICAS DEL INMUEBLE.')} Son las especificaciones del inmueble que el propietario aprobará sean utilizadas en la información del Inmueble.`)}
            ${P(`${B('ADMINISTRADORA.')} Es el agente que prestará por nombre y cuenta del Cliente los servicios que son objeto del presente contrato, mismos que realizará de manera independiente, debiendo absorber y sufragar cualquier gasto o costo para el cumplimiento de su gestión.`)}
            ${P(`${B('CLIENTE.')} Es la persona física propietaria de un bien inmueble que, por medio de este contrato, encarga y delega la administración de una cuenta en una plataforma tecnológica para que el Administradora`)}
            ${P(`${B('COMISIÓN.')} Es la contraprestación que deberá pagar el Cliente, al Administradora por la prestación de sus servicios, bajo los términos y condiciones estipulados en el presente contrato.`)}
            ${P(`${B('INMUEBLE.')} Es el bien inmueble que el Cliente pretende ofrecer y publicitar por medio de las plataformas tecnológicas utilizadas para la prospección de clientes que tienen la finalidad de encontrar hospedaje o arrendar bienes por periodos de estancia cortos, por ejemplo; Airbnb.`)}
            ${P(`${B('HUÉSPED.')} Son la o las personas físicas que hacen uso temporal del inmueble, que acompañan al Usuario.`)}
            ${P(`${B('PLATAFORMAS TECNOLÓgicas.')} Es la plataforma de servicios de hospedaje y comunicación que busca poner en contacto a prospectos de huéspedes con los propietarios, a efecto de encontrar hospedaje, que será utilizada y administrada por la ADMINISTRADORA, por ejemplo, la denominada Airbnb`)}
            ${P(`${B('TÉRMINOS Y CONDICIONES.')} Son los lineamientos, políticas y estatutos establecidos por la plataforma tecnológica, que el propietario del inmueble debe seguir y cumplir, a efecto de poder ofrecer servicios de hospedaje de un bien inmueble por medio de la plataforma tecnológica, mismos que pueden ser consultados en www.airbnb.mx/help/topic/1578/términos-y-políticas`)}
            ${P(`${B('USUARIO.')} Es la persona física que utiliza las plataformas tecnológicas, a efecto de encontrar un inmueble para hospedarse por periodos cortos.`)}

            ${H2('CLÁUSULAS:')}
            ${H3('Primera. DEL OBJETO')}
            ${P(`Ambas partes están conformes y así lo pactan, que el objeto del presente contrato será la prestación de los servicios de administración de las cuentas de ${B('PLATAFORMAS TECNOLÓGICAS')}, así como del o los ${B('INMUEBLES')} asociados a estas, a efecto de otorgar el uso y goce temporal del bien ${B('INMUEBLE')} por periodos cortos (máximo un año), a cambio de una contraprestación por cada estancia lograda a la que en lo sucesivo denominaremos como ${B('"COMISIÓN(es)".')}`)}
            ${P(`Para tales efectos, las partes acuerdan que principalmente se utilizará la plataforma tecnológica denominada Airbnb, sin embargo, podrá utilizarse cualquier otra que se encuentre a disposición en el mercado, según la opinión y conocimientos de la ${B('ADMINISTRADORA')}.`)}
            ${P(`Así mismo, las partes acuerdan que, el ${B('INMUEBLE')} deberá de encontrarse siempre asociado a una cuenta de la ${B('ADMINISTRADORA')}, en ningún caso el Cliente podrá contratar el servicio si quisiera hacerlo a través de una cuenta propia.`)}

            ${H4(`Dichos servicios de administración en cuenta de la ADMINISTRADORA incluyen, de forma enunciativa, más no limitativa, lo siguiente;`)}
            ${UList([
                ['Creación de cuenta.', 'Edición de cuenta.'],
                ['Modificación de cuenta.', 'Realizar el proceso de verificación de identidad de Airbnb.'],
                ['Uso "Sign in with Apple" en Airbnb.', 'Mantener la seguridad de la cuenta.'],
                ['Conexión de Facebook con cuenta de Airbnb.', 'Administración de los pagos.'],
                ['Conexión de Google con cuenta de Airbnb.', 'Envío y recepción de mensajes.'],
                ['Confirmar reservaciones.', 'Comunicarse con los huéspedes.']
            ])}
            ${P(`De igual forma, el o los INMUEBLE(s), se encuentra(n) relacionados en el ANEXO 1, junto con el precio mínimo de renta establecido por el CLIENTE, mismo que se firma por las PARTES y forma parte integral del presente instrumento, dichos inmuebles, al formar parte del servicio de administración, el CLIENTE deberá poner a disposición de la ADMINISTRADORA las llaves de acceso, así como permitir el acceso de manera continua.`)}
            ${P(`Para los efectos de interpretación de esta cláusula, el ADMINISTRADORA deberá ser siempre considerada como un mandatario designado por el CLIENTE y deberá llevar a cabo todos los actos necesarios y tendentes para salvaguardar los intereses de su mandante como si fueran propios, además, el CLIENTE deberá mantenerse al tanto de los términos y condiciones con los que el inmueble objeto del contrato debe cumplir de conformidad con las plataformas tecnológicas.`)}
            ${P(`Así mismo, las partes reconocen que los ANEXOS del presente contrato, forman parte integral del mismo, por lo que aceptan obligarse en los términos de los mismos.`)}

            ${H3('Segunda. DE LOS SERVICIOS CONTEMPLADOS.')}
            ${P(`Las partes están de acuerdo en que, para efectos de poder administrar de manera adecuada tanto las cuentas en plataformas electrónicas, como el o los inmuebles, la ${B('ADMINISTRADORA')} se encargará o proporcionará, lo siguiente:`)}
            ${P(`${B('ADMINISTRACIÓN DE LA CUENTA.')} La ADMINISTRADORA se encargará de administrar la cuenta de la PLATAFORMA TECNOLÓGICA, proporcionando a través de ella, las características indicadas por el CLIENTE, el número de huéspedes permitidos, los servicios con los que cuenta, la calidad de SuperHost en caso de tenerla, las normas del INMUEBLE, los accesos, las funciones de seguridad, las amenidades con las que cuenta, las medidas higiene y seguridad, las acciones consideradas ante la COVID-19 u otra situación similar.`)}
            ${P(`Así mismo, la ${B('ADMINISTRADORA')} podrá tomar fotografías con la calidad que ella estime necesaria a efecto de promocionar el INMUEBLE, Los derechos de propiedad intelectual derivados de dichas fotografías son propiedad de la Administradora, por lo que, en caso que el Cliente quisiera hacer uso de estas, deberá de pagar los derechos originados por las mismas, de conformidad a los precios establecidos por la ADMINISTRADORA.`)}
            ${P(`${B('DE LOS CAMBIOS A LAS TARIFAS.')} Las partes acuerdan que, si bien existe un catálogo de precios, se entiende que este es el mínimo, por lo que la ADMINISTRADORA podrá sugerir precios dinámicos según la demanda y temporada, siempre buscando el mayor beneficio para el CLIENTE.`)}
        </div>
    `;
};

const ContractDisplay: React.FC<{ data: OnboardingData }> = ({ data }) => {
    const htmlContent = generateContractHTML(data);
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ContractDisplay;
