export function Shape(props) {
// This plugin assumes the host uses react-three-fiber primitives available in the global scope.
// For safest interop, plugin uses low-level primitives available through react-three-fiber.
const { useRef } = require('react');
const { useFrame } = require('@react-three/fiber');
const ref = useRef();
useFrame(() => { if (ref.current) ref.current.rotation.y += 0.01; });
return (
React.createElement('mesh', { ref },
React.createElement('boxGeometry', { args: [1.5, 1.5, 1.5] }),
React.createElement('meshStandardMaterial', { color: '#ff6d00' })
)
);
}


export const meta = { name: 'Cylinder (example bundle, renders cube for fallback)' };