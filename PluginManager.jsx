import React, { useState, useEffect } from "react";
import { fetchPlugins, installPlugin } from "../api";

function PluginManager({ plugins, onInstall, onLoadPlugin }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInstall = async () => {
    if (!repoUrl) return;
    setLoading(true);
    try {
      await onInstall(repoUrl);
      setRepoUrl("");
    } catch (err) {
      console.error("Error installing plugin", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="card">
        <h3>Plugins</h3>
        <p className="small">
          Install plugin from GitHub repo URL (plugin must follow plugin-spec)
        </p>
        <input
          className="input"
          placeholder="https://github.com/username/shape-cylinder"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <div style={{ marginTop: 8 }}>
          <button
            className="button"
            onClick={handleInstall}
            disabled={loading || !repoUrl}
          >
            {loading ? "Installing..." : "Install"}
          </button>
        </div>
      </div>

      <div className="card">
        <h4>Installed</h4>
        <ul className="plugin-list">
          {plugins.length === 0 && <li>No plugins found</li>}
          {plugins.map(p => (
            <li key={p.id} className="plugin-item">
              <div>
                <strong>{p.name}</strong>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {p.repo_url}
                </div>
              </div>
              <button className="button" onClick={() => onLoadPlugin(p.id)}>
                Load
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default PluginManager;

