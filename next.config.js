

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'unavatar.io' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  }
};

export default nextConfig;
