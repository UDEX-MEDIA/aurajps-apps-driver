// AuraJPS Driver App — Theme & Shared Components

const T = {
  navyDark:   '#0A1628',
  navyMid:    '#0F2044',
  navyCard:   '#152855',
  navyBorder: '#1E3A6B',
  blue:       '#1A6ED4',
  cyan:       '#00AAFF',
  cyanLight:  '#40C4FF',
  white:      '#FFFFFF',
  muted:      '#7A9CC5',
  mutedDark:  '#3D5A84',
  success:    '#22C55E',
  successBg:  '#052E16',
  warning:    '#F59E0B',
  warningBg:  '#2D1B00',
  danger:     '#EF4444',
  dangerBg:   '#2D0A0A',
  pending:    '#8B5CF6',
  pendingBg:  '#1A0A3D',
};

const F = {
  family: "'Barlow', 'Roboto', system-ui, sans-serif",
  mono: "'Roboto Mono', monospace",
};

// ── Icon helper (Material Symbols Rounded) ───────────────────
function Icon({ n, size=20, color='currentColor', style={} }) {
  return <span className="ms" style={{fontSize:size,color,lineHeight:1,flexShrink:0,...style}}>{n}</span>;
}

// ── Shared small components ─────────────────────────────────

function AppHeader({ title, subtitle, onBack, rightEl, dark = true }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px 10px',
      background: dark ? T.navyMid : T.navyDark,
      borderBottom: `1px solid ${T.navyBorder}`,
      minHeight: 56,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 8,
          background: T.navyCard, border: 'none',
          color: T.white, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}><Icon n="chevron_left" size={22} color={T.white}/></button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: F.family, fontWeight: 700, fontSize: 18, color: T.white, lineHeight: 1.2 }}>{title}</div>
        {subtitle && <div style={{ fontFamily: F.family, fontSize: 12, color: T.muted, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {rightEl}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending:    { label: 'Pending',    bg: T.pendingBg, color: T.pending,  dot: T.pending },
    pickup:     { label: 'Pickup',     bg: T.warningBg, color: T.warning,  dot: T.warning },
    transit:    { label: 'In Transit', bg: '#0A1A3D',   color: T.cyan,     dot: T.cyan },
    delivered:  { label: 'Delivered',  bg: T.successBg, color: T.success,  dot: T.success },
    failed:     { label: 'Failed',     bg: T.dangerBg,  color: T.danger,   dot: T.danger },
  };
  const s = map[status] || map.pending;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.color,
      borderRadius: 20, padding: '3px 10px',
      fontSize: 11, fontWeight: 700, fontFamily: F.family,
      textTransform: 'uppercase', letterSpacing: 0.5,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {s.label}
    </div>
  );
}

function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: T.navyCard,
      border: `1px solid ${T.navyBorder}`,
      borderRadius: 12,
      padding: '14px 16px',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>
      {children}
    </div>
  );
}

function BigButton({ label, sublabel, color = T.cyan, bg, icon, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '16px',
      background: bg || `${color}22`,
      border: `1.5px solid ${color}55`,
      borderRadius: 14, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14,
      textAlign: 'left', ...style,
    }}>
      {icon && <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: `${color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{icon}</div>}
      <div>
        <div style={{ fontFamily: F.family, fontSize: 16, fontWeight: 700, color: T.white }}>{label}</div>
        {sublabel && <div style={{ fontFamily: F.family, fontSize: 12, color: T.muted, marginTop: 2 }}>{sublabel}</div>}
      </div>
    </button>
  );
}

function BottomNav({ active, onNav }) {
  const items = [
    { id: 'dashboard',  icon: 'home',                    label: 'Home' },
    { id: 'deliveries', icon: 'package_2',               label: 'Delivery' },
    { id: 'scanner',    icon: 'qr_code_scanner',         label: 'Scan' },
    { id: 'expense',    icon: 'account_balance_wallet',  label: 'Expense' },
    { id: 'profile',    icon: 'person',                  label: 'Profil' },
  ];
  return (
    <div style={{
      display: 'flex', background: T.navyMid,
      borderTop: `1px solid ${T.navyBorder}`,
      padding: '6px 0 2px',
    }}>
      {items.map(it => (
        <button key={it.id} onClick={() => onNav(it.id)} style={{
          flex: 1, border: 'none', background: 'none',
          cursor: 'pointer', padding: '6px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        }}>
          <Icon n={it.icon} size={22} color={active === it.id ? T.cyan : T.mutedDark} />
          <div style={{
            fontFamily: F.family, fontSize: 10, fontWeight: 600,
            color: active === it.id ? T.cyan : T.mutedDark,
            textTransform: 'uppercase', letterSpacing: 0.5,
          }}>{it.label}</div>
          {active === it.id && (
            <div style={{ width: 20, height: 2, borderRadius: 1, background: T.cyan }} />
          )}
        </button>
      ))}
    </div>
  );
}

function SyncIndicator({ synced }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      background: synced ? T.successBg : T.warningBg,
      border: `1px solid ${synced ? T.success : T.warning}44`,
      borderRadius: 20, padding: '4px 10px',
    }}>
      <Icon n={synced ? 'cloud_done' : 'wifi_off'} size={14} color={synced ? T.success : T.warning} />
      <span style={{ fontFamily: F.family, fontSize: 11, fontWeight: 600, color: synced ? T.success : T.warning }}>
        {synced ? 'Synced' : 'Offline'}
      </span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: T.navyBorder, margin: '4px 0' }} />;
}

Object.assign(window, { T, F, Icon, AppHeader, StatusBadge, Card, BigButton, BottomNav, SyncIndicator, Divider });
