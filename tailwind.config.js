module.exports = {
  purge: [
    './src/app/views/**/*.ejs',
    './public/scripts/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Ubuntu', 'ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['inter', 'ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['Open Sans'],
      title: ['Inter', 'sans-serif'],
    },
    fill: {
      current: 'currentColor',
    },
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
