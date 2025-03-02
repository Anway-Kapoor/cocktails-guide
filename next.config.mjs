export default {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.youtu.be; connect-src 'self' https://www.youtube.com https://www.googleapis.com; img-src 'self' data: https://* http://*; object-src 'none';",
          },
        ],
      },
    ];
  },
};
  