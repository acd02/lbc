module.exports = ({ file, options, env }) => ({
  plugins: {
    cssnano:
      env === 'production'
        ? {
            discardUnused: true
          }
        : false,
    autoprefixer:
      env === 'production'
        ? {
            browsers: ['last 2 versions', 'not dead']
          }
        : false
  }
})
