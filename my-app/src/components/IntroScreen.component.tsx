import { motion } from "framer-motion";
import TextType from "./TextType.component.tsx";
import Threads from "./Threads.component.tsx";

export default function IntroScreen({ onStart }: any) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // cinematic curve
      className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center"
    >
      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen gap-12 md:gap-20 py-12">
        <div className="shrink-0">
          <img
            src="../../logo_pado_branca.png"
            alt="Pado's Logo"
            className="h-8 md:h-12 w-auto object-contain"
          />
        </div>
        <button
          onClick={onStart}
          className="group shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center transition-all duration-500 hover:bg-[#1a1a1a] hover:scale-105 hover:border-white/30 shadow-2xl text-white text-4xl animate-pulse"
        >
          Casa <span className="font-bold"> Smart </span>
        </button>
        <div className="shrink-0 text-white/70 font-mono text-xs md:text-sm tracking-widest uppercase">
          <TextType
            text={[
              "Welcome to CasaSmart!",
              "Your intelligent home dashboard.",
              "Tap the circle to begin.",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            cursorCharacter="█"
            deletingSpeed={50}
            variableSpeed={{ min: 60, max: 120 }}
            cursorBlinkDuration={0.5}
            className="mt-100 absolute font-bold text-gray-400 text-sm md:text-base font-mono tracking-widest"
          />
        </div>
      </div>
    </motion.div>
  );
}

// <span className="font-bold">Smart</span>
