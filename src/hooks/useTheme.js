import { colors } from '../constants/theme';

export function useTheme(darkMode) {
  const theme = darkMode ? colors.dark : colors.light;

  return {
    bg: theme.bg,
    text: theme.text,
    muted: theme.muted,
    card: theme.card,
    border: theme.border,
    accent: colors.accent,
    accentHover: colors.accentHover,
    darkMode,
  };
}
