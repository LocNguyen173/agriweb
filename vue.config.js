const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  devServer: {
    port: 8080,
    host: 'localhost',
    // Force port 8080, override environment variables
    open: true,
    allowedHosts: 'all'
  },
  // Tối ưu hóa build
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
})
