# Documentación del Panel de Alasla SAS

Bienvenido a la documentación interna del panel de Alasla. Este documento sirve como una guía central para los desarrolladores que trabajan en el proyecto, detallando su arquitectura, estructura, componentes clave y flujos de trabajo.

## 1. Descripción General del Proyecto

Este proyecto es un panel de control estilo Airbnb para la empresa inmobiliaria Alasla. La fase actual implementa dos flujos de usuario principales:

1.  **Autenticación:** Un sistema de inicio de sesión y registro para dos tipos de roles: **Anfitrión** y **Cliente**.
2.  **Onboarding de Anfitriones:** Un detallado proceso de varios pasos para que los nuevos anfitriones registren su información personal, fiscal, de propiedad y bancaria.

## 2. Pila Tecnológica (Tech Stack)

-   **Framework Principal:** React 19
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Manejo de Estado:** React Context API (para la autenticación) y `useState` (para el estado local de los componentes).
-   **Módulo Bundler:** Vite (implícito en la configuración del entorno de desarrollo).

## 3. Estructura de Archivos

El proyecto está organizado en una estructura modular para facilitar la mantenibilidad.

```
/
├── components/         # Componentes reutilizables de la UI
│   ├── Header.tsx
│   ├── Icons.tsx
│   ├── MainDashboard.tsx
│   └── OnboardingStepper.tsx
├── contexts/           # Contextos de React para el estado global
│   └── AuthContext.tsx
├── pages/              # Componentes de página (vistas principales)
│   ├── AuthPage.tsx
│   ├── ClientDashboardPage.tsx
│   └── HostDashboardPage.tsx
├── types.ts            # Definiciones de tipos y enumeraciones de TypeScript
├── App.tsx             # Componente raíz que maneja el enrutamiento principal
├── index.html          # Punto de entrada HTML
├── index.tsx           # Punto de entrada de React
├── metadata.json       # Metadatos de la aplicación
└── DOCUMENTATION.md    # Este archivo
```

### Descripción de Carpetas:

-   `components`: Contiene componentes de UI reutilizables como botones, campos de formulario, cabeceras, etc. El `OnboardingStepper.tsx` es el componente más complejo aquí, ya que contiene toda la lógica y la UI del proceso de alta de anfitriones.
-   `contexts`: Centraliza el manejo de estado global. `AuthContext.tsx` gestiona el estado del usuario autenticado, proveyendo funciones de `login`, `logout`, `register` y `completeOnboarding` a toda la aplicación.
-   `pages`: Representa las vistas principales de la aplicación. `App.tsx` decide qué página renderizar basándose en el estado de autenticación y el rol del usuario.
-   `types.ts`: Define las interfaces y enumeraciones (como `User` y `UserRole`) usadas en todo el proyecto para garantizar la seguridad de tipos.

## 4. Flujos de Trabajo Clave

### 4.1. Flujo de Autenticación

1.  **Proveedor de Autenticación:** `AuthProvider` en `contexts/AuthContext.tsx` es el núcleo. Utiliza una base de datos simulada (`dummyUsers`) para la autenticación.
2.  **Página de Autenticación:** `AuthPage.tsx` presenta al usuario los formularios de inicio de sesión y registro.
3.  **Lógica de Acceso:** Al iniciar sesión (`login`), se busca al usuario en la base de datos simulada y, si se encuentra, se establece el estado global del `user`.
4.  **Enrutamiento:** El componente `App.tsx` detecta el cambio en el estado `user` y redirige al usuario al panel correspondiente (`HostDashboardPage` o `ClientDashboardPage`).

### 4.2. Proceso de Onboarding del Anfitrión

Este es el flujo más complejo de la aplicación actual y está encapsulado en `components/OnboardingStepper.tsx`.

1.  **Gestión de Pasos:** El componente define una estructura `steps` que contiene el nombre, descripción, ícono, componente de React y los campos de datos asociados a cada paso.
2.  **Manejo de Estado:**
    -   `currentStep`: Un estado de React (`useState`) que rastrea el paso actual.
    -   `data`: Un único objeto de estado que almacena toda la información del formulario (`OnboardingData`). La función `updateData` actualiza este objeto de manera inmutable.
3.  **Persistencia en `localStorage`:**
    -   Se utilizan dos `useEffect` para guardar y cargar el progreso.
    -   Al montar el componente, intenta cargar el progreso guardado desde `localStorage` usando una clave única por usuario (`onboardingProgress_${user.id}`).
    -   Cada vez que `data` o `currentStep` cambian, el progreso se guarda automáticamente en `localStorage`. Los objetos `File` se excluyen de la serialización.
    -   Al completar el onboarding, la entrada de `localStorage` se elimina.
4.  **Validación de Pasos:** La función `isStepComplete` verifica si todos los campos requeridos para un paso específico han sido completados. Esto se usa para mostrar visualmente el progreso en la barra lateral de navegación.
5.  **Generación del Contrato:** La función `generateContractHTML` crea dinámicamente el HTML del contrato final, inyectando los datos recopilados durante todo el proceso. Los campos vacíos se representan con `"__________"`.
6.  **Finalización:** Al firmar el contrato y enviar el formulario, se llama a la función `completeOnboarding` del `AuthContext`, que actualiza el estado del usuario (`onboardingComplete: true`). Esto hace que `HostDashboardPage` renderice el `MainDashboard` en lugar del `OnboardingStepper`.

## 5. Componentes Destacados

-   **`OnboardingStepper.tsx`**: Orquesta todo el proceso de onboarding. Incluye la barra lateral de navegación, la renderización del componente del paso actual y los botones de navegación.
-   **Componentes de Formulario (dentro de `OnboardingStepper.tsx`)**:
    -   `InputField`, `SelectField`, `TextAreaField`: Componentes de entrada estilizados con diseño "flat", íconos SVG y etiquetas flotantes para una experiencia de usuario moderna.
    -   `FileUpload`: Componente avanzado que soporta "drag and drop", muestra una vista previa del archivo cargado con barra de progreso y permite eliminar el archivo.
-   **`Icons.tsx`**: Un único lugar para definir todos los iconos SVG de la aplicación como componentes de React, lo que facilita su reutilización y mantenimiento.

## 6. Estilos

-   **Tailwind CSS:** Se utiliza para un desarrollo rápido y consistente de la UI.
-   **Configuración Personalizada:** La configuración del tema de Tailwind se encuentra directamente en `index.html` dentro de una etiqueta `<script>`. Esto incluye la paleta de colores personalizada (`alasla-red`, `alasla-dark`, etc.) y animaciones (`fadeIn`).

## 7. Posibles Mejoras a Futuro

-   **Conectar a un Backend Real:** Reemplazar la base de datos simulada y el `localStorage` con llamadas a una API REST o GraphQL.
-   **Desarrollar el `ClientDashboardPage`:** Implementar la funcionalidad de búsqueda, reserva y gestión de estancias para los clientes.
-   **Gestión de Propiedades:** Añadir funcionalidades para que los anfitriones puedan editar sus propiedades, gestionar calendarios, precios y ver reservas.
-   **Refactorizar Estilos:** Mover la configuración de Tailwind de `index.html` a un archivo `tailwind.config.js` para una mejor organización.
