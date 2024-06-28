const baseTheme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      sm: 'var(--screen-sm)',
      md: 'var(--screen-md)',
      lg: 'var(--screen-lg)',
      xl: 'var(--screen-xl)',
      '2xl': 'var(--screen-2xl)',
    },
  },
  extend: {
    colors: {
      primary: {
        DEFAULT: 'var(--color-primary)',
        foreground: 'var(--color-primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--color-secondary)',
        foreground: 'var(--color-secondary-foreground)',
      },
      tertiary: {
        DEFAULT: 'var(--color-tertiary)',
        foreground: 'var(--color-tertiary-foreground)',
      },
    },
    borderWidth: {
      xs: 'var(--border-width-xs)',
      sm: `var(--border-width-sm)`,
      md: `var(--border-width-md)`,
      lg: `var(--border-width-lg)`,
      xl: 'var(--border-width-xl)',
    },
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: `var(--spacing-sm)`,
      md: `var(--spacing-md)`,
      lg: `var(--spacing-lg)`,
      xl: 'var(--spacing-xl)',
    },
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: `var(--font-size-sm)`,
      md: `var(--font-size-md)`,
      lg: `var(--font-size-lg)`,
      xl: 'var(--font-size-xl)',
      xl2: 'var(--font-size-xl2)',
      xl3: 'var(--font-size-xl3)',
      xl4: 'var(--font-size-xl4)',
    },
    lineHeight: {
      xs: 'var(--line-height-xs)',
      sm: 'var(--line-height-sm)',
      md: `var(--line-height-md)`,
      lg: `var(--line-height-lg)`,
      xl: 'var(--line-height-xl)',
    },
  },
};

module.exports = { baseTheme };
