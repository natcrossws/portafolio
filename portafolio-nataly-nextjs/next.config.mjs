/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90, 92, 95, 100],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
