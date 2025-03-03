/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.youtu.be; connect-src 'self' https://www.thecocktaildb.com https://www.youtube.com https://www.googleapis.com; img-src 'self' data: https://* http://*; object-src 'none';",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Add a separate header for FLoC/Privacy Sandbox opt-out
          {
            key: "Permissions-Policy",
            value: "browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
  