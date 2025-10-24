import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';


export default function Viewer({ Shape }) {
return (
<div style={{height:'80vh',borderRadius:12,overflow:'hidden'}} className="card">
{Shape ? (
<Canvas camera={{ position: [3, 3, 6], fov: 50 }}>
<ambientLight intensity={0.6} />
<directionalLight position={[5, 5, 5]} intensity={0.8} />
<React.Suspense fallback={null}>
<Shape />
</React.Suspense>
<OrbitControls />
<Stats />
</Canvas>
) : (
<div className="viewer-empty">No shape loaded. Install and Load a Plugin (try the Cylinder).</div>
)}
</div>
);
}