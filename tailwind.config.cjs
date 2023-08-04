/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        apercu: ['Apercu', 'cursive'],
      },
      colors: {
        'primary': '#4158D0',
        'primary-gray': '#666666',
        'secondary-gray': '#B3B3B3',
        'tertiary-gray': '#D1D1D1',
        'error': '#F21E1E',
        'success': '#13C344',
        'main-blue': '#2356F6',
        'gray-variant-1': '#E8E8E8',
        'gray-variant-2': '#E6E7E8',
        'gray-variant-3': '#DDD',
        'gray-variant-4': '#848A95',
        'gray-variant-5': '#E4E5E7',
        'gray-variant-6': '#7E818C',
        'gray-variant-7': '#F2F2F2',
        'gray-variant-8': '#EAEAEA',
        'gray-variant-9': '#f4f4f4',
        'gray-variant-10': '#f0f0f0',
        'gray-variant-11': '#dadada',
        'gray-variant-12': '#e6e6e6',
        'black-variant-1': '#0F2552',
        'white-variant-1': '#FDFDFD',
        'hyper-blue': '#627DDC',
        'badge-blue': '#2959B8',
      },
      borderRadius: {
        '5': '5px',
      },
      width: {
        '15': '60px',
      },
      lineHeight: {
        '17': '17px'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
};