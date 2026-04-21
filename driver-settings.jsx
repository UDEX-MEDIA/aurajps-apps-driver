// Screens 6: Settings

function SettingsScreen({ onBack, onToggleTheme, theme }) {
  const isDark = theme === 'dark';

  const settingItems = [
    {
      id: 'theme',
      label: 'Theme',
      icon: 'contrast',
      action: onToggleTheme,
      value: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon n={isDark ? 'dark_mode' : 'light_mode'} size={18} color={T.muted} />
          <span style={{ fontFamily: F.family, fontSize: 14, color: T.white }}>
            {isDark ? 'Dark' : 'Light'}
          </span>
        </div>
      ),
    },
    { id: 'language', label: 'Language', icon: 'translate', value: 'English' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', value: 'On' },
    { id: 'account', label: 'Account', icon: 'account_circle', value: 'Ahmad Faizal' },
    { id: 'logout', label: 'Logout', icon: 'logout', danger: true },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.navyDark }}>
      <AppHeader title="Settings" onBack={onBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
        <Card>
          {settingItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <div
                onClick={item.action}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 0',
                  cursor: item.action ? 'pointer' : 'default',
                }}
              >
                <Icon n={item.icon} size={20} color={item.danger ? T.danger : T.muted} />
                <div
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    fontFamily: F.family,
                    fontSize: 15,
                    fontWeight: 600,
                    color: item.danger ? T.danger : T.white,
                  }}
                >
                  {item.label}
                </div>
                {typeof item.value === 'string' ? (
                  <span style={{ fontFamily: F.family, fontSize: 14, color: T.muted }}>
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
                {item.action && <Icon n="chevron_right" size={20} color={T.muted} />}
              </div>
              {index < settingItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>
      </div>
    </div>
  );
}