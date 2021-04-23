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
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
