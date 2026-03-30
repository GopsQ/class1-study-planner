import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import StudyPlanner from './StudyPlanner'
import GrammarBookPlanner from './GrammarBookPlanner'
import GrammarFunZone from './GrammarFunZone'

// Polyfill window.storage for non-Claude environments
if (!window.storage) {
  const store = {};
  window.storage = {
    async get(key) {
      if (store[key] !== undefined) return { key, value: store[key] };
      const val = localStorage.getItem('c1sp_' + key);
      if (val !== null) return { key, value: val };
      throw new Error('Key not found');
    },
    async set(key, value) {
      store[key] = value;
      localStorage.setItem('c1sp_' + key, value);
      return { key, value };
    },
    async delete(key) {
      delete store[key];
      localStorage.removeItem('c1sp_' + key);
      return { key, deleted: true };
    },
    async list(prefix) {
      const keys = Object.keys(localStorage)
        .filter(k => k.startsWith('c1sp_' + (prefix || '')))
        .map(k => k.replace('c1sp_', ''));
      return { keys };
    }
  };
}

const TABS = [
  { id: 'planner', label: 'Daily Planner', emoji: '🌞', desc: 'Routines & Timetable' },
  { id: 'book', label: 'Book Planner', emoji: '📘', desc: '34-Week Plan' },
  { id: 'exercises', label: 'Grammar Fun', emoji: '🎓', desc: 'Interactive Exercises' },
];

function AppShell() {
  const [active, setActive] = useState('planner');

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      
      {/* Top Navigation */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#1A1A2E', padding: '10px 12px',
        display: 'flex', gap: 6, justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)} style={{
            padding: '8px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontWeight: 700, fontSize: 12,
            transition: 'all 0.2s',
            background: active === tab.id ? '#7C3AED' : 'rgba(255,255,255,0.1)',
            color: active === tab.id ? '#FFF' : 'rgba(255,255,255,0.6)',
          }}>
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {active === 'planner' && <StudyPlanner />}
      {active === 'book' && <GrammarBookPlanner />}
      {active === 'exercises' && <GrammarFunZone />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
)
