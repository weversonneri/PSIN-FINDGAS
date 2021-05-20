module.exports = {
  purge: [
    './public/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['inter', 'ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['Open Sans'],
      title: ['Inter', 'sans-serif'],
    },
    fill: (theme) => ({
      red: theme('colors.red.500'),
      green: theme('colors.green.500'),
      blue: theme('colors.blue.500'),
    }),
    extend: {},
  },
  variants: {
    extend: {
      fill: ['hover', 'focus'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
