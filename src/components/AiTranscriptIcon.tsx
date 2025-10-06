// import React from 'react';

// interface AiTranscriptIconProps {
//   // Define el tamaño del icono (ej: 'w-6 h-6', 'w-8 h-8')
//   className?: string; 
//   // Opcional: El color primario, por defecto el azul de la paleta de la app
//   color?: string;
// }

// export const AiTranscriptIcon: React.FC<AiTranscriptIconProps> = ({ 
//     className = "w-6 h-6", // Tamaño por defecto para uso general en la UI
//     color = "#3b82f6"       // Color azul por defecto (Tailwind blue-500)
// }) => {
//   // Dimensiones del ViewBox del SVG
//   const size = 24;

//   return (
//     <svg 
//       className={className} 
//       xmlns="http://www.w3.org/2000/svg" 
//       viewBox={`0 0 ${size} ${size}`} 
//       fill="none" 
//       stroke={color} // El color se aplica al stroke de las formas
//       strokeWidth="1.5" // Grosor de las líneas
//       strokeLinecap="round" 
//       strokeLinejoin="round"
//     >
//       {/* 1. La forma principal (similar a un ojo o una onda expansiva) */}
//       <path 
//         d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8Z" 
//         strokeOpacity="0.8" 
//       />
      
//       {/* 2. El círculo central (que antes contenía la 'I' o '.txt') 
//              Ahora, como un fondo para el icono de texto/onda interior. */}
//       <circle 
//         cx="12" 
//         cy="12" 
//         r="4.5" // Tamaño del círculo
//         fill={color} 
//         stroke="none"
//       />
      
//       {/* 3. Las ondas de audio/texto dentro del círculo central */}
//       {/* Un patrón de ondas de sonido o visualización de texto */}
//       <line x1="10" y1="12" x2="14" y2="12" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
//       <line x1="10.5" y1="10" x2="13.5" y2="10" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
//       <line x1="10.5" y1="14" x2="13.5" y2="14" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
      
//       {/* 4. Líneas de 'Conexión Neuronal' o procesamiento de IA */}
//       <line x1="8" y1="8" x2="16" y2="16" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5"/>
//       <line x1="16" y1="8" x2="8" y2="16" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.5"/>

//     </svg>
//   );
// };