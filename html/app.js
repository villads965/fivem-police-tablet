:root {
  --bg: #0b0f1a;
  --panel: rgba(15, 23, 42, 0.94);
  --panel-alt: #111827;
  --primary: #3b82f6;
  --primary-2: #60a5fa;
  --accent: #34d399;
  --danger: #f87171;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --border: rgba(148, 163, 184, 0.12);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  background: #000;
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  display: none !important;
}

#tablet {
  width: 1100px;
  height: 700px;
  background: rgba(7, 10, 18, 0.92);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.8);
  overflow: hidden;
}

.tablet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: rgba(17, 24, 39, 0.82);
  border-bottom: 1px solid var(--border);
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  font-weight: bold;
  font-size: 24px;
}

.subtitle {
  margin: 0;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--muted);
  text-transform: uppercase;
}

h1 {
  margin: 4px 0 0;
  font-size: 28px;
}

.close-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 10px;
  background: rgba(248, 113, 113, 0.12);
  color: #fecaca;
  font-weight: bold;
  cursor: pointer;
}

.tablet-body {
  display: flex;
  height: calc(100% - 88px);
}

.sidebar {
  width: 220px;
  background: rgba(17, 24, 39, 0.75);
  border-right: 1px solid var(--border);
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav {
  padding: 14px 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  text-align: left;
  cursor: pointer;
}

.nav.active {
  background: linear-gradient(135deg, rgba(59,130,246,0.20), rgba(96,165,250,0.08));
  border-color: rgba(96,165,250,0.5);
}

.content {
  flex: 1;
  padding: 22px;
  background: rgba(2, 6, 23, 0.5);
}

.panel {
  display: none;
  height: 100%;
}

.panel.active {
  display: block;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 16px;
}

.card {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card span {
  color: var(--muted);
  font-size: 13px;
}

.card strong {
  font-size: 30px;
}

.info-row {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.box,
.settings-box,
.list-item {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
}

.box h3 {
  margin: 0 0 10px;
}

.box p,
.settings-box p {
  margin: 0;
  color: var(--muted);
}

.quick-actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.action {
  padding: 12px 18px;
  border: 1px solid rgba(96,165,250,0.4);
  border-radius: 10px;
  background: rgba(59,130,246,0.10);
  color: var(--text);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
}

.list-item h4 {
  margin: 0 0 6px;
}

.list-item p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: bold;
  background: rgba(52,211,153,0.15);
  color: #bbf7d0;
}

.badge.warning {
  background: rgba(248,113,113,0.12);
  color: #fecaca;
}

.fine-form {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

input {
  flex: 1;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 10px;
  padding: 12px 14px;
}

#issueFineBtn {
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  border: none;
  border-radius: 10px;
  color: white;
  padding: 12px 18px;
  font-weight: bold;
}

.fleet-btn {
  background: rgba(59,130,246,0.12);
  border: 1px solid rgba(96,165,250,0.4);
  color: var(--text);
  border-radius: 10px;
  padding: 8px 10px;
}

@media (max-width: 1200px) {
  #tablet {
    width: 92vw;
    height: 80vh;
  }
}
