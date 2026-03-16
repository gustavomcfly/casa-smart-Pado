import { motion } from "framer-motion";
import { FastForward } from "lucide-react";

export default function VideoScreen({ onComplete }: any) {
  return (
    <motion.div
      key="video-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* SKIP BUTTON CONTAINER */}
      {/* Pinned to the absolute top so it stays in the black space above the video on mobile */}
      <div className="absolute top-0 left-0 w-full flex justify-end p-6 md:p-10 z-50">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/70 hover:text-white transition-all duration-300 shadow-lg group"
        >
          <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
            Pular Vídeo
          </span>
          <FastForward className="w-3 h-3 md:w-4 md:h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* THE VIDEO */}
      <video
        src="/../../video_intro.mp4"
        autoPlay
        playsInline
        muted
        onEnded={onComplete}
        // THE FIX: 'object-contain' ensures the video stays horizontal and never crops on cellphones!
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
