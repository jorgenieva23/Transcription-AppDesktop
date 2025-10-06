// // Extiende el namespace 'React' para añadir WebkitAppRegion al estilo
// declare module 'react' {
//   interface CSSProperties {
//     webkitAppRegion?: 'no-drag' | 'drag';
//   }
// }

// // Extiende el namespace 'JSX' para permitir la propiedad 'style'
// // con 'WebkitAppRegion' en todos los elementos HTML.
// // Aunque la anterior ya cubre la mayoría de los casos, esta es más robusta.
// declare namespace JSX {
//   interface IntrinsicElements {
//     // Permite que cualquier elemento HTML tenga la propiedad webkitAppRegion en su estilo
//     div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
//       style?: React.CSSProperties & {
//         webkitAppRegion?: 'no-drag' | 'drag';
//       };
//     };
//     // Puedes repetir esto para otros elementos como 'button', 'span', etc., si los usas con webkitAppRegion
//     button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
//         style?: React.CSSProperties & {
//             webkitAppRegion?: 'no-drag' | 'drag';
//         };
//     };
//     // ... otros elementos si es necesario
//   }
// }