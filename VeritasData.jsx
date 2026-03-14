<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VeritasData — Intelligent Data Quality Platform</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #04100e;
  --bg2: #071a16;
  --bg3: #0a2420;
  --surface: #0d2e28;
  --surface2: #112e28;
  --border: rgba(45,200,160,0.12);
  --border2: rgba(45,200,160,0.22);
  --teal: #2dc8a0;
  --teal2: #1ea882;
  --teal-dim: rgba(45,200,160,0.08);
  --teal-glow: rgba(45,200,160,0.15);
  --amber: #f0a030;
  --red: #e05555;
  --text: #e8f5f0;
  --text2: #7ab8a8;
  --text3: #3d7a6a;
  --font: 'Sora', sans-serif;
  --mono: 'JetBrains Mono', monospace;
  --serif: 'Crimson Pro', serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--surface); border-radius: 10px; }

/* ── NAV ── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%; height: 64px;
  background: rgba(4,16,14,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 1.15rem; font-weight: 700; color: var(--text);
  text-decoration: none; letter-spacing: -0.3px;
}
.nav-logo-mark {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, var(--teal2), var(--teal));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 14px; color: #04100e; font-weight: 700;
}
.nav-links { display: flex; align-items: center; gap: 32px; }
.nav-links a {
  font-size: 13px; color: var(--text2); text-decoration: none;
  font-weight: 500; letter-spacing: 0.2px;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--teal); }
.nav-cta {
  background: var(--teal); color: #04100e !important;
  padding: 8px 20px; border-radius: 8px; font-weight: 600 !important;
  font-size: 13px !important; transition: all 0.2s !important;
}
.nav-cta:hover { background: var(--teal2) !important; transform: translateY(-1px); }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 100px 5% 80px;
  position: relative; overflow: hidden;
}
.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
}
.hero-glow {
  position: absolute; width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(45,200,160,0.12) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -60%);
  pointer-events: none;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--teal-dim); border: 1px solid var(--border2);
  border-radius: 30px; padding: 6px 16px; margin-bottom: 28px;
  font-size: 12px; font-weight: 600; color: var(--teal);
  letter-spacing: 0.8px; text-transform: uppercase;
  position: relative;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--teal); animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}
.hero h1 {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800; line-height: 1.08;
  letter-spacing: -2px; margin-bottom: 20px;
  position: relative;
}
.hero h1 .accent { color: var(--teal); }
.hero h1 .serif {
  font-family: var(--serif); font-style: italic;
  font-weight: 300; letter-spacing: -1px;
}
.hero-sub {
  font-size: 1.1rem; color: var(--text2); max-width: 560px;
  margin: 0 auto 40px; font-weight: 400; line-height: 1.7;
}
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  background: var(--teal); color: #04100e;
  padding: 14px 32px; border-radius: 10px; border: none;
  font-family: var(--font); font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all 0.2s; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  letter-spacing: 0.2px;
}
.btn-primary:hover { background: var(--teal2); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(45,200,160,0.25); }
.btn-secondary {
  background: transparent; color: var(--text);
  padding: 14px 32px; border-radius: 10px;
  border: 1px solid var(--border2);
  font-family: var(--font); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-secondary:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-dim); }

/* ── STATS BAR ── */
.stats-bar {
  background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  padding: 24px 5%; display: flex; justify-content: center; gap: 64px; flex-wrap: wrap;
}
.stat-item { text-align: center; }
.stat-num {
  font-size: 1.8rem; font-weight: 800; color: var(--teal);
  font-family: var(--mono); letter-spacing: -1px;
}
.stat-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

/* ── SECTION ── */
section { padding: 100px 5%; }
.section-label {
  font-size: 11px; font-weight: 600; color: var(--teal);
  letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
  font-family: var(--mono);
}
.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800; letter-spacing: -1px; line-height: 1.15;
  margin-bottom: 16px;
}
.section-sub {
  font-size: 1rem; color: var(--text2); max-width: 560px;
  line-height: 1.7; margin-bottom: 60px;
}

/* ── WORKFLOW ── */
.workflow-section { background: var(--bg); }
.workflow-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0; max-width: 1200px; margin: 0 auto;
  position: relative;
}
.workflow-grid::before {
  content: ''; position: absolute;
  left: 50%; top: 0; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, transparent, var(--border2) 20%, var(--border2) 80%, transparent);
}
.workflow-step {
  padding: 32px 40px; position: relative;
  border-bottom: 1px solid var(--border);
  transition: background 0.3s;
}
.workflow-step:hover { background: var(--teal-dim); }
.workflow-step.left { border-right: 1px solid var(--border); text-align: right; }
.workflow-step.right { text-align: left; }
.step-num {
  font-family: var(--mono); font-size: 11px; color: var(--text3);
  letter-spacing: 1px; margin-bottom: 8px;
}
.step-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.step-desc { font-size: 13px; color: var(--text2); line-height: 1.6; }
.step-tag {
  display: inline-block; margin-top: 8px;
  background: var(--teal-dim); border: 1px solid var(--border2);
  color: var(--teal); font-size: 10px; font-weight: 700;
  padding: 2px 10px; border-radius: 20px; letter-spacing: 0.5px;
  font-family: var(--mono);
}
.step-connector {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--bg2); border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 11px; color: var(--teal);
  z-index: 2; font-weight: 600;
}

/* ── FEATURES ── */
.features-section { background: var(--bg2); }
.features-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--border);
  border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  max-width: 1200px; margin: 0 auto;
}
.feature-card {
  background: var(--bg2); padding: 32px 28px;
  transition: background 0.3s;
}
.feature-card:hover { background: var(--bg3); }
.feature-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: var(--teal-dim); border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; font-family: var(--mono); font-size: 16px; color: var(--teal);
}
.feature-title { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.feature-desc { font-size: 13px; color: var(--text2); line-height: 1.6; }

/* ── SCORE DEMO ── */
.demo-section { background: var(--bg); }
.demo-container {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; align-items: center;
}
.score-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 20px; padding: 36px; text-align: center;
}
.score-ring-wrap { position: relative; display: inline-block; margin-bottom: 20px; }
.score-ring {
  width: 160px; height: 160px; border-radius: 50%;
  border: 3px solid var(--teal); background: var(--teal-dim);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.score-big { font-family: var(--mono); font-size: 3rem; font-weight: 700; color: var(--teal); line-height: 1; }
.score-of { font-size: 11px; color: var(--text3); letter-spacing: 1px; margin-top: 4px; }
.score-label { font-size: 14px; font-weight: 600; color: var(--teal); margin-bottom: 20px; }
.score-bars { display: flex; flex-direction: column; gap: 10px; text-align: left; }
.score-bar-row { display: flex; align-items: center; gap: 10px; }
.score-bar-label { font-size: 12px; color: var(--text2); width: 110px; flex-shrink: 0; }
.score-bar-track {
  flex: 1; height: 5px; background: var(--surface);
  border-radius: 10px; overflow: hidden;
}
.score-bar-fill { height: 100%; border-radius: 10px; background: var(--teal); }
.score-bar-val { font-family: var(--mono); font-size: 11px; color: var(--text3); width: 28px; text-align: right; }

.issues-panel { display: flex; flex-direction: column; gap: 10px; }
.issue-row {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 10px; padding: 14px 16px;
  display: flex; align-items: center; gap: 12px;
  transition: border-color 0.2s;
}
.issue-row:hover { border-color: var(--border2); }
.issue-sev {
  padding: 3px 10px; border-radius: 6px; font-size: 10px;
  font-weight: 700; letter-spacing: 0.5px; font-family: var(--mono);
  flex-shrink: 0;
}
.sev-high { background: rgba(224,85,85,0.15); color: #e05555; border: 1px solid rgba(224,85,85,0.3); }
.sev-med { background: rgba(240,160,48,0.15); color: #f0a030; border: 1px solid rgba(240,160,48,0.3); }
.sev-low { background: rgba(45,200,160,0.1); color: var(--teal); border: 1px solid var(--border2); }
.issue-col { font-size: 13px; font-weight: 600; color: var(--text); flex: 1; }
.issue-detail { font-size: 12px; color: var(--text2); }
.issue-count { font-family: var(--mono); font-size: 12px; color: var(--text3); }

/* ── PIPELINE ── */
.pipeline-section { background: var(--bg2); overflow: hidden; }
.pipeline-scroll {
  display: flex; gap: 0; overflow-x: auto; padding-bottom: 16px;
  scrollbar-width: thin;
}
.pipeline-step {
  flex-shrink: 0; width: 220px;
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px 16px; margin-right: 2px;
  position: relative;
}
.pipeline-step::after {
  content: '→'; position: absolute; right: -18px; top: 50%;
  transform: translateY(-50%); color: var(--text3);
  font-size: 14px; z-index: 1;
}
.pipeline-step:last-child::after { display: none; }
.pipeline-num { font-family: var(--mono); font-size: 10px; color: var(--text3); margin-bottom: 8px; }
.pipeline-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.pipeline-desc { font-size: 11px; color: var(--text2); line-height: 1.5; }
.pipeline-active { border-color: var(--teal); background: var(--teal-dim); }
.pipeline-active .pipeline-num { color: var(--teal); }

/* ── TECH ── */
.tech-section { background: var(--bg); }
.tech-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 16px; max-width: 900px; margin: 0 auto;
}
.tech-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px;
  text-align: center; transition: all 0.2s;
}
.tech-card:hover { border-color: var(--border2); transform: translateY(-2px); }
.tech-icon { font-family: var(--mono); font-size: 1.4rem; color: var(--teal); margin-bottom: 8px; }
.tech-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.tech-role { font-size: 11px; color: var(--text3); }


/* ── CERTIFICATE ── */
.cert-section { background: var(--bg); }
.cert-card {
  max-width: 680px; margin: 0 auto;
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: 20px; overflow: hidden;
}
.cert-header {
  background: linear-gradient(135deg, #071a16, #0d3530);
  padding: 32px 40px;
  border-bottom: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: space-between;
}
.cert-title { font-size: 11px; color: var(--text3); letter-spacing: 2px; text-transform: uppercase; font-family: var(--mono); }
.cert-name { font-size: 1.4rem; font-weight: 800; margin-top: 4px; }
.cert-logo { font-family: var(--mono); font-size: 2rem; color: var(--teal); }
.cert-body { padding: 32px 40px; }
.cert-score-row { display: flex; justify-content: space-between; margin-bottom: 24px; align-items: center; }
.cert-score-big { font-family: var(--mono); font-size: 3rem; font-weight: 700; color: var(--teal); line-height: 1; }
.cert-score-sub { font-size: 12px; color: var(--text3); }
.cert-status {
  background: rgba(45,200,160,0.12); border: 1px solid var(--border2);
  color: var(--teal); padding: 8px 20px; border-radius: 8px;
  font-size: 13px; font-weight: 700; font-family: var(--mono);
}
.cert-rows { display: flex; flex-direction: column; gap: 0; }
.cert-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0; border-bottom: 1px solid var(--border);
  font-size: 13px;
}
.cert-row:last-child { border-bottom: none; }
.cert-key { color: var(--text2); }
.cert-val { font-weight: 600; color: var(--text); font-family: var(--mono); font-size: 12px; }
.cert-val.green { color: var(--teal); }
.cert-val.amber { color: var(--amber); }
.cert-val.red { color: var(--red); }
.cert-footer {
  background: var(--bg3); padding: 16px 40px;
  border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
}
.cert-footer-text { font-size: 11px; color: var(--text3); font-family: var(--mono); }

/* ── CTA ── */
.cta-section {
  background: var(--bg2); text-align: center; padding: 120px 5%;
  position: relative; overflow: hidden;
}
.cta-glow {
  position: absolute; width: 500px; height: 300px;
  background: radial-gradient(ellipse, rgba(45,200,160,0.1) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  pointer-events: none;
}
.cta-section h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800; letter-spacing: -1.5px;
  margin-bottom: 16px; position: relative;
}
.cta-section p { color: var(--text2); margin-bottom: 40px; font-size: 1rem; position: relative; }

/* ── FOOTER ── */
footer {
  background: var(--bg); border-top: 1px solid var(--border);
  padding: 40px 5%; display: flex;
  align-items: center; justify-content: space-between; flex-wrap: gap;
}
.footer-left { display: flex; align-items: center; gap: 10px; }
.footer-copy { font-size: 12px; color: var(--text3); }
.footer-links { display: flex; gap: 24px; }
.footer-links a { font-size: 12px; color: var(--text3); text-decoration: none; transition: color 0.2s; }
.footer-links a:hover { color: var(--teal); }

/* ── UPLOAD DEMO ── */
.upload-zone {
  max-width: 700px; margin: 0 auto 60px;
  background: var(--bg2); border: 1.5px dashed var(--border2);
  border-radius: 16px; padding: 56px 32px; text-align: center;
  transition: all 0.3s; cursor: pointer;
}
.upload-zone:hover { border-color: var(--teal); background: var(--teal-dim); }
.upload-icon { font-family: var(--mono); font-size: 2rem; color: var(--teal); margin-bottom: 12px; }
.upload-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.upload-sub { font-size: 13px; color: var(--text2); margin-bottom: 20px; }
.upload-formats { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
.fmt-tag {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 6px; padding: 4px 12px;
  font-family: var(--mono); font-size: 11px; color: var(--text3);
}

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.6s ease forwards; }
.fade-up-2 { animation: fadeUp 0.6s 0.15s ease both; }
.fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
.fade-up-4 { animation: fadeUp 0.6s 0.45s ease both; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .workflow-grid { grid-template-columns: 1fr; }
  .workflow-grid::before { display: none; }
  .workflow-step.left { text-align: left; border-right: none; }
  .step-connector { display: none; }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .tech-grid { grid-template-columns: repeat(2, 1fr); }
  .demo-container { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 600px) {
  .features-grid { grid-template-columns: 1fr; }
  .tech-grid { grid-template-columns: 1fr 1fr; }
  .stats-bar { gap: 32px; }
}

/* ── CUSTOM CURSOR ── */
* { cursor: none !important; }
#cursor {
  width: 10px; height: 10px;
  background: #2dc8a0;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  box-shadow: 0 0 10px #2dc8a0, 0 0 20px rgba(45,200,160,0.35);
}
#cursor-ring {
  width: 28px; height: 28px;
  border: 1px solid rgba(45,200,160,0.45);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 99998;
  transition: left 0.06s ease, top 0.06s ease;
}
</style>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
</head>
<body>
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    <div class="nav-logo-mark">◈</div>
    VeritasData
  </a>
  <div class="nav-links">
    <a href="#workflow">Workflow</a>
    <a href="#features">Features</a>
    <a href="#pipeline">Pipeline</a>
    <a href="#certificate">Certificate</a>
    <a href="#upload" class="nav-cta">Launch Platform</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>

  <div class="hero-badge fade-up">
    <div class="badge-dot"></div>
    Intelligent Data Quality Platform
  </div>

  <h1 class="fade-up-2">
    Your data,<br>
    <span class="accent">verified.</span><br>
    <span class="serif">Completely.</span>
  </h1>

  <p class="hero-sub fade-up-3">
    VeritasData automatically scans, analyses, scores, cleans, and certifies
    your datasets — so your machine learning models and research are built
    on data you can trust.
  </p>

  <div class="hero-actions fade-up-4">
    <a href="#upload" class="btn-primary">
      ◈ &nbsp;Analyse Your Dataset
    </a>
    <a href="#workflow" class="btn-secondary">
      View Full Workflow →
    </a>
  </div>
</section>

<!-- STATS BAR -->
<div class="stats-bar">
  <div class="stat-item">
    <div class="stat-num">28+</div>
    <div class="stat-label">Pipeline Steps</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">6</div>
    <div class="stat-label">Health Dimensions</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">100%</div>
    <div class="stat-label">Private — Local Processing</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">4</div>
    <div class="stat-label">Compliance Frameworks</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">6</div>
    <div class="stat-label">Export Formats</div>
  </div>
</div>

<!-- UPLOAD SECTION -->
<section id="upload" style="background: var(--bg); padding: 80px 5%;">
  <div style="text-align:center; margin-bottom: 48px;">
    <div class="section-label">Start Here</div>
    <h2 class="section-title" style="margin-bottom: 12px;">Upload Your Dataset</h2>
    <p style="color: var(--text2); font-size: 14px;">CSV · Excel · JSON · TSV · Google Sheets — all supported</p>
  </div>

  <!-- Upload Zone -->
  <label for="fileInput" style="display:block; max-width:700px; margin: 0 auto 32px;">
    <div class="upload-zone" id="uploadZone">
      <div class="upload-icon">⬆</div>
      <div class="upload-title" id="uploadTitle">Drag & drop your file here</div>
      <div class="upload-sub" id="uploadSub">or click anywhere here to browse · Maximum 100MB</div>
      <div class="upload-formats">
        <span class="fmt-tag">CSV</span>
        <span class="fmt-tag">XLSX</span>
        <span class="fmt-tag">JSON</span>
        <span class="fmt-tag">TSV</span>
      </div>
    </div>
    <input type="file" id="fileInput" style="display:none; position:absolute;" accept=".csv,.xlsx,.json,.tsv,.txt">
  </label>

  <!-- Goal Selection -->
  <div style="max-width:700px; margin: 0 auto;">
    <div style="font-size:13px; color: var(--text2); text-align:center; margin-bottom: 16px; font-family: var(--mono);">— SELECT YOUR GOAL —</div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
      <div class="goal-card" onclick="selectGoal(this, 'ML')" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; text-align: center; transition: all 0.2s;">
        <div style="font-family: var(--mono); font-size: 1.2rem; color: var(--teal); margin-bottom: 8px;">◉</div>
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 4px;">Machine Learning</div>
        <div style="font-size: 11px; color: var(--text3);">Classification · Regression · Clustering</div>
      </div>
      <div class="goal-card" onclick="selectGoal(this, 'Research')" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; text-align: center; transition: all 0.2s;">
        <div style="font-family: var(--mono); font-size: 1.2rem; color: var(--teal); margin-bottom: 8px;">▦</div>
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 4px;">Research / Analysis</div>
        <div style="font-size: 11px; color: var(--text3);">Statistics · Insights · Reports</div>
      </div>
      <div class="goal-card" onclick="selectGoal(this, 'Viz')" style="background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; text-align: center; transition: all 0.2s;">
        <div style="font-family: var(--mono); font-size: 1.2rem; color: var(--teal); margin-bottom: 8px;">△</div>
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 4px;">Visualization</div>
        <div style="font-size: 11px; color: var(--text3);">Charts · Dashboards · Plots</div>
      </div>
    </div>
    <div style="text-align:center; margin-top: 24px;">
      <button class="btn-primary" id="analyseBtn" onclick="runAnalysis()" style="width: 100%; justify-content: center; font-size: 15px; padding: 16px;">
        ◈ &nbsp; Begin Analysis
      </button>
    </div>
  </div>

  <!-- ANALYSIS RESULTS (hidden until file uploaded) -->
  <div id="analysisResults" style="display:none; max-width:1100px; margin: 60px auto 0;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:40px;">
      <div class="section-label">Analysis Complete</div>
      <h2 class="section-title" id="resultsTitle">Dataset Report</h2>
    </div>

    <!-- Score + KPI row -->
    <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr 1fr; gap:16px; margin-bottom:24px;">
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:24px;text-align:center;">
        <div style="font-size:11px;color:var(--text3);font-family:var(--mono);margin-bottom:12px;letter-spacing:1px;">HEALTH SCORE</div>
        <div id="scoreRing" style="width:100px;height:100px;border-radius:50%;border:3px solid var(--teal);background:var(--teal-dim);display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 12px;">
          <div id="scoreNum" style="font-family:var(--mono);font-size:2rem;font-weight:700;color:var(--teal);line-height:1;">--</div>
          <div style="font-size:9px;color:var(--text3);">/ 100</div>
        </div>
        <div id="scoreLabel" style="font-size:12px;font-weight:600;color:var(--teal);">Analysing...</div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:center;">
        <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">Total Rows</div>
        <div id="statRows" style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:var(--text);">—</div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:center;">
        <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">Columns</div>
        <div id="statCols" style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:var(--text);">—</div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:center;">
        <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">Missing</div>
        <div id="statMissing" style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:#e05555;">—</div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:20px;text-align:center;display:flex;flex-direction:column;justify-content:center;">
        <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">Duplicates</div>
        <div id="statDups" style="font-family:var(--mono);font-size:1.8rem;font-weight:700;color:#f0a030;">—</div>
      </div>
    </div>

    <!-- Column Analysis Table -->
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="font-size:12px;color:var(--text3);font-family:var(--mono);letter-spacing:1px;margin-bottom:16px;">COLUMN ANALYSIS — BEFORE CLEANING</div>
      <div style="overflow-x:auto;">
        <table id="colTable" style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="border-bottom:1px solid var(--border);">
              <th style="text-align:left;padding:10px 12px;color:var(--text3);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.8px;">Column</th>
              <th style="text-align:left;padding:10px 12px;color:var(--text3);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.8px;">Type</th>
              <th style="text-align:left;padding:10px 12px;color:var(--text3);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.8px;">Missing</th>
              <th style="text-align:left;padding:10px 12px;color:var(--text3);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.8px;">Sample Values</th>
              <th style="text-align:left;padding:10px 12px;color:var(--text3);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.8px;">Status</th>
            </tr>
          </thead>
          <tbody id="colTableBody"></tbody>
        </table>
      </div>
    </div>

    <!-- Raw Data Preview -->
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="font-size:12px;color:var(--text3);font-family:var(--mono);letter-spacing:1px;margin-bottom:16px;">RAW DATASET PREVIEW — FIRST 10 ROWS</div>
      <div style="overflow-x:auto;">
        <table id="rawTable" style="width:100%;border-collapse:collapse;font-size:12px;"></table>
      </div>
    </div>

    <!-- Before vs After Comparison -->
    <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="font-size:12px;color:var(--teal);font-family:var(--mono);letter-spacing:1px;margin-bottom:20px;">BEFORE vs AFTER CLEANING — COMPARISON</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        <div style="background:var(--bg);border:1px solid rgba(224,85,85,0.3);border-radius:12px;padding:20px;">
          <div style="font-size:11px;color:#e05555;font-family:var(--mono);letter-spacing:1px;margin-bottom:14px;">✕ BEFORE CLEANING</div>
          <div id="beforeStats" style="display:flex;flex-direction:column;gap:10px;"></div>
        </div>
        <div style="background:var(--bg);border:1px solid rgba(45,200,160,0.3);border-radius:12px;padding:20px;">
          <div style="font-size:11px;color:var(--teal);font-family:var(--mono);letter-spacing:1px;margin-bottom:14px;">✓ AFTER CLEANING</div>
          <div id="afterStats" style="display:flex;flex-direction:column;gap:10px;"></div>
        </div>
      </div>
      <!-- Improvement bar -->
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:12px;color:var(--text2);">Quality Improvement</div>
          <div id="improvePct" style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--teal);">+0%</div>
        </div>
        <div style="background:var(--surface);border-radius:10px;height:6px;overflow:hidden;">
          <div id="improveBar" style="height:100%;background:linear-gradient(90deg,#1ea882,#2dc8a0);border-radius:10px;width:0%;transition:width 1s ease;"></div>
        </div>
      </div>
    </div>

    <!-- Cleaned Data Preview -->
    <div style="background:var(--bg2);border:1px solid rgba(45,200,160,0.2);border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="font-size:12px;color:var(--teal);font-family:var(--mono);letter-spacing:1px;margin-bottom:16px;">CLEANED DATASET PREVIEW — FIRST 10 ROWS</div>
      <div style="overflow-x:auto;">
        <table id="cleanTable" style="width:100%;border-collapse:collapse;font-size:12px;"></table>
      </div>
    </div>

    <!-- Issues found -->
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:24px;">
      <div style="font-size:12px;color:var(--text3);font-family:var(--mono);letter-spacing:1px;margin-bottom:16px;">ISSUES DETECTED</div>
      <div id="issuesList" style="display:flex;flex-direction:column;gap:10px;"></div>
    </div>

    <!-- Download button -->
    <div style="text-align:center;padding:24px 0;">
      <button class="btn-primary" id="downloadBtn" style="font-size:15px;padding:16px 48px;">
        ⬇ &nbsp; Download Clean Dataset
      </button>
    </div>

  </div>
</section>

<!-- SCORE DEMO -->
<section class="demo-section" id="features">
  <div style="text-align:center; margin-bottom: 60px;">
    <div class="section-label">Health Score</div>
    <h2 class="section-title">Six-dimensional quality scoring</h2>
    <p class="section-sub" style="margin: 0 auto;">Every dataset receives a comprehensive quality score across six critical dimensions — giving you an honest picture of your data's health before you use it.</p>
  </div>

  <div class="demo-container">
    <div class="score-card">
      <div style="font-size: 12px; color: var(--text3); font-family: var(--mono); margin-bottom: 16px; letter-spacing: 1px;">DATASET HEALTH SCORE</div>
      <div class="score-ring-wrap">
        <div class="score-ring">
          <div class="score-big">87</div>
          <div class="score-of">/ 100</div>
        </div>
      </div>
      <div class="score-label">Excellent Quality</div>
      <div class="score-bars">
        <div class="score-bar-row">
          <div class="score-bar-label">Completeness</div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:92%"></div></div>
          <div class="score-bar-val">92</div>
        </div>
        <div class="score-bar-row">
          <div class="score-bar-label">Consistency</div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:88%"></div></div>
          <div class="score-bar-val">88</div>
        </div>
        <div class="score-bar-row">
          <div class="score-bar-label">Duplicate Risk</div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:95%; background: var(--teal)"></div></div>
          <div class="score-bar-val">95</div>
        </div>
        <div class="score-bar-row">
          <div class="score-bar-label">Bias Risk</div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:61%; background: var(--amber)"></div></div>
          <div class="score-bar-val">61</div>
        </div>
        <div class="score-bar-row">
          <div class="score-bar-label">Outlier Risk</div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:78%"></div></div>
          <div class="score-bar-val">78</div>
        </div>
        <div class="score-bar-row">
          <div class="score-bar-label">Freshness</div>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:84%"></div></div>
          <div class="score-bar-val">84</div>
        </div>
      </div>
    </div>

    <div class="issues-panel">
      <div style="font-size: 12px; color: var(--text3); font-family: var(--mono); margin-bottom: 8px; letter-spacing: 1px;">DETECTED ISSUES</div>
      <div class="issue-row">
        <div class="issue-sev sev-high">HIGH</div>
        <div>
          <div class="issue-col">Outliers Detected</div>
          <div class="issue-detail">Salary column — 5 values above IQR bound</div>
        </div>
        <div class="issue-count">5 rows</div>
      </div>
      <div class="issue-row">
        <div class="issue-sev sev-high">HIGH</div>
        <div>
          <div class="issue-col">PII Detected</div>
          <div class="issue-detail">Email column — personal data unmasked</div>
        </div>
        <div class="issue-count">1,200</div>
      </div>
      <div class="issue-row">
        <div class="issue-sev sev-med">MED</div>
        <div>
          <div class="issue-col">Missing Values</div>
          <div class="issue-detail">Age column — 12% empty</div>
        </div>
        <div class="issue-count">143 rows</div>
      </div>
      <div class="issue-row">
        <div class="issue-sev sev-med">MED</div>
        <div>
          <div class="issue-col">Class Imbalance</div>
          <div class="issue-detail">Gender: 92% Male — bias risk</div>
        </div>
        <div class="issue-count">All rows</div>
      </div>
      <div class="issue-row">
        <div class="issue-sev sev-low">LOW</div>
        <div>
          <div class="issue-col">Date Format Mix</div>
          <div class="issue-detail">DOB — 3 formats detected</div>
        </div>
        <div class="issue-count">48 rows</div>
      </div>
      <div class="issue-row">
        <div class="issue-sev sev-low">LOW</div>
        <div>
          <div class="issue-col">Duplicate Records</div>
          <div class="issue-detail">20 exact duplicate rows</div>
        </div>
        <div class="issue-count">20 rows</div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;">
        <div style="background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; text-align: center;">
          <div style="font-family: var(--mono); font-size: 1.5rem; color: var(--teal); font-weight: 700;">61 → 87</div>
          <div style="font-size: 11px; color: var(--text3); margin-top: 4px;">Score After Cleaning</div>
        </div>
        <div style="background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; text-align: center;">
          <div style="font-family: var(--mono); font-size: 1.5rem; color: var(--amber); font-weight: 700;">71% → 86%</div>
          <div style="font-size: 11px; color: var(--text3); margin-top: 4px;">ML Accuracy Gain</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PIPELINE -->
<section class="pipeline-section" id="pipeline">
  <div style="text-align:center; margin-bottom: 48px;">
    <div class="section-label">Full Pipeline</div>
    <h2 class="section-title">28-step intelligence pipeline</h2>
    <p style="color: var(--text2); font-size: 14px; max-width: 500px; margin: 0 auto;">Every dataset passes through a complete automated pipeline — from raw upload to certified clean output.</p>
  </div>
  <div class="pipeline-scroll">
    <div class="pipeline-step">
      <div class="pipeline-num">01</div>
      <div class="pipeline-name">Upload & Validate</div>
      <div class="pipeline-desc">File format check, size validation, corruption detection</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">02</div>
      <div class="pipeline-name">Size Validation</div>
      <div class="pipeline-desc">Row/column count, small dataset warning, large dataset sampling</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">03</div>
      <div class="pipeline-name">Goal Selection</div>
      <div class="pipeline-desc">ML / Research / Visualization — adapts full strategy</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">04</div>
      <div class="pipeline-name">Custom Rules</div>
      <div class="pipeline-desc">User-defined validation rules applied before scanning</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">05</div>
      <div class="pipeline-name">Dataset Scanner</div>
      <div class="pipeline-desc">Missing · Duplicates · Types · Outliers · Formats · PII · Bias</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">06</div>
      <div class="pipeline-name">Health Score</div>
      <div class="pipeline-desc">Six-dimensional quality score (0–100)</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">07</div>
      <div class="pipeline-name">Trust Scores</div>
      <div class="pipeline-desc">Per-column reliability rating with filter</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">08</div>
      <div class="pipeline-name">Risk Analyzer</div>
      <div class="pipeline-desc">Low / Medium / High severity per issue</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">09</div>
      <div class="pipeline-name">Visualisation</div>
      <div class="pipeline-desc">Heatmap · Outlier chart · Distribution · Timeline</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">10</div>
      <div class="pipeline-name">Structure Map</div>
      <div class="pipeline-desc">Column meaning detector + relationship map</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">11</div>
      <div class="pipeline-name">AI Narrator</div>
      <div class="pipeline-desc">Plain-English dataset story from scan results only</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">12</div>
      <div class="pipeline-name">Smart Suggestions</div>
      <div class="pipeline-desc">Goal-aware cleaning recommendations with risk/benefit</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">13</div>
      <div class="pipeline-name">What-If Simulator</div>
      <div class="pipeline-desc">Test strategies before applying — instant preview</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">14</div>
      <div class="pipeline-name">Auto-Cleanse</div>
      <div class="pipeline-desc">Fill · Deduplicate · Fix types · Normalise dates</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">15</div>
      <div class="pipeline-name">PII Anonymiser</div>
      <div class="pipeline-desc">Mask · Hash · Tokenise · Drop — GDPR cleared</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">16</div>
      <div class="pipeline-name">Bias Detection</div>
      <div class="pipeline-desc">Class imbalance + intersectional bias + fairness metrics</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">17</div>
      <div class="pipeline-name">Synthetic Data</div>
      <div class="pipeline-desc">Privacy-safe artificial dataset generation + validation</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">18</div>
      <div class="pipeline-name">ML Comparison</div>
      <div class="pipeline-desc">Accuracy · Precision · Recall · F1 before vs after</div>
    </div>
    <div class="pipeline-step">
      <div class="pipeline-num">19</div>
      <div class="pipeline-name">Compliance Report</div>
      <div class="pipeline-desc">GDPR · HIPAA · ISO 8000 · EU AI Act mapping</div>
    </div>
    <div class="pipeline-step pipeline-active">
      <div class="pipeline-num">20</div>
      <div class="pipeline-name">Certificate</div>
      <div class="pipeline-desc">Dataset Reliability Certificate — downloadable PDF</div>
    </div>
  </div>
</section>

<!-- FEATURES GRID -->
<section class="features-section" id="workflow">
  <div style="text-align:center; margin-bottom: 60px;">
    <div class="section-label">Capabilities</div>
    <h2 class="section-title">Everything your data needs</h2>
  </div>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">◈</div>
      <div class="feature-title">PII Detection Engine</div>
      <div class="feature-desc">Automatically identifies emails, phone numbers, credit card patterns, national IDs, and IP addresses. Flags GDPR risk per column.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">◉</div>
      <div class="feature-title">AI Dataset Story Narrator</div>
      <div class="feature-desc">Generates a plain-English narrative of your dataset's problems using only real scan results — no invented information.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">▦</div>
      <div class="feature-title">What-If Cleaning Simulator</div>
      <div class="feature-desc">Test cleaning strategies before applying them. Toggle outlier removal, fill methods, and deduplication — see score impact instantly.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">△</div>
      <div class="feature-title">Intersectional Bias Detection</div>
      <div class="feature-desc">Detects combined bias across multiple columns — e.g. Age + Gender together, not just each in isolation. Includes fairness metrics.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">◫</div>
      <div class="feature-title">Synthetic Data Generator</div>
      <div class="feature-desc">Creates privacy-safe artificial datasets that statistically mirror your real data. Includes differential privacy slider and quality validator.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">⬡</div>
      <div class="feature-title">Data Contract Generator</div>
      <div class="feature-desc">Auto-generates YAML schema contracts. Future uploads of the same dataset are validated against the contract automatically.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">▤</div>
      <div class="feature-title">Regulatory Compliance</div>
      <div class="feature-desc">Maps findings to GDPR, HIPAA, ISO 8000, and EU AI Act. Generates a compliance gap report with risk level and fix for each.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">✦</div>
      <div class="feature-title">Column Trust Scores</div>
      <div class="feature-desc">Every column receives a 0–100 reliability score. Filter to show only columns below your trust threshold — instantly prioritise fixes.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">⊕</div>
      <div class="feature-title">Colab Notebook Export</div>
      <div class="feature-desc">One-click Google Colab notebook with cleaned data, cleaning code, AutoML training, evaluation metrics, and all visualisations.</div>
    </div>
  </div>
</section>

<!-- WORKFLOW STEPS -->
<section class="workflow-section" style="padding: 100px 5%;">
  <div style="text-align:center; margin-bottom: 60px;">
    <div class="section-label">Step by Step</div>
    <h2 class="section-title">The complete workflow</h2>
    <p style="color: var(--text2); font-size: 14px;">From raw upload to certified clean dataset — every step documented.</p>
  </div>
  <div class="workflow-grid" style="max-width: 1100px; margin: 0 auto;">

    <div class="workflow-step left">
      <div class="step-num">STEP 01</div>
      <div class="step-title">Upload & Size Validation</div>
      <div class="step-desc">CSV, Excel, JSON, TSV, Google Sheets. File integrity check. Row/column count validation with smart warnings.</div>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">01</div>
      <div class="step-num">STEP 02</div>
      <div class="step-title">Smart Goal Selection</div>
      <div class="step-desc">Machine Learning (Classification · Regression · Clustering · Time-Series), Research, or Visualization. Strategy adapts entirely.</div>
      <span class="step-tag">GOAL-AWARE</span>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 03</div>
      <div class="step-title">Custom Rules Engine</div>
      <div class="step-desc">Define your own validation rules before scanning. Age 0–120, Revenue &gt; 0, Email format. Rules saved for reuse.</div>
      <span class="step-tag">NOVEL FEATURE</span>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">03</div>
      <div class="step-num">STEP 04</div>
      <div class="step-title">Full Dataset Scanner</div>
      <div class="step-desc">Missing values, duplicates, type errors, outliers, format issues, bias, PII detection (Luhn check, email, phone, ID), data freshness.</div>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 05</div>
      <div class="step-title">Health Score + Trust Scores</div>
      <div class="step-desc">Six-dimensional score (0–100) plus individual column trust ratings. Filter columns below your trust threshold.</div>
      <span class="step-tag">PATENT-WORTHY</span>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">05</div>
      <div class="step-num">STEP 06</div>
      <div class="step-title">Risk & Severity Analyzer</div>
      <div class="step-desc">Every issue classified as Low / Medium / High. Full risk table with affected column, row count, severity badge, and recommended fix.</div>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 07</div>
      <div class="step-title">Visualisation Dashboard</div>
      <div class="step-desc">Missing value heatmap, outlier box plots, distribution histograms, categorical frequency, anomaly timeline for date columns.</div>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">07</div>
      <div class="step-num">STEP 08</div>
      <div class="step-title">Structure Map + Column Meanings</div>
      <div class="step-desc">DOB → Date of Birth. ZIP → Location Code. Correlation heatmap. Foreign key detection. Causal dependency mapping.</div>
      <span class="step-tag">NOVEL FEATURE</span>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 09</div>
      <div class="step-title">AI Story Narrator</div>
      <div class="step-desc">Plain-English story of your dataset using only real scan results. No invented facts. Simple language for non-technical users.</div>
      <span class="step-tag">AI POWERED</span>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">09</div>
      <div class="step-num">STEP 10</div>
      <div class="step-title">Smart Cleaning Suggestions</div>
      <div class="step-desc">Goal-aware recommendations per issue. Fill with median vs remove rows vs regression prediction — pros and risks explained.</div>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 11</div>
      <div class="step-title">What-If Simulator</div>
      <div class="step-desc">Toggle strategies before applying. Estimated health score, dataset size, and ML accuracy update instantly. Sampled for large datasets.</div>
      <span class="step-tag">INTERACTIVE</span>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">11</div>
      <div class="step-num">STEP 12</div>
      <div class="step-title">Cleaning Preview Confirmation</div>
      <div class="step-desc">User approves every sensitive action. Keep / Cap / Remove outliers. Zero row deletion without explicit confirmation.</div>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 13</div>
      <div class="step-title">Auto-Cleanse + Post-Clean Summary</div>
      <div class="step-desc">Fill missing, remove duplicates, fix types, normalise dates, convert word numbers. Immediate before/after comparison card.</div>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">13</div>
      <div class="step-num">STEP 14</div>
      <div class="step-title">PII Anonymisation</div>
      <div class="step-desc">Mask · Hash · Tokenise · Drop — per column. GDPR compliance status updated after each action.</div>
      <span class="step-tag">PRIVACY</span>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 15</div>
      <div class="step-title">Advanced Bias Detection</div>
      <div class="step-desc">Class imbalance, intersectional bias (Age + Gender combined), demographic parity score, equal opportunity score.</div>
      <span class="step-tag">AI ETHICS</span>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">15</div>
      <div class="step-num">STEP 16</div>
      <div class="step-title">Synthetic Data Generator</div>
      <div class="step-desc">Privacy-safe artificial dataset. User sets row count and differential privacy ε value. Quality validated via KS test and correlation comparison.</div>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 17</div>
      <div class="step-title">ML Performance Comparison</div>
      <div class="step-desc">Accuracy, Precision, Recall, F1 — raw vs clean vs synthetic. Feature importance chart shows which columns matter most after cleaning.</div>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">17</div>
      <div class="step-num">STEP 18</div>
      <div class="step-title">Compliance Report</div>
      <div class="step-desc">GDPR · HIPAA · ISO 8000 · EU AI Act. Each gap shows: Issue · Framework · Risk Level · Required Fix.</div>
      <span class="step-tag">ENTERPRISE</span>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 19</div>
      <div class="step-title">Reliability Certificate + Data Dictionary</div>
      <div class="step-desc">Downloadable PDF certificate. Full data dictionary with column meanings, trust scores, and cleaning actions taken.</div>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">19</div>
      <div class="step-num">STEP 20</div>
      <div class="step-title">Data Contract Generator</div>
      <div class="step-desc">YAML schema generated from clean data. All future uploads validated automatically against this contract. Zero code needed.</div>
      <span class="step-tag">PATENT-WORTHY</span>
    </div>

    <div class="workflow-step left">
      <div class="step-num">STEP 21</div>
      <div class="step-title">Export Cleaning Code</div>
      <div class="step-desc">Full Python (pandas) + R (tidyverse) scripts matching every cleaning action applied. Ready to run immediately.</div>
    </div>
    <div class="workflow-step right" style="position:relative">
      <div class="step-connector">21</div>
      <div class="step-num">STEP 22</div>
      <div class="step-title">Colab Notebook + Session Summary</div>
      <div class="step-desc">One-click Colab with AutoML. Final session summary screen with all 6 downloads. Option to re-upload and compare versions.</div>
    </div>

  </div>
</section>

<!-- CERTIFICATE PREVIEW -->
<section class="cert-section" id="certificate">
  <div style="text-align:center; margin-bottom: 48px;">
    <div class="section-label">Output</div>
    <h2 class="section-title">Dataset Reliability Certificate</h2>
    <p style="color: var(--text2); font-size: 14px; max-width: 500px; margin: 0 auto;">Every processed dataset receives a formal certificate documenting its quality, compliance status, and recommended use.</p>
  </div>

  <div class="cert-card">
    <div class="cert-header">
      <div>
        <div class="cert-title">VERITASDATA · DATA QUALITY PLATFORM</div>
        <div class="cert-name">Dataset Reliability Certificate</div>
      </div>
      <div class="cert-logo">◈</div>
    </div>
    <div class="cert-body">
      <div class="cert-score-row">
        <div>
          <div style="font-size:11px; color: var(--text3); font-family: var(--mono); margin-bottom: 4px;">OVERALL HEALTH SCORE</div>
          <div class="cert-score-big">87<span style="font-size:1.2rem; color: var(--text3);">/100</span></div>
        </div>
        <div class="cert-status">✓ SUITABLE FOR ML</div>
      </div>
      <div class="cert-rows">
        <div class="cert-row">
          <div class="cert-key">Completeness</div>
          <div class="cert-val green">High — 92%</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">Data Consistency</div>
          <div class="cert-val green">High — 88%</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">Bias Risk</div>
          <div class="cert-val amber">Medium — Review Gender column</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">PII Status</div>
          <div class="cert-val green">Cleared — All columns anonymised</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">GDPR Compliance</div>
          <div class="cert-val green">Passed</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">Duplicate Risk</div>
          <div class="cert-val green">Low — 0 duplicates remaining</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">Recommended Use</div>
          <div class="cert-val green">Machine Learning — Classification</div>
        </div>
        <div class="cert-row">
          <div class="cert-key">Certificate Date</div>
          <div class="cert-val" style="color: var(--text2);">14 March 2026</div>
        </div>
      </div>
    </div>
    <div class="cert-footer">
      <div class="cert-footer-text">VeritasData Platform · v2.0 · All processing performed locally</div>
      <button class="btn-primary" style="padding: 8px 20px; font-size: 12px;">⬇ Download PDF</button>
    </div>
  </div>
</section>

<!-- TECH STACK -->
<section class="tech-section">
  <div style="text-align:center; margin-bottom: 48px;">
    <div class="section-label">Architecture</div>
    <h2 class="section-title">Built on proven technology</h2>
  </div>
  <div class="tech-grid">
    <div class="tech-card">
      <div class="tech-icon">⬡</div>
      <div class="tech-name">React.js</div>
      <div class="tech-role">Frontend UI</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">△</div>
      <div class="tech-name">FastAPI</div>
      <div class="tech-role">Backend API</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">▦</div>
      <div class="tech-name">Pandas</div>
      <div class="tech-role">Data Engine</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">◉</div>
      <div class="tech-name">Scikit-learn</div>
      <div class="tech-role">ML Intelligence</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">◈</div>
      <div class="tech-name">Chart.js</div>
      <div class="tech-role">Visualisation</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">◫</div>
      <div class="tech-name">SDV Library</div>
      <div class="tech-role">Synthetic Data</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">✦</div>
      <div class="tech-name">NumPy</div>
      <div class="tech-role">Statistics</div>
    </div>
    <div class="tech-card">
      <div class="tech-icon">⊕</div>
      <div class="tech-name">Render.com</div>
      <div class="tech-role">Deployment</div>
    </div>
  </div>
</section>



<!-- CTA -->
<section class="cta-section">
  <div class="cta-glow"></div>
  <div class="section-label" style="position:relative">Get Started</div>
  <h2 style="position:relative">Your data deserves to be<br><span style="color: var(--teal);">verified.</span></h2>
  <p style="position:relative; max-width: 480px; margin: 0 auto 40px;">Upload your first dataset and see your quality score in under 30 seconds. No account required. All processing happens locally.</p>
  <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; position:relative;">
    <a href="#upload" class="btn-primary" style="font-size:15px; padding: 16px 36px;">◈ &nbsp;Analyse My Dataset</a>
    <a href="#workflow" class="btn-secondary" style="font-size:15px; padding: 16px 36px;">View Full Workflow</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-left">
    <div class="nav-logo-mark">◈</div>
    <div>
      <div style="font-size: 14px; font-weight: 700; color: var(--text);">VeritasData</div>
      <div class="footer-copy">Intelligent Data Quality Platform · v2.0</div>
    </div>
  </div>
  <div class="footer-links">
    <a href="#workflow">Workflow</a>
    <a href="#features">Features</a>
    <a href="#certificate">Certificate</a>
  </div>
  <div class="footer-copy">All data processed locally · 100% private · Open source</div>
</footer>

<script>
function selectGoal(el, goal) {
  document.querySelectorAll('.goal-card').forEach(c => {
    c.style.borderColor = 'var(--border)';
    c.style.background = 'var(--bg2)';
  });
  el.style.borderColor = 'var(--teal)';
  el.style.background = 'var(--teal-dim)';
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .workflow-step, .tech-card, .pipeline-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Upload drag and drop
const zone = document.querySelector('.upload-zone');
zone.addEventListener('dragover', e => {
  e.preventDefault();
  zone.style.borderColor = 'var(--teal)';
  zone.style.background = 'var(--teal-dim)';
});
zone.addEventListener('dragleave', () => {
  zone.style.borderColor = 'var(--border2)';
  zone.style.background = 'var(--bg2)';
});
zone.addEventListener('drop', e => {
  e.preventDefault();
  zone.style.borderColor = 'var(--teal)';
  const name = e.dataTransfer.files[0]?.name || '';
  if (name) {
    zone.querySelector('.upload-title').textContent = '✓ ' + name + ' — ready';
    zone.querySelector('.upload-sub').textContent = 'Select your goal below and click Analyse';
  }
});

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top  = e.clientY - 5 + 'px';
  ring.style.left   = e.clientX - 14 + 'px';
  ring.style.top    = e.clientY - 14 + 'px';
});

// ── FILE UPLOAD & ANALYSIS ENGINE ──
let uploadedData = null;
let selectedGoal = 'ML';
let cleanedRows = null;

const fileInput = document.getElementById('fileInput');
const uploadZone = document.getElementById('uploadZone');

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) handleFile(file);
});

uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.style.borderColor = 'var(--teal)';
  uploadZone.style.background = 'var(--teal-dim)';
});
uploadZone.addEventListener('dragleave', () => {
  uploadZone.style.borderColor = 'var(--border2)';
  uploadZone.style.background = 'var(--bg2)';
});
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

function handleFile(file) {
  uploadZone.style.borderColor = 'var(--teal)';
  document.getElementById('uploadTitle').textContent = '✓ ' + file.name;
  document.getElementById('uploadSub').textContent = 'File loaded — select your goal and click Begin Analysis';
  const name = file.name.toLowerCase();
  const isExcel = name.endsWith('.xlsx') || name.endsWith('.xls');
  const isJSON  = name.endsWith('.json');
  const isTSV   = name.endsWith('.tsv');

  const reader = new FileReader();

  if (isExcel) {
    reader.onload = function(e) {
      try {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
        if (!json.length) { alert('Excel sheet appears empty.'); return; }
        const headers = Object.keys(json[0]);
        const rows = json.map(r => {
          const row = {};
          headers.forEach(h => row[h] = r[h] !== undefined && r[h] !== null ? String(r[h]) : '');
          return row;
        });
        uploadedData = { headers, rows };
        document.getElementById('uploadSub').textContent = '✓ Excel loaded — ' + rows.length + ' rows · ' + headers.length + ' columns. Click Begin Analysis.';
      } catch(err) {
        alert('Could not read Excel file: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  } else if (isJSON) {
    reader.onload = function(e) {
      try {
        let json = JSON.parse(e.target.result);
        if (!Array.isArray(json)) json = Object.values(json).find(v => Array.isArray(v)) || [json];
        const headers = Object.keys(json[0]);
        const rows = json.map(r => {
          const row = {};
          headers.forEach(h => row[h] = r[h] !== undefined ? String(r[h]) : '');
          return row;
        });
        uploadedData = { headers, rows };
        document.getElementById('uploadSub').textContent = '✓ JSON loaded — ' + rows.length + ' rows. Click Begin Analysis.';
      } catch(err) { alert('Could not parse JSON: ' + err.message); }
    };
    reader.readAsText(file);
  } else {
    // CSV or TSV
    reader.onload = function(e) {
      const text = e.target.result;
      const sep = isTSV ? '\t' : detectSeparator(text);
      uploadedData = parseDelimited(text, sep);
      if (uploadedData) {
        document.getElementById('uploadSub').textContent = '✓ Loaded — ' + uploadedData.rows.length + ' rows · ' + uploadedData.headers.length + ' columns. Click Begin Analysis.';
      }
    };
    reader.readAsText(file);
  }
}

function detectSeparator(text) {
  const first = text.split('\n')[0];
  const commas = (first.match(/,/g)||[]).length;
  const semis  = (first.match(/;/g)||[]).length;
  const tabs   = (first.match(/\t/g)||[]).length;
  if (tabs > commas && tabs > semis) return '\t';
  if (semis > commas) return ';';
  return ',';
}

function parseDelimited(text, sep) {
  const lines = text.trim().split('\n').filter(l => l.trim());
  if (lines.length < 2) return null;
  const headers = splitLine(lines[0], sep).map(h => h.trim().replace(/^"|"$/g,''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = splitLine(lines[i], sep);
    const row = {};
    headers.forEach((h, j) => row[h] = vals[j] ? vals[j].trim().replace(/^"|"$/g,'') : '');
    rows.push(row);
  }
  return { headers, rows };
}

function splitLine(line, sep) {
  if (sep === '\t') return line.split('\t');
  const result = []; let cur = ''; let inQ = false;
  for (let c of line) {
    if (c === '"') { inQ = !inQ; }
    else if (c === sep && !inQ) { result.push(cur); cur = ''; }
    else cur += c;
  }
  result.push(cur);
  return result;
}

function isMissing(v) {
  return !v || ['','null','na','nan','n/a','none','undefined','-','nil'].includes(v.toString().trim().toLowerCase());
}

function detectType(vals) {
  const nonMiss = vals.filter(v => !isMissing(v));
  if (nonMiss.length === 0) return 'unknown';
  const numCount = nonMiss.filter(v => !isNaN(parseFloat(v)) && isFinite(v)).length;
  if (numCount > nonMiss.length * 0.7) return 'numeric';
  const dateRx = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$|^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/;
  if (nonMiss.filter(v => dateRx.test(v.trim())).length > nonMiss.length * 0.5) return 'date';
  return 'text';
}

function runAnalysis() {
  if (!uploadedData) {
    alert('Please upload a CSV file first by clicking the upload area.');
    return;
  }
  const { headers, rows } = uploadedData;
  const totalRows = rows.length;
  const totalCols = headers.length;

  // Per column stats
  const colStats = {};
  headers.forEach(h => {
    const vals = rows.map(r => r[h]);
    const missing = vals.filter(v => isMissing(v)).length;
    const nonMiss = vals.filter(v => !isMissing(v));
    const type = detectType(vals);
    const numVals = nonMiss.map(v => parseFloat(v)).filter(v => !isNaN(v));
    let median = null, mean = null;
    if (numVals.length) {
      const sorted = [...numVals].sort((a,b) => a-b);
      median = sorted[Math.floor(sorted.length/2)];
      mean = numVals.reduce((a,b) => a+b, 0) / numVals.length;
    }
    const unique = new Set(nonMiss).size;
    colStats[h] = { missing, missingPct: totalRows > 0 ? (missing/totalRows*100).toFixed(1) : 0,
      type, numVals, median, mean, unique,
      sample: nonMiss.slice(0,3).join(', ') || '—' };
  });

  // Duplicates
  const seen = new Set();
  let dups = 0;
  rows.forEach(r => {
    const key = JSON.stringify(r);
    if (seen.has(key)) dups++;
    else seen.add(key);
  });

  // Total missing
  let totalMissing = 0;
  headers.forEach(h => totalMissing += colStats[h].missing);

  // Score
  let penalty = 0;
  headers.forEach(h => {
    const s = colStats[h];
    penalty += (s.missing/Math.max(totalRows,1)) * 30;
  });
  penalty += (dups/Math.max(totalRows,1)) * 15;
  const n = headers.length;
  const score = Math.max(0, Math.min(100, Math.round(100 - (penalty/n))));
  const scoreAfter = Math.min(100, score + Math.round(penalty/n * 0.85));

  // ── Render KPIs ──
  document.getElementById('scoreNum').textContent = score;
  const sc = score >= 80 ? '#2dc8a0' : score >= 50 ? '#f0a030' : '#e05555';
  document.getElementById('scoreNum').style.color = sc;
  document.getElementById('scoreRing').style.borderColor = sc;
  document.getElementById('scoreLabel').textContent = score >= 80 ? 'Excellent Quality' : score >= 50 ? 'Needs Improvement' : 'Critical — Action Required';
  document.getElementById('scoreLabel').style.color = sc;
  document.getElementById('statRows').textContent = totalRows.toLocaleString();
  document.getElementById('statCols').textContent = totalCols;
  document.getElementById('statMissing').textContent = totalMissing;
  document.getElementById('statDups').textContent = dups;
  document.getElementById('resultsTitle').textContent = 'Analysis Complete — ' + totalRows + ' rows · ' + totalCols + ' columns';

  // ── Column Table ──
  const tbody = document.getElementById('colTableBody');
  tbody.innerHTML = '';
  headers.forEach(h => {
    const s = colStats[h];
    const missColor = s.missing > 0 ? '#e05555' : '#2dc8a0';
    const status = s.missing === 0 ? '<span style="color:#2dc8a0;font-weight:700;">✓ Clean</span>' :
      s.missingPct > 30 ? '<span style="color:#e05555;font-weight:700;">⚠ High Risk</span>' :
      '<span style="color:#f0a030;font-weight:700;">△ Review</span>';
    tbody.innerHTML += `<tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px 12px;font-weight:600;color:var(--text)">${h}</td>
      <td style="padding:10px 12px;font-family:var(--mono);font-size:11px;color:var(--teal)">${s.type.toUpperCase()}</td>
      <td style="padding:10px 12px;color:${missColor};font-family:var(--mono)">${s.missing} (${s.missingPct}%)</td>
      <td style="padding:10px 12px;color:var(--text2);font-size:11px;">${s.sample}</td>
      <td style="padding:10px 12px;">${status}</td>
    </tr>`;
  });

  // ── Raw Data Table ──
  renderTable('rawTable', headers, rows.slice(0,10), false);

  // ── Clean the data ──
  cleanedRows = rows.filter((r, i) => {
    const key = JSON.stringify(r);
    return rows.findIndex(x => JSON.stringify(x) === key) === i;
  }).map(r => {
    const clean = {...r};
    headers.forEach(h => {
      if (isMissing(clean[h])) {
        const s = colStats[h];
        if (s.type === 'numeric' && s.median !== null) clean[h] = s.median.toFixed(2);
        else {
          const nonMiss = rows.map(x => x[h]).filter(v => !isMissing(v));
          const freq = {};
          nonMiss.forEach(v => freq[v] = (freq[v]||0)+1);
          clean[h] = Object.keys(freq).sort((a,b) => freq[b]-freq[a])[0] || 'Unknown';
        }
      }
    });
    return clean;
  });

  // ── Cleaned Table ──
  renderTable('cleanTable', headers, cleanedRows.slice(0,10), true);

  // ── Before/After Stats ──
  const beforeEl = document.getElementById('beforeStats');
  const afterEl = document.getElementById('afterStats');
  const statRow = (label, val, col) =>
    `<div style="display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid var(--border);">
      <span style="color:var(--text2)">${label}</span>
      <span style="font-family:var(--mono);font-weight:700;color:${col}">${val}</span>
    </div>`;
  beforeEl.innerHTML =
    statRow('Total Rows', totalRows, 'var(--text)') +
    statRow('Missing Values', totalMissing, totalMissing > 0 ? '#e05555' : '#2dc8a0') +
    statRow('Duplicate Rows', dups, dups > 0 ? '#f0a030' : '#2dc8a0') +
    statRow('Health Score', score + ' / 100', score >= 80 ? '#2dc8a0' : score >= 50 ? '#f0a030' : '#e05555') +
    statRow('ML Accuracy (est.)', Math.round(60 + score*0.25) + '%', '#f0a030');
  afterEl.innerHTML =
    statRow('Total Rows', cleanedRows.length, 'var(--text)') +
    statRow('Missing Values', '0', '#2dc8a0') +
    statRow('Duplicate Rows', '0', '#2dc8a0') +
    statRow('Health Score', scoreAfter + ' / 100', '#2dc8a0') +
    statRow('ML Accuracy (est.)', Math.round(60 + scoreAfter*0.3) + '%', '#2dc8a0');

  const improvement = scoreAfter - score;
  document.getElementById('improvePct').textContent = '+' + improvement + ' points';
  setTimeout(() => {
    document.getElementById('improveBar').style.width = Math.min(100, improvement * 2.5) + '%';
  }, 300);

  // ── Issues List ──
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  headers.forEach(h => {
    const s = colStats[h];
    if (s.missing > 0) {
      const sev = s.missingPct > 30 ? ['HIGH','#e05555','#2d0a0a'] : ['MEDIUM','#f0a030','#2d1f0a'];
      issuesList.innerHTML += issueCard(sev[0], sev[1], sev[2], 'Missing Values', h,
        `${s.missing} of ${totalRows} rows (${s.missingPct}%) are empty.`,
        s.type === 'numeric' ? `Fill with median value (${s.median ? s.median.toFixed(2) : 'N/A'})` : 'Fill with most frequent value');
    }
  });
  if (dups > 0) issuesList.innerHTML += issueCard('LOW','#2dc8a0','#051a16','Duplicate Records','All columns',
    `${dups} exact duplicate rows detected.`, 'Remove duplicates — keep first occurrence');
  if (issuesList.innerHTML === '') issuesList.innerHTML =
    '<div style="color:#2dc8a0;font-weight:600;padding:12px;">✓ No major issues detected. Dataset is clean.</div>';

  // ── Download Button ──
  document.getElementById('downloadBtn').onclick = () => downloadCSV(cleanedRows, headers);

  // Show results & scroll
  document.getElementById('analysisResults').style.display = 'block';
  setTimeout(() => {
    document.getElementById('analysisResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function issueCard(sev, sevColor, bg, type, col, why, fix) {
  return `<div style="background:${bg};border:1px solid ${sevColor}22;border-left:3px solid ${sevColor};border-radius:10px;padding:16px 18px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <div style="font-weight:700;color:var(--text);font-size:14px;">${type}</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font-family:var(--mono);font-size:11px;color:var(--text3)">col: ${col}</span>
        <span style="background:${sevColor}22;color:${sevColor};border:1px solid ${sevColor}44;padding:2px 10px;border-radius:4px;font-size:10px;font-weight:700;">${sev}</span>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;">
        <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;">Issue</div>
        <div style="font-size:13px;color:var(--text2);">${why}</div>
      </div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;">
        <div style="font-size:10px;color:#2dc8a0;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;">Fix Applied</div>
        <div style="font-size:13px;color:var(--text2);">${fix}</div>
      </div>
    </div>
  </div>`;
}

function renderTable(id, headers, rows, isClean) {
  const table = document.getElementById(id);
  const headerColor = isClean ? '#2dc8a0' : 'var(--text3)';
  let html = `<thead><tr style="border-bottom:1px solid var(--border);">`;
  headers.forEach(h => {
    html += `<th style="text-align:left;padding:8px 10px;color:${headerColor};font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;">${h}</th>`;
  });
  html += '</tr></thead><tbody>';
  rows.forEach((r, i) => {
    html += `<tr style="border-bottom:1px solid var(--border);background:${i%2===0?'var(--bg)':'var(--bg2)'}">`;
    headers.forEach(h => {
      const v = r[h] || '';
      const isMiss = isMissing(v);
      html += `<td style="padding:8px 10px;font-family:var(--mono);font-size:11px;color:${isMiss ? '#e05555' : 'var(--text2)'};white-space:nowrap;">${isMiss ? 'MISSING' : v}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody>';
  table.innerHTML = html;
}

function downloadCSV(rows, headers) {
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => `"${r[h] || ''}"`).join(','))].join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'veritasdata_clean.csv';
  a.click();
}
</script>
</body>
</html>

