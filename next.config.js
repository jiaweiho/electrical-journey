/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config;
  }
}

module.exports = nextConfig
