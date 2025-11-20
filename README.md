# Documentación Técnica - SAS Dashboard

Este documento detalla la arquitectura, estilos y funcionamiento lógico de la aplicación, enfocado específicamente en el flujo de Anfitrión y la réplica del estilo visual de Airbnb.

---

## 1. Diseño y Estilos (UI/UX)

La aplicación no utiliza archivos CSS externos tradicionales. Todo el estilo está construido con **Tailwind CSS** y configurado directamente en el archivo `index.html` para facilitar la portabilidad.

### 1.1. Tabla de Colores Utilizada
Estas variables definen la identidad visual "Airbnb-style" y se encuentran en la configuración `theme.extend.colors` dentro del `<script>` de Tailwind en `index.html`.

| Variable | Hexadecimal | Uso en la Aplicación |
| :--- | :--- | :--- |
| `alasla-red` | **#FF5A5F** | Color de marca principal (Logos, Iconos activos). |
| `alasla-red-start` | **#E61E4D** | **Login/Registro:** Inicio del gradiente del botón principal. **Steps:** Bordes activos y botones de acción. |
| `alasla-red-end` | **#D70466** | **Login/Registro:** Fin del gradiente del botón principal. |
| `alasla-dark` | **#484848** | **Fuentes:** Color principal de texto (Títulos, párrafos, etiquetas de inputs). |
| `alasla-gray-light` | **#F7F7F7** | **Fondo:** Color de fondo general de la página (Background). |
| `alasla-gray-medium` | **#EBEBEB** | **Bordes:** Líneas divisorias en formularios y tarjetas. |
| `alasla-gray-dark` | **#767676** | **Fuentes:** Texto secundario (Subtítulos, placeholders). |

### 1.2. Tipografía y Fuentes
Se utiliza la pila de fuentes predeterminada de Tailwind (`font-sans`), que renderiza:
*   `ui-sans-serif`, `system-ui`, `-apple-system`, `Segoe UI`, `Roboto`, etc.
*   Esto asegura que la app se sienta nativa en cada sistema operativo, similar a la estrategia de diseño de Airbnb.

### 1.3. Ubicación del CSS por Sección
¿Dónde debo editar los estilos de cada parte?

*   **Login y Registro:**
    *   **Ubicación:** `pages/AuthPage.tsx`
    *   **Estilos Clave:** Los inputs utilizan clases como `peer` y `group` para animar las etiquetas flotantes (floating labels) y cambiar el color del icono a rojo (`alasla-red-start`) cuando el usuario escribe.
*   **Dashboard (Layout):**
    *   **Ubicación:** `pages/HostDashboardPage.tsx`
    *   **Estilos Clave:** Maneja la estructura general y la transición animada entre vistas (`animate-fade-in`).
*   **Steps (Formulario de Pasos):**
    *   **Ubicación:** `components/OnboardingStepper.tsx`
    *   **Estilos Clave:** Contiene el diseño de pantalla dividida (Sidebar oscuro a la izquierda, Formulario blanco a la derecha).

---

## 2. Arquitectura del Onboarding (Steps del Anfitrión)

El núcleo de la aplicación para el anfitrión reside en `components/OnboardingStepper.tsx`. Aquí se gestiona el "seguimiento" de qué ha completado el usuario.

### 2.1. ¿Dónde están definidos los Steps?
Al final del archivo `components/OnboardingStepper.tsx`, encontrarás un array constante llamado `steps`. Este array define el orden y el contenido:

```typescript
const steps = [
    { 
        name: 'Personal', 
        component: Step1_Personal, // El componente visual del paso
        fields: ['fullNameOfficial', 'ineNumber', ...], // Los campos que se validan
        icon: UserCircle 
    },
    // ... resto de los pasos
];
```

### 2.2. Seguimiento y Validación (¿Cómo sabe qué paso está completo?)
El seguimiento no es manual, es automático y calculado en tiempo real:

1.  **Estado de Datos (`data`):** Existe un objeto gigante llamado `OnboardingData` (definido en `types.ts`) que guarda toda la información (nombre, calle, archivos, etc.).
2.  **Función `isStepComplete(index)`:** 
    *   Esta función mira el array `fields` del paso actual (ver punto 2.1).
    *   Verifica en el objeto `data` si esos campos específicos tienen valor.
    *   Si todos los campos del array tienen datos, el paso se marca visualmente con un **Check Verde** en la barra lateral.
3.  **Persistencia:** Aunque el código actual usa estado en memoria (`useState`), está preparado para guardar en `localStorage` o enviar a una API en la función `updateData`.

### 2.3. Componentes de los Pasos
Cada paso es un componente funcional pequeño ubicado dentro del mismo archivo `OnboardingStepper.tsx` para facilitar la edición:
*   `Step1_Personal`: Inputs de texto y fecha.
*   `Step2_Address` al `Step8_Banking`: Formularios y subida de archivos.
*   `Step9_Review`: Vista de solo lectura.
*   `Step10_Contract`: Vista del contrato.

---

## 3. Generación de Contrato y Firma

### 3.1. ¿Dónde está la generación del contrato?
*   **Archivo:** `components/ContractDisplay.tsx`
*   **Funcionamiento:** 
    *   No es un archivo estático. Es una función `generateContractHTML(data)` que recibe los datos del formulario.
    *   Utiliza "Template Strings" de JavaScript para inyectar variables dentro del texto HTML.
    *   *Ejemplo:* Si el usuario escribió "Juan Pérez" en el paso 1, el contrato mostrará: `...que celebran por una parte Juan Pérez...`.
    *   Si el dato falta, muestra `__________`.

### 3.2. ¿Dónde y cómo se hace la Firma?
*   **Ubicación:** Componente `SignatureModal` dentro de `components/OnboardingStepper.tsx`.
*   **Tecnología:** Utiliza un elemento HTML5 `<canvas>`.
*   **Funcionamiento:**
    1.  Captura los movimientos del mouse o dedo (touch events).
    2.  Dibuja líneas en el canvas en tiempo real.
    3.  Al hacer clic en "Confirmar", convierte el dibujo en una imagen Base64 (`data:image/png;base64...`).
    4.  Esta imagen se envía junto con el resto de los datos en la función `handleFinalSubmit`.

---

## 4. Resumen de Archivos Clave

*   `index.html`: Configuración de colores (Theme) y fuentes.
*   `types.ts`: Definición de la estructura de datos del usuario (`User`, `OnboardingData`).
*   `components/OnboardingStepper.tsx`: **Archivo Maestro**. Contiene la lógica de los pasos, la validación, el formulario y la firma.
*   `components/ContractDisplay.tsx`: Plantilla HTML del contrato legal.
*   `pages/AuthPage.tsx`: Pantallas de Login y Registro.