module.exports = {
  devServer: {
    proxy: 'http://192.168.2.15:8080',
    open: true,
    host: '192.168.10.62'
  }
}
