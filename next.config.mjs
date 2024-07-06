/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/auth',
            permanent: false,
          },

        ]
      },    
};

export default nextConfig;
