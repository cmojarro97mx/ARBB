
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

// --- Logo ---

export const AlaslaLogo: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Symbol: Stylized 'A' / Roof */}
        <path d="M20.5 8L4 32H11.5L14.5 27H26.5L29.5 32H37L20.5 8Z" fill="currentColor" />
        <path d="M20.5 14L24.5 22H16.5L20.5 14Z" fill="white" />
        
        {/* Text */}
        <path d="M55 32L50 32L50 14L44 14L44 10L61 10L61 14L55 14L55 32Z" fill="currentColor"/>
        <path d="M65 10L71 10L71 32L77 32L77 36L65 36L65 10Z" fill="currentColor"/>
        <path d="M89.5 10L81 32H87.5L89 28H98L99.5 32H106L97.5 10H89.5ZM93.5 16L96.5 24H90.5L93.5 16Z" fill="currentColor"/>
        <path d="M112 24.5C112 22 113.5 21 116 21H120V18C120 16.5 119 15.5 117 15.5C115 15.5 113.5 16.5 113 18L108 17C109 13.5 112.5 11.5 117 11.5C122.5 11.5 125 14 125 18V32H120V29C119 31 117 32.5 114 32.5C110.5 32.5 108 30.5 108 27C108 23.5 110.5 21.5 114 21.5H114.5L120 21.5V24.5H116C114 24.5 112 25.5 112 27.5V24.5Z" fill="currentColor"/>
    </svg>
);

// --- Animation Component ---

export const ArrivingCarAnimation: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <style>
            {`
                .house-draw { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawHouse 2s ease-out forwards; }
                .roof-draw { stroke-dasharray: 200; stroke-dashoffset: 200; animation: drawRoof 2s 0.5s ease-out forwards; }
                .door-pop { transform-origin: bottom center; transform: scaleY(0); animation: popUp 0.5s 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .window-pop { opacity: 0; animation: fadeIn 0.5s 2s ease-out forwards; }
                .key-float { opacity: 0; transform: translateY(10px); animation: floatUp 1s 2.2s ease-out forwards, hover 3s 3.2s ease-in-out infinite; }
                
                @keyframes drawHouse { to { stroke-dashoffset: 0; } }
                @keyframes drawRoof { to { stroke-dashoffset: 0; } }
                @keyframes popUp { to { transform: scaleY(1); } }
                @keyframes fadeIn { to { opacity: 1; } }
                @keyframes floatUp { to { opacity: 1; transform: translateY(0); } }
                @keyframes hover { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            `}
        </style>
        
        {/* Ground */}
        <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        
        {/* House Body */}
        <path className="house-draw" d="M25 90V45H75V90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Roof */}
        <path className="roof-draw" d="M15 45L50 15L85 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Door */}
        <path className="door-pop" d="M42 90V65C42 62.7909 43.7909 61 46 61H54C56.2091 61 58 62.7909 58 65V90" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
        
        {/* Window */}
        <circle className="window-pop" cx="50" cy="35" r="6" fill="currentColor" fillOpacity="0.2" />

        {/* Floating Key */}
        <g className="key-float">
            <circle cx="75" cy="30" r="8" stroke="#E61E4D" strokeWidth="2" fill="white" />
            <path d="M75 38V55M75 45H80M75 50H80" stroke="#E61E4D" strokeWidth="2" strokeLinecap="round" />
        </g>
    </svg>
);

// --- Standard UI Icons (Refined 1.5px Stroke) ---

const BaseIcon: React.FC<IconProps> = ({ children, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        {children}
    </svg>
);

export const UserCircle: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></BaseIcon>
);

export const Home: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></BaseIcon>
);

export const Mail: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></BaseIcon>
);

export const Lock: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></BaseIcon>
);

export const Compass: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></BaseIcon>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></BaseIcon>
);

export const UploadCloud: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></BaseIcon>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></BaseIcon>
);

export const Check: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M20 6 9 17l-5-5" /></BaseIcon>
);

export const Edit3: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></BaseIcon>
);

export const MapPin: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></BaseIcon>
);

export const FileText: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></BaseIcon>
);

export const CreditCard: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></BaseIcon>
);

export const FileClock: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M16 22h2a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v8" /><polyline points="14 2 14 8 20 8" /><circle cx="10" cy="16" r="4" /><path d="M10 14v2l1.5 1.5" /></BaseIcon>
);

export const ShieldCheck: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></BaseIcon>
);

export const DollarSign: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></BaseIcon>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></BaseIcon>
);

export const Signature: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="m21 10-2 2.5c-1.5 2-5 5-9.5 5S4 14 4 14" /><path d="M3.5 14h4" /><path d="M13 5.5 19 2" /></BaseIcon>
);

export const PhoneIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></BaseIcon>
);

export const HashIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" /></BaseIcon>
);

export const ClipboardListIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></BaseIcon>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></BaseIcon>
);

export const Building: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></BaseIcon>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></BaseIcon>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></BaseIcon>
);

export const CalendarIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></BaseIcon>
);

export const GlobeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></BaseIcon>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></BaseIcon>
);

export const PenToolIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></BaseIcon>
);

export const TrendingUpIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></BaseIcon>
);

export const BarChart: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></BaseIcon>
);

export const WrenchIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></BaseIcon>
);

export const MessageSquare: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></BaseIcon>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.8.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></BaseIcon>
);

export const LayoutGridIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></BaseIcon>
);

export const LogOutIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></BaseIcon>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.23l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.23l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></BaseIcon>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M5 12h14" /><path d="M12 5v14" /></BaseIcon>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></BaseIcon>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="m6 9 6 6 6-6" /></BaseIcon>
);
