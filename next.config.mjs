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
      async headers() {
        return [
          {
            // Force disable caching for any NextAuth api routes. We need to do this because by default
            // these API endpoints do not return a Cache-Control header.
            source: '/api/auth(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store, max-age=0',
              },
            ],
          },
        ];
      },          
};

export default nextConfig;
