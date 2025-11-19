
import React from 'react';
import { OnboardingData } from '../types';

// Helper function
const capitalize = (s?: string) => s ? s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

// --- Contract Generation ---
const generateContractHTML = (d: OnboardingData): string => {
    const P = (text: string) => `<p class="mb-4">${text}</p>`;
    const UList = (items: [string, string][]) => `<ul class="grid grid-cols-2 gap-x-8 gap-y-1 my-4">${items.map(item => `<li class="flex"><span class="mr-2">&#62;</span><span>${item[0]}</span></li><li class="flex"><span class="mr-2">&#62;</span><span>${item[1]}</span></li>`).join('')}</ul>`;
    const BasicList = (items: string[]) => `<ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 my-4">${items.map(item => `<li class="flex items-start"><span class="mr-2 mt-1 text-alasla-red-start">&#9679;</span><span>${item}</span></li>`).join('')}</ul>`;
    const H2 = (text: string) => `<h2 class="text-center font-bold text-xl text-alasla-dark mt-8 mb-6 border-b border-alasla-gray-medium pb-3">${text}</h2>`;
    const H3 = (text: string) => `<h3 class="font-bold text-base text-alasla-dark mt-6 mb-3">${text}</h3>`;
    const H4 = (text: string) => `<h4 class="font-bold text-sm text-alasla-dark mt-6 mb-2">${text}</h4>`;
    const B = (text: string) => `<strong class="font-semibold">${text}</strong>`;
    const BLANK = '__________';

    const fullAddress = d.street ? `${d.street || ''} ${d.exteriorNumber || ''} ${d.interiorNumber || ''}`.trim() : BLANK;
    const fullPropertyAddress = d.propertyStreet ? `${d.propertyStreet || ''} ${d.propertyExteriorNumber || ''} ${d.propertyInteriorNumber || ''}`.trim() : BLANK;
    
    const today = new Date();
    const day = today.getDate();
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const month = monthNames[today.getMonth()];
    const yearNumber = "2025";

    return `
        <div class="text-justify text-alasla-dark text-sm leading-relaxed font-sans" style="font-family: Arial, sans-serif;">
            ${P(`CONTRATO DE ADMINISTRACIÓN DE PLATAFORMAS TECNOLÓGICAS Y BIENES INMUEBLES por medio del uso de tecnologías de la información que celebran por una parte a quien en lo sucesivo se le denominara como el ${B('CLIENTE')}, ${B(d.fullNameOfficial || BLANK)}, y por la otra la sociedad mercantil denominada ALASLA S.A. DE C.V. representada en este acto por su apoderado legal ASTRID ALEJANDRA LAPHAM ALVIZO, a quien en lo sucesivo se le denominara como la ${B('ADMINISTRADORA')}, al tenor de lo dispuesto por las siguientes:`)}
            
            ${H2('DECLARACIONES:')}
            ${H3('Primera.- Declara el CLIENTE, a través de su apoderado legal:')}
            ${P(`a. Que es una persona física mayor de edad, mexicano, en pleno ejercicio de sus derechos civiles y con plena capacidad jurídica para obligarse y contraer en términos del ordenamiento Civil del Estado de Jalisco, que se identifica con su credencial para votar número ${B(d.ineNumber || BLANK)} expedida por el Instituto Nacional Electoral.`)}
            ${P(`b. Que para efectos del presente contrato su domicilio será el ubicado en ${B(fullAddress)} número ${B(d.exteriorNumber || BLANK)} colonia ${B(d.neighborhood || BLANK)} C.P. ${B(d.postalCode || BLANK)}, en ${B(d.city || BLANK)}, Jalisco.`)}
            ${P(`c. Que es su intención celebrar el presente contrato de comisión, para lograr la venta de uno o varios inmuebles.`)}
            ${P(`d. Que acredita la propiedad del o los inmuebles mediante las copias que se anexan al presente instrumento, mismas que fueron previamente cotejadas con su original.`)}
            ${P(`e. Que cuenta con los recursos económicos necesarios para hacer frente a las obligaciones que a su cargo se derivan del presente CONTRATO.`)}
            ${P(`f. Que su Registro Federal de Contribuyentes es ${B(d.rfc || BLANK)}.`)}

            ${H3('Segunda.- Declara la ADMINISTRADORA por conducto de su representante legal, lo siguiente:')}
            ${P(`a. Que su representada es una Sociedad Mercantil Mexicana debidamente constituida de conformidad con las leyes de los Estados Unidos Mexicanos bajo la denominación “ALASLA, S.A DE C.V", situación que acredita mediante escritura pública número 2,857 de fecha 12 de octubre de 2017, pasada ante la fe de Lic. Gerardo Ramírez Organista, Corredor Público núm. 49 de Zapopan, Estado de Jalisco, misma que se encuentra devidamente registrada en el Registro Público del Comercio bajo Folio Mercantil Electrónico N-2017082985.`)}
            ${P(`b. Que cuenta con las facultades necesarias y suficientes para obligarla en los términos del presente CONTRATO, situación que acreditan mediante instrumento público antes mencionado, asimismo, manifiesta que dichas facultades no le han sido limitadas, modificadas o revocadas en forma alguna a esta fecha.`)}
            ${P(`c. Que cuenta plenamente con capacidad de goce y ejercicio de sus derechos, y por tanto con las más amplias facultades para celebrar este contrato y obligarse en sus términos, de acuerdo con lo disposto por el artículo 78 del código de comercio.`)}
            ${P(`d. Que sus actividades principales, son entre la prestación de todo tipo de servicios de representación, intermediación, asesoría, interpretación, gestión, así como para llevar a cabo todo tipo de trámites, y demás actividades relacionadas.`)}
            ${P(`e. Que los recursos con los que hará frente a sus obligaciones derivadas del presente CONTRATO provienen de su actividad comercial, en consecuencia, de una fuente lícita.`)}
            ${P(`f. Que su Registro Federal de Contribuyentes es ALA171012CX1.`)}

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
            ${P(`${B('DE LOS CAMBIOS A LAS TARIFAS.')} Las partes acuerdan que, si bien existe un catálogo de precios, se entiende que este es el mínimo, por lo que, la ${B('ADMINISTRADORA')} podrá aumentar unilateralmente las tarifas ofertadas a través de la plataforma tecnológica, con base a su experiencia, la temporada, la oferta y demanda, la época del año, o cualquier otro parámetro que permita maximizar los rendimientos o frutos obtenidos por las partes.`)}
            ${P(`${B('ADMINISTRACIÓN DE COMUNICACIONES.')} La ADMINISTRADORA se encargará de administrar las comunicaciones con los USUARIOS, ya sea por medios electrónicos o telefónicos.`)}
            ${P(`${B('ADMINISTRACIÓN Y ANÁLISIS DE ESTATUS.')} La ADMINISTRADORA se encargará de administrar y analizar las calificaciones otorgadas al inmueble y a la estancia, así como los comentarios que los USUARIOS realicen, con la finalidad de mejorar el servicio, proponer cambios, mejoras o remodelaciones al CLIENTE.`)}
            ${P(`${B('ADMINISTRACIÓN DE CALENDARIO.')} La ADMINISTRADORA se encargará de agendar y administrar las reservaciones según la demanda, para este efecto, se entenderá que el INMUEBLE se encuentra disponible en todo momento para la ADMINISTRADORA.`)}
            ${P(`En caso que, el ${B('CLIENTE')} quisiera hacer uso de su propiedad, o limitar el tiempo disponible, deberá de informar al inicio de la firma del presente contrato, los periodos en que desea que su Inmueble no se encuentre disponible.`)}
            ${P(`Si el deseo del ${B('CLIENTE')} de no mantener disponibilidad en algún periodo o fecha, surgiera posterior a la firma del presente instrumento, deberá de hacerlo saber de forma inmediata a la ${B('ADMINISTRADORA')}, quien de tener disponible el inmueble bloqueará la fecha o periodo solicitado, de lo contrario, el ${B('CLIENTE')} deberá de ajustarse a las fechas que ya se encuentren reservadas.`)}
            ${P(`${B('MANTENIMIENTO Y LIMPEZA.')} la ADMINISTRADORA se encargará de coordinar los servicios de limpieza y mantenimientos necesarios mediante la contratación de un tercero, quien se encargue de mantener bajo estándares de calidad, la limpieza del INMUEBLE, así como de los blancos, ropa de cama, utensilios y demás necesarios para la estancia.`)}
            ${P(`Dentro de este rubro, se comprenderá también, la proveeduría de artículos básicos para la higiene personal y limpieza, tales como los que se describen a continuación de forma enunciativa más no limitativa:`)}
            ${BasicList(['Shampoo, acondicionador.', 'Jabón de uso corporal.', 'Detergente para ropa.', 'Detergente para utensilios de cocina.', 'Papel higiénico.', 'Productos de limpieza del hogar.', 'Servilletas.', 'Toallas.', 'Fibras o esponjas para lavar trastes.', 'Escoba.', 'Trapeador.', 'Recogedor.'])}
            ${P(`Los gastos por este servicio correrán por cuenta del CLIENTE, para tal efecto, el cliente deberá depositar en una sub-cuenta de la ADMINISTRADORA, la cantidad que las partes acuerden y estimen necesaria para cubrir los insumos requeridos para conceder el servicio de la forma adecuada.`)}
            ${P(`En ese sentido, las partes acordarán también la cantidad que deba depositarse en la sub-cuenta referida, con la intención de que los insumos que sean consumibles (jabón servilletas, etc.), sean repuestos. En caso que, por las características o calidades de los insumos, la ADMINISTRADORA, requiera de alguna cantidad adicional, lo hará saber al CLIENTE, para que este realice un depósito extraordinario.`)}
            ${P(`${B('ADMINISTRACIÓN DE RESERVACIONES.')} De conformidad a la administración de calendario y la disponibilidad del INMUEBLE, la ADMINISTRADORA aceptará o rechazará la reservación que pretenda el USUARIO.`)}
            ${P(`Para este caso, la ADMINISTRADORA podrá aceptar o rechazar una solicitud de reservación efectuada por un USUARIO de conformidad con la calificación de este en la plataforma u otros parámetros, cuando a juicio de la ADMINISTRADORA pudiera ponerse en riesgo el INMUEBLE.`)}
            ${P(`${B('ENTREGA Y RECEPCIÓN DEL INMUEBLE AL USUARIO.')} De ser aceptada una propuesta, la ADMINISTRADORA se encargará de ponerse en contacto con el Usuario para darle la bienvenida y hacerle entrega de las instrucciones de llegada y acceso, en ese momento, le hará sabedor de las reglas de uso y se pondrá de acuerdo para la recepción del INMUEBLE.`)}
            ${P(`Así mismo, verificará que contenga los artículos de higiene personal y limpieza indicados en esta cláusula y hará entrega de un “Paquete de Bienvenida” el cual incluye 2 botellas de agua potable, kit de baño (shampoo 25 ml, acondicionador 25 ml y jabón de cuerpo 10 g) y un tríptico con recomendaciones.`)}
            ${P(`Una vez concluido el plazo de la reservación, la ADMINISTRADORA acudirá al Inmueble a efecto de cerciorase de su estado, así como revisar las llaves de acceso, en caso de encontrar desperfectos, falta de mobiliario o cualquier otra situación irregular, se lo hará saber al CLIENTE de forma inmediata, a efecto de que este pueda realizar las reparaciones que fueran necesarias y pueda proceder conforme a su interés convenga.`)}
            ${P(`En todos los casos, los gastos por servicios (electricidad, agua, gas, internet, etc.), reparaciones, remodelaciones, amenidades (artículos de higiene personal, paquete de bienvenida, etc.) correrán por cuenta del CLIENTE, para tal efecto, las partes establecen que deberá de mantener a disposición de la ADMINISTRADORA, recursos suficientes para erogar estos gastos, ya sea mediante la emisión de cheques, cuenta bancaria, cuenta de inversión, disposiciones en efectivo, transferencias electrónicas o cualquier otro medio que las partes establezcan, o en su defecto, el Cliente deberá entregar los recibos mensuales por los pagos de servicios, así como acreditar que los artículos de higiene personal y limpieza se encuentran en el inmueble previo a que se registre algún huésped.`)}
            ${P(`Así mismo, las partes acuerdan que, la ADMINISTRADORA deberá de presentar un informe mensual, en cual se detallen las erogaciones realizadas y los conceptos por los cuales se realizaron.`)}
            ${P(`Además, las partes están conformes en que todos aquellos gastos por remodelación, adaptación, reposición de muebles, entre otros, que superen la cantidad de ${BLANK} deberán ser consultados con el Cliente. Todos aquellos gastos inferiores a la cantidad aquí indicada, se erogarán a juicio de la ADMINISTRADORA según las necesidades requeridas para otorgar un servicio de calidad al USUARIO y los HUÉSPEDES.`)}
            ${P(`Las Partes acuerdan que en caso que el CLIENTE incumpla con su obligación de pago de los servicios indicados, se hará acreedor a una pena convencional equivalente a 10 días de la tarifa correspondiente a la renta por día.`)}
            
            ${H3('Tercera. DEL IMPORTE DE LAS COMISIONES Y SU FORMA DE PAGO.')}
            ${P(`Las partes están de acuerdo en que, el importe de la(s) COMISIÓN(ES) que deberá cubrir el Cliente a la ADMINISTRADORA equivaldrá al 16% diez y seis por ciento más el impuesto al valor agregado (I.V.A.)., del pago total efectuado por el USUARIO por cada reservación pagada, es decir, previo a cualquier clase de descuento, comisión, pago de impuestos, tarifas de limpieza, de uso de la plataforma o cualquier otro concepto que pudiera afectar a la cantidad total. Entendiéndose que el I.V.A correrá por cuenta del huésped en cada reservación.`)}
            ${P(`Este pago de realizará de manera automática mediante la plataforma de airbnb, dentro de los primeros 10 días hábiles, una vez iniciada la reservación.`)}
            ${P(`Por todos los pagos que se realicen, a quien le corresponda efectuarlo según los párrafos precedentes, deberá de emitir el comprobante fiscal correspondiente.`)}
            ${P(`Las comisiones solo se harán exigibles en la medida en que los USUARIOS de que se trate realicen el pago de sus estancias.`)}

            ${H3('Quarta. DE LOS CATÁLOGOS Y LISTAS DE PRECIOS.')}
            ${P(`A fin de que la ADMINISTRADORA se encuentre en aptitud de prestar sus servicios y ofrecer los productos adecuadamente, el CLIENTE en este acto pone a disposición del ADMINISTRADORA el catálogo y listas de precios del o los inmuebles que serán objeto de sus servicios, las cuales serán agregados al presente instrumento y denominados como ANEXO 1.`)}

            ${H3('Quinta. DE LAS MODIFICACIONES A LOS CATÁLOGOS Y LISTAS DE PRECIOS.')}
            ${P(`Las partes están de acuerdo en que el catálogo representa la base mínima que el CLIENTE espera, por lo que la ADMINISTRADORA se encuentra autorizada expresamente para aumentar las tarifas, de conformidad a su experiencia, la temporada, la oferta y demanda, la época del año, o cualquier otro parámetro que permita maximizar los rendimientos o frutos obtenidos por las partes.`)}
            
            ${H3('Sexta. DE LA RELACIÓN DEL USUARIO Y EL CLIENTE.')}
            ${P(`Las partes convienen en que la ADMINISTRADORA únicamente es una prestadora de servicios que coadyuva administrar la cuenta e inmuebles del Cliente, por lo que cualquier relación derivada de las reservaciones hechas por los usuarios, sus estancias, el uso de la plataforma, es únicamente entre el USUARIO y el CLIENTE, siendo estos los únicos responsables de los incumplimientos, el pago de daños y perjuicios, el estado del Inmueble, así como cualquier otra situación derivada de la posesión, uso y goce del inmueble.`)}
            ${P(`Para tal efecto, las partes manifiestan que conocen sobre el seguro que la plataforma “Airbnb” ofrece, por lo que, en caso de que exista alguna eventualidad deberá ejercerse el derecho que dicha plataforma proporciona.`)}
            ${P(`En caso de ser necesario, las Partes acuerdan que la ADMINISTRADORA, con independencia que su servicio se limite a lo indicado en el primer párrafo de esta cláusula, coadyuvará a realizar las gestiones necesarias para poder ejercer el cobro de la cantidad asegurada para cada una de las eventualidades.`)}

            ${H3('Séptima. DEL PROCESO DE OFERTA DEL INMUEBLE Y LAS PROMOCIONES.')}
            ${P(`A efecto de obtener mayores beneficios, la ADMINISTRADORA, tendrá plena libertad de publicitar, promocionar u ofertar el inmueble, hacer reseñas, publicar artículos y hacer uso de redes sociales según lo permita la PLATAFORMA TECNOLÓGICA.`)}
            ${P(`En caso que, la ADMINISTRADORA estime oportuno, podrá proponer al cliente realizar descuentos o promociones, aun y cuando ello implique que la renta sea inferior a la establecida en el CATÁLOGO DE PRECIOS, no obstante, la propuesta deberá ser aceptada por el CLIENTE, por cualquier medio de comunicación.`)}

            ${H3('Octava. DE LA DELEGACIÓN.')}
            ${P(`El Administradora podrá delegar el encargo y emplear todo el personal que estime necesario bajo su más estricta responsabilidad, siempre y cuando cuente con elementos y recursos propios para responder por sus obligaciones, en consecuencia, todos los Administradoras y/o empleados que intervengan en dicha ejecución, dependerán única y exclusivamente del ADMINISTRADORA, quien será el único responsable de los contratos de trabajo que celebre con ellos, así como de cualquier riesgo de trabajo, y cualquier otra prestación derivada de los mismos.`)}
            ${P(`El ADMINISTRADORA, ante todo, reconoce que todo el personal que reclute o utilice para la prestación de sus servicios le beneficiará directamente a su persona y se compromete a proporcionar a dicho personal, cualquier herramienta de trabajo que les sea necesaria.`)}

            ${H3('Novena. DE LOS VIÁTICOS Y GASTOS.')}
            ${P(`Las partes convienen expresamente que todos los viáticos, así como los gastos te telefonía o internet que requiera erogar la ADMINISTRADORA para ella o a su personal, para prestar los servicios objeto del presente contrato, correrán por cuenta de este sin que tenga derecho a reembolso alguno por parte del CLIENTE.`)}

            ${H3('Decima. DE LAS OBLIGACIONES ESPECIALES.')}
            ${P(`La ADMINISTRADORA, tendrá los derechos y asumirá obligaciones especiales que se describen en la presente cláusula, ello, sin perjuicio de su obligación de cumplir con todas las estipuladas en este instrumento.`)}
            ${P(`10.1. Aceptar cualquier USUARIO o prospecto que le hayan solicitado el servicio por medio de las PLATAFORMAS TECNOLÓGICAS, salvo que estime que con la aceptación pueda poner en riesgo el INMUEBLE.`)}
            ${P(`10.2. Erogar todas las cantidades que sean necesarias para ofrecer el servicio objeto del presente instrumento.`)}
            ${P(`10.3. Obtener todos los trámites y licencias que sean requeridos para el desempeño y ejercicio de sus obligaciones como ADMINISTRADORA.`)}
            
            ${H3('Décima Primera. DE LA EXCLUSIVIDAD.')}
            ${P(`Las PARTES acuerdan que, la ADMINISTRADORA será la única encargada de la promoción del o los INMUEBLES administrados durante la vigencia del presente contrato, por lo que, la renta o cesión de derechos de uso y goce efectuada por cualquier tercero no exime al CLIENTE del pago de la comisión.`)}
            ${P(`El incumplimiento a lo estipulado a la presenta cláusula por parte del CLIENTE, dará lugar a una pena convencional equivalente a la cantidad de la comisión pactada a favor del ADMINISTRADORA, que le hubiera correspondido si el inmueble se hubiera rentado por un año en la tarifa mínima.`)}

            ${H3('Décima Segunda. DE LA CONFIDENCIALIDAD.')}
            ${P(`Toda la información, datos o documentación de cualquier índole, sea escrita o por medios electrónicos que se produzca, procese, comercialice o circule entre los clientes y/o proveedores y las PARTES, es propiedad y para uso exclusivo de la operación, al igual que lo son los diseños, los procesos (know how), métodos, bases de datos, etc., de los cuales es propietario el CLIENTE, por tanto, queda expresamente prohibido al ADMINISTRADORA, que disponga de estos ya sea para sí o a favor de terceros sin el previo consentimiento por escrito del CLIENTE, debiendo por tanto abstenerse de divulgarla, publicarla, copiarla, reproducirla, comercializarla o utilizarla para cualquier otro fin que no se encuentre expresamente previsto o autorizado por el CLIENTE.`)}

            ${H3('Décima Tercera. DE LA PRIVACIDAD;')}
            ${P(`Las PARTES establecen que el conjunto de los comunicados e informaciones, que se realicen entre ellas son estrictamente confidenciales. En consecuencia, cada una de ellas se compromete en preservar el carácter confidencial de los comunicados, planos, informaciones, documentos entregados por la otra parte y en no divulgar parcial o totalmente a Terceros el contenido de los mismos sin autorización expresa de la otra parte, además cada una de las partes se compromete en tomar todas las medidas tanto frente a sus empleados o terceros para limitar la divulgación de las informaciones confidenciales, siendo responsables de los daños y perjuicios que se puedan llegar a ocasionar a la otra parte o a Terceros por violación a la presente Cláusula.`)}

            ${H3('Décima Cuarta. DE LA RECISIÓN.')}
            ${P(`Las PARTES acuerdan que el presente contrato no podrá ser rescindido, salvo que se trate por mutuo acuerdo o resolución judicial.`)}
            
            ${H3('Décima Quinta. DE LA VIGENCIA.')}
            ${P(`El presente contrato tendrá una vigencia de 1 año contados a partir de su suscripción, y se prorrogará de manera automática por periodos iguales de tiempo, salvo en el caso de que cualquiera de las partes notifique a la contraparte por escrito y con una anticipación de por lo menos 30 treinta días naturales a la fecha de terminación su intención de no prorrogar la vigencia de este contrato.`)}
            ${P(`En caso de que el CLIENTE entregue el aviso o notifique su intención de no prorrogar el contrato, este deberá cubrir al Administradora todas y cada una de las comisiones que hasta la fecha se hayan vuelto exigibles, o en su caso, la parte proporcional que corresponda a cualquier pago que hubiera recibido.`)}
            ${P(`El incumplimiento por parte del cliente a lo aquí establecido, dará lugar a una pena convencional equivalente a la comisión que correspondería a La ADMINISTRADORA por el hospedaje de un mes al valor del catálogo de precios.`)}
            
            ${H3('Décima Sexta. RESPONSABILIDAD DE LA ADMINISTRADORA.')}
            ${P(`La ADMINISTRADORA es la única responsable del trabajo ejecutado por las personas que laboren para éste en la realización de los productos y servicios que le correspondan conforme a este contrato, así como del pago de los materiales, gastos, viáticos, impuestos, prestaciones laborales, fiscales, civiles, mercantiles, penales y de cualquier índole únicamente respecto de los trabajadores empleados por éste.`)}
            
            ${H3('Décima Séptima. DE LA RESTRICCIÓN DE NEGOCIOS CON LA COMPETENCIA.')}
            ${P(`El CLIENTE se deberá de abstener de realizar negocios y/o asociaciones de ninguna naturaleza relacionada con personas o empresas que puedan competir directamente con los servicios materia del presente contrato, tampoco deberán de tener ningún derecho participación accionaría o recibir ningún ingreso o beneficio de ninguna persona o empresa que pueda competir directamente con el ADMINISTRADORA durante la vigencia del presente instrumento.`)}
            ${P(`El incumplimiento a lo estipulado a la presenta cláusula por parte del CLIENTE, dará lugar a una pena convencional equivalente a la cantidad de la comisión pactada a favor del ADMINISTRADORA, que le hubiera correspondido si el inmueble se hubiera rentado por un año en la tarifa mínima.`)}

            ${H3('Décima Octava. DE LA PROTECCIÓN DE DATOS PERSONALES;')}
            ${P(`Las Partes reconocen que, en razón del objeto de este CONTRATO, pudieren tener acceso a información de una parte respecto de la otra que puede contener datos personales de éstas y/o personas relacionadas con éstas, además de los datos personales que se contienen en el presente contrato.`)}
            ${P(`Para tal efecto, las partes se obligan a observar la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, y a utilizar los mismos para la realización directa o indirecta del objeto de este contrato.`)}
            ${P(`Mediante la firma del presente CONTRATO, las partes otorgan su consentimiento expreso para que una parte respecto de la otra, traten sus datos personales únicamente para los fines que se han expresado en el mismo.`)}
            
            ${H3('Décima Novena. DE LAS MODIFICACIONES AL CONTRATO;')}
            ${P(`Cualquier modificación que las partes deseen realizar al contenido del presente Contrato, deberá efectuarse mediante acuerdo realizado por escrito y firmado por el Representante Legal de ambas Partes.`)}
            
            ${H3('Vigésima. ALCANCE DE LOS TÍTULOS DE LAS CLÁUSULAS.')}
            ${P(`Las PARTES establecen que lo establecido en el presente contrato expresa todo lo acordado por las PARTES y que los títulos de cada cláusula únicamente fueron establecidos para facilitar la lectura del contrato, por lo que se debe de estar a lo expresamente acordado por las partes en el clausulado respectivo.`)}
            
            ${H3('Vigésima Primera. DE LOS DOMICILIOS.')}
            ${P(`Las partes establecen como su domicilio para oír y recibir todo tipo de notificaciones y comunicados relacionados con el presente contrato, el siguiente:`)}
            <div class="my-4 space-y-4">
                <p>${B('El CLIENTE:')} Calle ${B(d.street || BLANK)}, Col. ${B(d.neighborhood || BLANK)}, Guadalajara, Jalisco. C.P. ${B(d.postalCode || BLANK)}, Correo electrónico ${BLANK}</p>
                <p>${B('La ADMINISTRADORA:')} Calle ${BLANK}, Col. ${BLANK}, Guadalajara, Jalisco. C.P. ${BLANK}, Correo electrónico ${BLANK}</p>
            </div>
            ${P(`Cualquiera de las partes podrá notificar a la otra de manera fehaciente un nuevo domicilio al cual deban dirigirse todos los avisos y notificaciones relacionados con el presente instrumento, mediante simple aviso por escrito enviado al domicilio de la otra, con una anticipación mínima de 10 días hábiles a aquél en el que deba producirse el cambio de domicilio, en caso contrario, cualquier aviso o comunicación enviado a la otra parte al último domicilio registrado, surtirá plenos efectos.`)}

            ${H3('Vigésima Segunda. DE LA UNIDAD DEL CONTRATO.')}
            ${P(`El presente CONTRATO y sus ANEXOS forman una sola unidad y deberán interpretarse conjuntamente, en caso de que los términos del presente contrato y alguno de sus ANEXOS se contrapongan, deberá prevalecer, para todos los efectos legales a que haya lugar, el contenido y los términos del presente contrato.`)}
            
            ${H3('Vigésima Tercera. DE LA INDEPENDENCIA DEL CLAUSULADO;')}
            ${P(`En el supuesto de que una o más de las estipulaciones contenidas en el presente contrato se llegará a declarar como inválida por ministerio de ley o por mandamiento de autoridad judicial, el resto de las cláusulas aquí contenidas, continuarán con plena validez y efecto jurídico entre las partes.`)}
            
            ${H3('Vigésima Cuarta. DE LA JURISDICCIÓN.')}
            ${P(`En caso de cualquier controversia que se suscite con motivo de las obligaciones aquí contraídas, las partes se someten expresamente a la competencia y jurisdicción de los tribunales previamente establecidos en la ciudad de la zona Metropolitana de Guadalajara, Jalisco, renunciando a cualquier otro fuero que por razón de sus domicilios tengan o llegaren a tener.`)}
            
            ${P(`Leído que fue el presente contrato, y una vez enteradas las partes respecto al alcance y contenido de las obligaciones aquí contraídas, lo firman a los ${B(String(day))} días del mes de ${B(month)} del año ${B(yearNumber)}, en la ciudad de Guadalajara, Jalisco, para todos los efectos legales a que haya lugar.`)}

            <div class="mt-24 flex justify-between text-center">
                <div>
                    <p class="border-t border-alasla-dark pt-2 mt-12">${d.fullNameOfficial || BLANK}</p>
                    <p class="font-bold">CLIENTE</p>
                </div>
                <div>
                    <p class="border-t border-alasla-dark pt-2 mt-12">ALASLA S.A. DE C.V.<br/>Por conducto de su apoderado legal<br/>ASTRID ALEJANDRA LAPHAM ALVIZO</p>
                    <p class="font-bold">ADMINISTRADORA</p>
                </div>
            </div>

            <div class="break-before-page"></div>
            ${H2('ANEXO 1')}
            ${P(`${B('CONTRATO DE ADMINISTRACIÓN DE PLATAFORMAS TECNOLÓGICAS Y BIENES INMUEBLES')} que celebran el CLIENTE, y la sociedad mercantil denominada ALASLA S.A. DE C.V. representada en este acto por su apoderado legal ASTRID ALEJANDRA LAPHAM ALVIZO, a quien en lo sucesivo se le denominara como el ADMINISTRADORA, al tenor de lo dispuesto por la siguientes`)}

            ${H3('CLÁUSULAS')}
            ${P(`${B('Primera.')} El presente anexo tiene la finalidad de describir, los datos del inmueble objeto del presente instrumento, así como la comisión pactada y el precio mínimo de venta establecido por el Cliente de conformidad con lo establecido en las cláusulas del CONTRATO, en los términos siguientes:`)}
            
            <div class="mt-8 space-y-4">
                <div class="p-4 border rounded-lg">
                    ${H4('DATOS DEL CLIENTE')}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                        <p class="md:col-span-2">${B('Nombre:')} ${d.fullNameOfficial || BLANK}</p>
                        <p>${B('Estado Civil:')} ${capitalize(d.maritalStatus) || BLANK}</p>
                        <p>${B('R.F.C.:')} ${d.rfc || BLANK}</p>
                        <p class="col-span-2">${B('Domicilio:')} ${fullAddress}, ${d.neighborhood}, ${d.city}, ${d.state} C.P. ${d.postalCode}</p>
                        <p>${B('Teléfono:')} ${d.landlinePhone || BLANK}</p>
                        <p>${B('Celular:')} ${d.cellPhone || BLANK}</p>
                    </div>
                </div>

                <div class="p-4 border rounded-lg">
                    ${H4('DATOS DEL INMUEBLE')}
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                        <p>${B('Escritura N°:')} ${BLANK}</p>
                        <p>${B('Notario N°:')} ${BLANK}</p>
                        <p>${B('Fecha de escritura:')} ${BLANK}</p>
                        <p>${B('Folio Real:')} ${BLANK}</p>
                        <p class="col-span-2">${B('Domicilio:')} ${fullPropertyAddress}, ${d.propertyNeighborhood}, ${d.propertyCity}, ${d.propertyState} C.P. ${d.propertyPostalCode}</p>
                        <p class="col-span-2">${B('Descripción del Inmueble:')} ${d.propertyDescription || BLANK}</p>
                    </div>
                </div>

                 <div class="p-4 border rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                        <p>${B('Comisión Pactada %:')} ${BLANK}</p>
                        <p>${B('Precio Mínimo de Renta Diario:')} ${BLANK}</p>
                        <p>${B('Semanal:')} ${BLANK}</p>
                        <p>${B('Mensual:')} ${BLANK}</p>
                    </div>
                </div>
            </div>
            
            ${H3('Segunda.')}
            ${P(`Las PARTES reconocen que, el presente ANEXO, forma parte integral del contrato principal, por lo que se entienden como una unidad para todos los efectos a que haya lugar.`)}

            ${P(`Leído por ambas PARTES el presente documento, lo firman duplicado consientes del alcance y contenido de las obligaciones contraídas en la ciudad de Guadalajara Jalisco a los ${B(String(day))} días, del mes de ${B(month)} del año ${B(yearNumber)}, para todos los efectos a que haya lugar.`)}

            <div class="mt-24 flex justify-between text-center">
                <div>
                    <p class="border-t border-alasla-dark pt-2 mt-12">${d.fullNameOfficial || BLANK}</p>
                    <p class="font-bold">CLIENTE</p>
                </div>
                <div>
                    <p class="border-t border-alasla-dark pt-2 mt-12">ALASLA S.A. DE C.V.<br/>Por conducto de su apoderado legal<br/>ASTRID ALEJANDRA LAPHAM ALVIZO</p>
                    <p class="font-bold">ADMINISTRADORA</p>
                </div>
            </div>
        </div>
    `;
};

const ContractDisplay: React.FC<{data: OnboardingData}> = ({ data }) => {
    const fullContractHTML = generateContractHTML(data);
    return <div dangerouslySetInnerHTML={{ __html: fullContractHTML }} />;
};

export default ContractDisplay;
