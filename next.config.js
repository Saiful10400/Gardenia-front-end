/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds:true
  },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ['i.ibb.co'], 
    },
  };

module.exports=nextConfig
