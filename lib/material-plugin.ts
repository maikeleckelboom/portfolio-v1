import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

export const materialPlugin = plugin(
  ({ addBase, addUtilities }) => {
    addBase({
      // Must be disabled for dark-mode toggle animation to work.
      /*
      ":root": {
        "--md-sys-color-primary-rgb": "177 198 255",
        "--md-sys-color-on-primary-rgb": "0 44 112",
        "--md-sys-color-primary-container-rgb": "0 65 157",
        "--md-sys-color-on-primary-container-rgb": "217 226 255",
        "--md-sys-color-secondary-rgb": "192 198 220",
        "--md-sys-color-on-secondary-rgb": "42 48 66",
        "--md-sys-color-secondary-container-rgb": "64 70 89",
        "--md-sys-color-on-secondary-container-rgb": "220 226 249",
        "--md-sys-color-tertiary-rgb": "224 187 221",
        "--md-sys-color-on-tertiary-rgb": "65 39 66",
        "--md-sys-color-tertiary-container-rgb": "89 61 89",
        "--md-sys-color-on-tertiary-container-rgb": "253 215 250",
        "--md-sys-color-error-rgb": "255 180 171",
        "--md-sys-color-on-error-rgb": "105 0 5",
        "--md-sys-color-error-container-rgb": "147 0 10",
        "--md-sys-color-on-error-container-rgb": "255 180 171",
        "--md-sys-color-background-rgb": "27 27 31",
        "--md-sys-color-on-background-rgb": "227 226 230",
        "--md-sys-color-surface-rgb": "27 27 31",
        "--md-sys-color-on-surface-rgb": "227 226 230",
        "--md-sys-color-surface-variant-rgb": "68 70 79",
        "--md-sys-color-on-surface-variant-rgb": "197 198 208",
        "--md-sys-color-outline-rgb": "143 144 153",
        "--md-sys-color-outline-variant-rgb": "68 70 79",
        "--md-sys-color-shadow-rgb": "0 0 0",
        "--md-sys-color-scrim-rgb": "0 0 0",
        "--md-sys-color-inverse-surface-rgb": "227 226 230",
        "--md-sys-color-inverse-on-surface-rgb": "48 48 52",
        "--md-sys-color-inverse-primary-rgb": "0 87 205",
        "--md-sys-color-primary-light-rgb": "0 87 205",
        "--md-sys-color-on-primary-light-rgb": "255 255 255",
        "--md-sys-color-primary-container-light-rgb": "217 226 255",
        "--md-sys-color-on-primary-container-light-rgb": "0 25 70",
        "--md-sys-color-secondary-light-rgb": "88 94 113",
        "--md-sys-color-on-secondary-light-rgb": "255 255 255",
        "--md-sys-color-secondary-container-light-rgb": "220 226 249",
        "--md-sys-color-on-secondary-container-light-rgb": "21 27 44",
        "--md-sys-color-tertiary-light-rgb": "114 85 114",
        "--md-sys-color-on-tertiary-light-rgb": "255 255 255",
        "--md-sys-color-tertiary-container-light-rgb": "253 215 250",
        "--md-sys-color-on-tertiary-container-light-rgb": "42 18 44",
        "--md-sys-color-error-light-rgb": "186 26 26",
        "--md-sys-color-on-error-light-rgb": "255 255 255",
        "--md-sys-color-error-container-light-rgb": "255 218 214",
        "--md-sys-color-on-error-container-light-rgb": "65 0 2",
        "--md-sys-color-background-light-rgb": "254 251 255",
        "--md-sys-color-on-background-light-rgb": "27 27 31",
        "--md-sys-color-surface-light-rgb": "254 251 255",
        "--md-sys-color-on-surface-light-rgb": "27 27 31",
        "--md-sys-color-surface-variant-light-rgb": "225 226 236",
        "--md-sys-color-on-surface-variant-light-rgb": "68 70 79",
        "--md-sys-color-outline-light-rgb": "117 119 128",
        "--md-sys-color-outline-variant-light-rgb": "197 198 208",
        "--md-sys-color-shadow-light-rgb": "0 0 0",
        "--md-sys-color-scrim-light-rgb": "0 0 0",
        "--md-sys-color-inverse-surface-light-rgb": "48 48 52",
        "--md-sys-color-inverse-on-surface-light-rgb": "242 240 244",
        "--md-sys-color-inverse-primary-light-rgb": "177 198 255",
        "--md-sys-color-primary-dark-rgb": "177 198 255",
        "--md-sys-color-on-primary-dark-rgb": "0 44 112",
        "--md-sys-color-primary-container-dark-rgb": "0 65 157",
        "--md-sys-color-on-primary-container-dark-rgb": "217 226 255",
        "--md-sys-color-secondary-dark-rgb": "192 198 220",
        "--md-sys-color-on-secondary-dark-rgb": "42 48 66",
        "--md-sys-color-secondary-container-dark-rgb": "64 70 89",
        "--md-sys-color-on-secondary-container-dark-rgb": "220 226 249",
        "--md-sys-color-tertiary-dark-rgb": "224 187 221",
        "--md-sys-color-on-tertiary-dark-rgb": "65 39 66",
        "--md-sys-color-tertiary-container-dark-rgb": "89 61 89",
        "--md-sys-color-on-tertiary-container-dark-rgb": "253 215 250",
        "--md-sys-color-error-dark-rgb": "255 180 171",
        "--md-sys-color-on-error-dark-rgb": "105 0 5",
        "--md-sys-color-error-container-dark-rgb": "147 0 10",
        "--md-sys-color-on-error-container-dark-rgb": "255 180 171",
        "--md-sys-color-background-dark-rgb": "27 27 31",
        "--md-sys-color-on-background-dark-rgb": "227 226 230",
        "--md-sys-color-surface-dark-rgb": "27 27 31",
        "--md-sys-color-on-surface-dark-rgb": "227 226 230",
        "--md-sys-color-surface-variant-dark-rgb": "68 70 79",
        "--md-sys-color-on-surface-variant-dark-rgb": "197 198 208",
        "--md-sys-color-outline-dark-rgb": "143 144 153",
        "--md-sys-color-outline-variant-dark-rgb": "68 70 79",
        "--md-sys-color-shadow-dark-rgb": "0 0 0",
        "--md-sys-color-scrim-dark-rgb": "0 0 0",
        "--md-sys-color-inverse-surface-dark-rgb": "227 226 230",
        "--md-sys-color-inverse-on-surface-dark-rgb": "48 48 52",
        "--md-sys-color-inverse-primary-dark-rgb": "0 87 205",
        "--md-sys-color-surface-dim-rgb": "19 19 23",
        "--md-sys-color-surface-bright-rgb": "57 57 61",
        "--md-sys-color-surface-container-lowest-rgb": "14 14 18",
        "--md-sys-color-surface-container-low-rgb": "27 27 31",
        "--md-sys-color-surface-container-rgb": "31 31 35",
        "--md-sys-color-surface-container-high-rgb": "42 42 46",
        "--md-sys-color-surface-container-highest-rgb": "53 52 57",
        "--md-sys-color-surface-dim-light-rgb": "220 217 221",
        "--md-sys-color-surface-bright-light-rgb": "251 248 252",
        "--md-sys-color-surface-container-lowest-light-rgb": "255 255 255",
        "--md-sys-color-surface-container-low-light-rgb": "245 243 247",
        "--md-sys-color-surface-container-light-rgb": "240 237 241",
        "--md-sys-color-surface-container-high-light-rgb": "234 231 235",
        "--md-sys-color-surface-container-highest-light-rgb": "228 225 229",
        "--md-sys-color-surface-dim-dark-rgb": "19 19 23",
        "--md-sys-color-surface-bright-dark-rgb": "57 57 61",
        "--md-sys-color-surface-container-lowest-dark-rgb": "14 14 18",
        "--md-sys-color-surface-container-low-dark-rgb": "27 27 31",
        "--md-sys-color-surface-container-dark-rgb": "31 31 35",
        "--md-sys-color-surface-container-high-dark-rgb": "42 42 46",
        "--md-sys-color-surface-container-highest-dark-rgb": "53 52 57"
      }
    */
    })
    addUtilities({
      '.native-touch': {
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none'
      },
      '.m-scrollbar': {
        '@apply scrollbar-thin scrollbar-track-surface-variant scrollbar-thumb-on-surface-variant scrollbar-w-2':
          {}
      }
    })
    addBase({
      '*': {
        '@apply border-outline-variant': {}
      },
      body: {
        '@apply antialiased native-touch bg-background text-on-background text-body-medium':
          {},
        '@apply overflow-x-hidden overflow-y-auto m-scrollbar': {}
      },
      '.icon': {
        '@apply h-6 w-6 text-on-surface': {}
      },
      a: {
        '@apply text-primary': {}
      }
    })
  },
  {
    theme: {
      fontFamily: {
        sans: ['OpenSans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--md-sys-color-primary-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-primary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-primary-dark-rgb) / <alpha-value>)'
        },
        'on-primary': {
          DEFAULT: 'rgb(var(--md-sys-color-on-primary-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-primary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-primary-dark-rgb) / <alpha-value>)'
        },
        'primary-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-primary-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-primary-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-primary-container-dark-rgb) / <alpha-value>)'
        },
        'on-primary-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-on-primary-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-primary-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-primary-container-dark-rgb) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'rgb(var(--md-sys-color-secondary-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-secondary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-secondary-dark-rgb) / <alpha-value>)'
        },
        'on-secondary': {
          DEFAULT: 'rgb(var(--md-sys-color-on-secondary-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-secondary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-secondary-dark-rgb) / <alpha-value>)'
        },
        'secondary-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-secondary-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-secondary-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-secondary-container-dark-rgb) / <alpha-value>)'
        },
        'on-secondary-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-on-secondary-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-secondary-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-secondary-container-dark-rgb) / <alpha-value>)'
        },
        tertiary: {
          DEFAULT: 'rgb(var(--md-sys-color-tertiary-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-tertiary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-tertiary-dark-rgb) / <alpha-value>)'
        },
        'on-tertiary': {
          DEFAULT: 'rgb(var(--md-sys-color-on-tertiary-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-tertiary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-tertiary-dark-rgb) / <alpha-value>)'
        },
        'tertiary-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-tertiary-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-tertiary-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-tertiary-container-dark-rgb) / <alpha-value>)'
        },
        'on-tertiary-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-on-tertiary-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-tertiary-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-tertiary-container-dark-rgb) / <alpha-value>)'
        },
        surface: {
          DEFAULT: 'rgb(var(--md-sys-color-surface-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-surface-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-dark-rgb) / <alpha-value>)'
        },
        'on-surface': {
          DEFAULT: 'rgb(var(--md-sys-color-on-surface-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-surface-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-surface-dark-rgb) / <alpha-value>)'
        },
        background: {
          DEFAULT: 'rgb(var(--md-sys-color-background-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-background-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-background-dark-rgb) / <alpha-value>)'
        },
        'on-background': {
          DEFAULT: 'rgb(var(--md-sys-color-on-background-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-background-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-background-dark-rgb) / <alpha-value>)'
        },
        'surface-variant': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-variant-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-variant-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-variant-dark-rgb) / <alpha-value>)'
        },
        'on-surface-variant': {
          DEFAULT:
            'rgb(var(--md-sys-color-on-surface-variant-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-surface-variant-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-surface-variant-dark-rgb) / <alpha-value>)'
        },
        error: {
          DEFAULT: 'rgb(var(--md-sys-color-error-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-error-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-error-dark-rgb) / <alpha-value>)'
        },
        'on-error': {
          DEFAULT: 'rgb(var(--md-sys-color-on-error-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-on-error-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-error-dark-rgb) / <alpha-value>)'
        },
        'error-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-error-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-error-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-error-container-dark-rgb) / <alpha-value>)'
        },
        'on-error-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-on-error-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-error-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-error-container-dark-rgb) / <alpha-value>)'
        },
        'inverse-primary': {
          DEFAULT:
            'rgb(var(--md-sys-color-inverse-primary-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-inverse-primary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-inverse-primary-dark-rgb) / <alpha-value>)'
        },
        'on-inverse-primary': {
          DEFAULT:
            'rgb(var(--md-sys-color-on-inverse-primary-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-on-inverse-primary-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-on-inverse-primary-dark-rgb) / <alpha-value>)'
        },
        outline: {
          DEFAULT: 'rgb(var(--md-sys-color-outline-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-outline-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-outline-dark-rgb) / <alpha-value>)'
        },
        'outline-variant': {
          DEFAULT:
            'rgb(var(--md-sys-color-outline-variant-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-outline-variant-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-outline-variant-dark-rgb) / <alpha-value>)'
        },
        scrim: {
          DEFAULT: 'rgb(var(--md-sys-color-scrim-rgb) / <alpha-value>)',
          light: 'rgb(var(--md-sys-color-scrim-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-scrim-dark-rgb) / <alpha-value>)'
        },
        'primary-fixed': 'var(--md-sys-color-primary-fixed)',
        'on-primary-fixed': 'var(--md-sys-color-on-primary-fixed)',
        'secondary-fixed': 'var(--md-sys-color-secondary-fixed)',
        'on-secondary-fixed': 'var(--md-sys-color-on-secondary-fixed)',
        'tertiary-fixed': 'var(--md-sys-color-tertiary-fixed)',
        'on-tertiary-fixed': 'var(--md-sys-color-on-tertiary-fixed)',
        'surface-level-1': {
          DEFAULT: 'var(--md-sys-color-surface-level1)',
          light: 'var(--md-sys-color-surface-level1-light)',
          dark: 'var(--md-sys-color-surface-level1-dark)'
        },
        'surface-level-2': {
          DEFAULT: 'var(--md-sys-color-surface-level2)',
          light: 'var(--md-sys-color-surface-level2-light)',
          dark: 'var(--md-sys-color-surface-level2-dark)'
        },
        'surface-level-3': {
          DEFAULT: 'var(--md-sys-color-surface-level3)',
          light: 'var(--md-sys-color-surface-level3-light)',
          dark: 'var(--md-sys-color-surface-level3-dark)'
        },
        'surface-level-4': {
          DEFAULT: 'var(--md-sys-color-surface-level4)',
          light: 'var(--md-sys-color-surface-level4-light)',
          dark: 'var(--md-sys-color-surface-level4-dark)'
        },
        'surface-level-5': {
          DEFAULT: 'var(--md-sys-color-surface-level5)',
          light: 'var(--md-sys-color-surface-level5-light)',
          dark: 'var(--md-sys-color-surface-level5-dark)'
        },
        'surface-dim': {
          DEFAULT: 'rgb(var(--md-sys-color-surface-dim-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-dim-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-dim-dark-rgb) / <alpha-value>)'
        },
        'surface-bright': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-bright-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-bright-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-bright-dark-rgb) / <alpha-value>)'
        },
        'surface-container-lowest': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-container-lowest-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-container-lowest-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-container-lowest-dark-rgb) / <alpha-value>)'
        },
        'surface-container-low': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-container-low-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-container-low-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-container-low-dark-rgb) / <alpha-value>)'
        },
        'surface-container': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-container-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-container-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-container-dark-rgb) / <alpha-value>)'
        },
        'surface-container-high': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-container-high-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-container-high-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-container-high-dark-rgb) / <alpha-value>)'
        },
        'surface-container-highest': {
          DEFAULT:
            'rgb(var(--md-sys-color-surface-container-highest-rgb) / <alpha-value>)',
          light:
            'rgb(var(--md-sys-color-surface-container-highest-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--md-sys-color-surface-container-highest-dark-rgb) / <alpha-value>)'
        },

        transparent: 'transparent',
        current: 'currentColor',
        inherit: 'inherit'
      },
      extend: {
        minWidth: {
          'd-screen': '100dvw',
          'd-screen-1/2': '50dvw'
        },
        maxWidth: {
          'd-screen': '100dvw',
          'd-screen-1/2': '50dvw'
        },
        width: {
          'd-screen': '100dvw'
        },
        height: {
          'd-screen': '100dvh'
        },
        screens: {
          compact: '0px',
          medium: '640px',
          expanded: '840px'
        },
        borderWidth: {
          thin: 'thin',
          '1': '1px'
        },
        fontSize: {
          'display-large': [
            '57px',
            {
              letterSpacing: '-0.25px',
              lineHeight: '64px',
              fontWeight: '400'
            }
          ],
          'display-medium': [
            '45px',
            {
              letterSpacing: '0px',
              lineHeight: '52px',
              fontWeight: '400'
            }
          ],
          'display-small': [
            '36px',
            {
              letterSpacing: '0px',
              lineHeight: '44px',
              fontWeight: '400'
            }
          ],

          'headline-large': [
            '32px',
            {
              letterSpacing: '0px',
              lineHeight: '40px',
              fontWeight: '400'
            }
          ],
          'headline-medium': [
            '28px',
            {
              letterSpacing: '0px',
              lineHeight: '36px',
              fontWeight: '400'
            }
          ],
          'headline-small': [
            '24px',
            {
              letterSpacing: '0px',
              lineHeight: '32px',
              fontWeight: '400'
            }
          ],
          'title-large': [
            '22px',
            {
              letterSpacing: '0px',
              lineHeight: '28px',
              fontWeight: '400'
            }
          ],
          'title-medium': [
            '16px',
            {
              letterSpacing: '0.15000000596046448px',
              lineHeight: '24px',
              fontWeight: '500'
            }
          ],
          'title-small': [
            '14px',
            {
              letterSpacing: '0.10000000149011612px',
              lineHeight: '20px',
              fontWeight: '500'
            }
          ],
          'label-large': [
            '14px',
            {
              letterSpacing: '0.10000000149011612px',
              lineHeight: '20px',
              fontWeight: '500'
            }
          ],
          'label-medium': [
            '12px',
            {
              letterSpacing: '0.5px',
              lineHeight: '16px',
              fontWeight: '500'
            }
          ],
          'label-small': [
            '11px',
            {
              letterSpacing: '0.5px',
              lineHeight: '16px',
              fontWeight: '500'
            }
          ],
          'body-large': [
            '16px',
            {
              letterSpacing: '0.5px',
              lineHeight: '24px',
              fontWeight: '400'
            }
          ],
          'body-medium': [
            '14px',
            {
              letterSpacing: '0.25px',
              lineHeight: '20px',
              fontWeight: '400'
            }
          ],
          'body-small': [
            '12px',
            {
              letterSpacing: '0.4000000059604645px;',
              lineHeight: '16px',
              fontWeight: '400'
            }
          ]
        }
      }
    }
  }
)
