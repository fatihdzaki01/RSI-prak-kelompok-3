import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSI Kelompok 3 — Sistem Akademik",
  description: "Sistem Manajemen Akademik Mahasiswa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="layout-body">

        {/* ANIMATED BACKGROUND */}
        <div className="bg-canvas" aria-hidden="true">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-grid" />
        </div>

        {/* TOP NAVBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="brand-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <span className="brand-name">RSI Kelompok 3</span>
            <span className="brand-divider" />
            <nav className="top-nav">
              <a href="#" className="nav-item nav-item-active">Dashboard</a>
              <a href="#" className="nav-item">Mahasiswa</a>
              <a href="#" className="nav-item">Nilai</a>
              <a href="#" className="nav-item">Laporan</a>
            </nav>
          </div>
          <div className="topbar-right">
            <div className="breadcrumb">
              <span className="breadcrumb-root">Sistem Manajemen Akademik</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">Dashboard Mahasiswa</span>
            </div>
            <button className="icon-btn" aria-label="Notifikasi">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notif-dot" />
            </button>
            <div className="user-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="page-content">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="page-footer">
          <span>© {new Date().getFullYear()} RSI Kelompok 3</span>
          <span className="footer-sep">·</span>
          <span>Sistem Manajemen Akademik</span>
        </footer>

        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          :root {
            --bg-deep:    #0a0c14;
            --bg-surface: #0f1320;
            --bg-card:    #141828;
            --bg-hover:   #1a2035;
            --border:     rgba(255,255,255,0.07);
            --border-lg:  rgba(255,255,255,0.12);
            --accent:     #4f8eff;
            --accent-dim: rgba(79,142,255,0.15);
            --cyan:       #00d4c8;
            --text-1: #f0f2f8;
            --text-2: #8b92ae;
            --text-3: #525a75;
            --font: 'Sora', system-ui, sans-serif;
            --mono: 'DM Mono', monospace;
            --topbar-h: 48px;
            --radius: 12px;
            --radius-sm: 8px;
          }

          .layout-body {
            font-family: var(--font);
            background: var(--bg-deep);
            color: var(--text-1);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow-x: hidden;
            font-size: 13px;
          }

          /* BACKGROUND */
          .bg-canvas {
            position: fixed; inset: 0; z-index: 0;
            pointer-events: none; overflow: hidden;
          }
          .bg-orb {
            position: absolute; border-radius: 50%;
            filter: blur(80px); opacity: 0.18;
            animation: orb-drift 18s ease-in-out infinite alternate;
          }
          .bg-orb-1 { width:600px;height:600px;background:radial-gradient(circle,#4f8eff,transparent);top:-150px;left:-100px;animation-delay:0s; }
          .bg-orb-2 { width:500px;height:500px;background:radial-gradient(circle,#00d4c8,transparent);bottom:-100px;right:-80px;animation-delay:-6s; }
          .bg-orb-3 { width:400px;height:400px;background:radial-gradient(circle,#8b5cf6,transparent);top:40%;left:45%;animation-delay:-12s;opacity:0.1; }
          .bg-grid {
            position: absolute; inset: 0;
            background-image: linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
            background-size: 48px 48px;
          }
          @keyframes orb-drift {
            from { transform: translate(0,0) scale(1); }
            to   { transform: translate(40px,30px) scale(1.08); }
          }

          /* TOPBAR */
          .topbar {
            height: var(--topbar-h);
            background: rgba(15,19,32,0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24px;
            position: sticky;
            top: 0;
            z-index: 50;
          }
          .topbar-left  { display: flex; align-items: center; gap: 14px; }
          .topbar-right { display: flex; align-items: center; gap: 10px; }

          .brand-icon {
            width: 30px; height: 30px;
            border-radius: 7px;
            background: var(--accent-dim);
            border: 1px solid rgba(79,142,255,0.3);
            display: flex; align-items: center; justify-content: center;
            color: var(--accent);
            flex-shrink: 0;
          }
          .brand-name {
            font-size: 12.5px;
            font-weight: 600;
            color: var(--text-1);
            letter-spacing: 0.01em;
            white-space: nowrap;
          }
          .brand-divider {
            width: 1px; height: 16px;
            background: var(--border-lg);
            flex-shrink: 0;
          }

          .top-nav { display: flex; align-items: center; gap: 2px; }
          .nav-item {
            display: flex; align-items: center;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 400;
            color: var(--text-2);
            text-decoration: none;
            transition: all 0.15s ease;
            border: 1px solid transparent;
            white-space: nowrap;
          }
          .nav-item:hover { background: var(--bg-hover); color: var(--text-1); border-color: var(--border); }
          .nav-item-active { background: var(--accent-dim); color: #7aaeff; border-color: rgba(79,142,255,0.25); font-weight: 500; }

          .breadcrumb { display: flex; align-items: center; gap: 6px; }
          .breadcrumb-root    { font-size: 11px; color: var(--text-3); font-family: var(--mono); }
          .breadcrumb-sep     { font-size: 11px; color: var(--text-3); }
          .breadcrumb-current { font-size: 11px; color: var(--text-2); font-family: var(--mono); }

          .icon-btn {
            width: 30px; height: 30px;
            border: 1px solid var(--border);
            border-radius: 6px;
            background: transparent;
            color: var(--text-2);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            transition: all 0.15s ease;
            position: relative;
          }
          .icon-btn:hover { background: var(--bg-hover); border-color: var(--border-lg); color: var(--text-1); }
          .notif-dot {
            position: absolute; top: 6px; right: 6px;
            width: 5px; height: 5px;
            border-radius: 50%; background: var(--accent);
            border: 1.5px solid var(--bg-surface);
          }

          .user-chip {
            display: flex; align-items: center; gap: 6px;
            padding: 5px 10px;
            border-radius: 6px;
            border: 1px solid var(--border);
            font-size: 11.5px;
            color: var(--text-2);
            font-family: var(--mono);
          }

          /* PAGE CONTENT */
          .page-content {
            flex: 1;
            padding: 28px 32px;
            position: relative;
            z-index: 1;
          }

          /* FOOTER */
          .page-footer {
            padding: 12px 32px;
            border-top: 1px solid var(--border);
            font-size: 11px;
            color: var(--text-3);
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--mono);
            position: relative;
            z-index: 1;
          }
          .footer-sep { color: var(--border-lg); }

          @media (max-width: 768px) {
            .breadcrumb { display: none; }
            .top-nav { display: none; }
            .page-content { padding: 16px; }
          }
        `}</style>

      </body>
    </html>
  );
}