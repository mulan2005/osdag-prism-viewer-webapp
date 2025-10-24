import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:8000/api' });


export default {
async getPlugins() {
const r = await API.get('/plugins/');
return r.data;
},
async installPlugin(payload) {
const r = await API.post('/plugins/install/', payload);
return r.data;
},
async getPluginBundleUrl(pluginId) {
// Backend should return a URL to a JS bundle for safe dynamic import
const r = await API.get(`/plugins/${pluginId}/bundle-url/`);
return r.data.url; // e.g. https://your-backend/safe-bundles/shape-cylinder.js
},
async dynamicImport(url) {
// Use dynamic import from blob to avoid eval. Works if backend returns JS bundle content.
// If url is same-origin and served as JS, we can simply import(url) but bundlers block dynamic imports of remote URLs.
// Strategy: fetch the JS text, create a blob URL and dynamic import that blob.
const resp = await fetch(url, { mode: 'cors' });
if (!resp.ok) throw new Error('Failed to fetch plugin bundle');
const js = await resp.text();
const blob = new Blob([js], { type: 'text/javascript' });
const blobUrl = URL.createObjectURL(blob);
try {
const module = await import(/* webpackIgnore: true */ blobUrl);
URL.revokeObjectURL(blobUrl);
return module;
} catch (e) {
URL.revokeObjectURL(blobUrl);
throw e;
}
}
};