module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors:{
        primary:'#FF6363',
        secondary: {
          100: '#E2E205',
          200: '#888883'
        },
        theme: {
          black: '#191919',
          white: "white"
        }
      },
      fontFamily:{
        body:['Nunito']
      }
    },
  },
  variants: {},
  plugins: [],
}
