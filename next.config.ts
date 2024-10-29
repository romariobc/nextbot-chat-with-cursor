/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it with formidable
  },
}

module.exports = nextConfig
