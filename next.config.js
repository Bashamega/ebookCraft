/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')],
  },
  webpack5:true,
  webpack:(config)=>{
    config.resolve.fallback = {fs:false};
    return config;
  }
}

module.exports = nextConfig
