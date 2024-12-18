import React from 'react';
import { motion } from 'framer-motion';

export const VideoPlayer: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mt-8 rounded-lg overflow-hidden shadow-2xl"
  >
    <div className="relative pt-[56.25%]">
      <iframe
        src="https://customer-nnx56rc7d5mkp930.cloudflarestream.com/6b0f8f6a12f6527acca7297521bb2bff/iframe?poster=https%3A%2F%2Fcustomer-nnx56rc7d5mkp930.cloudflarestream.com%2F6b0f8f6a12f6527acca7297521bb2bff%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </div>
  </motion.div>
);

export default VideoPlayer;