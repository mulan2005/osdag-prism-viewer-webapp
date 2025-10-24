import React, { useEffect, useState } from 'react';
import Header from './components/header';
import PluginManager from './components/PluginManager';
import Viewer from './components/viewer';
import api from './lib/api';


export default function App() {
const [plugins, setPlugins] = useState([]);
const [activeShape, setActiveShape] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
let mounted = true;
async function load() {
try {
const list = await api.getPlugins();
if (mounted) setPlugins(list);
} catch (e) {
console.error('Failed to fetch plugins', e);
} finally {
if (mounted) setLoading(false);
}
}
load();
return () => { mounted = false };
}, []);


const handleInstall = async (repoUrl) => {
setLoading(true);
try {
const installed = await api.installPlugin({ repo_url: repoUrl });
setPlugins(prev => [installed, ...prev.filter(p => p.id !== installed.id)]);
} catch (e) {
console.error(e);
alert('Plugin installation failed');
} finally {
setLoading(false);
}
};


const handleLoadPlugin = async (pluginId) => {
setLoading(true);
try {
const moduleUrl = await api.getPluginBundleUrl(pluginId);
const module = await api.dynamicImport(moduleUrl);
// plugin must export Shape component and meta
if (!module || !module.Shape) throw new Error('Invalid plugin module');
setActiveShape(() => module.Shape);
} catch (e) {
console.error('Failed to load plugin', e);
alert('Failed to load plugin. Check console for details.');
} finally {
setLoading(false);
}
};


  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <PluginManager
              plugins={plugins}
              onInstall={handleInstall}
              onLoadPlugin={handleLoadPlugin}
            />
            {activeShape && <Viewer Shape={activeShape} />}
          </>
        )}
      </main>
    </div>
  );
}

