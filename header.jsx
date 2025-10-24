import React from 'react';
export default function Header(){
return (
<header className="app-header">
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div>
<h1 style={{margin:0}}>Prism Viewer — Web</h1>
<div className="tagline">Modular 3D shape viewer with plugin support</div>
</div>
<div style={{fontSize:12,color:'var(--muted)'}}>Frontend Demo</div>
</div>
</header>
)
}