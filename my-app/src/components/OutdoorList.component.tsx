//@ts-ignore
import { outdoorItems } from "../devices/outdoor.js";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import DeviceVisualizer from "./DeviceVisualizer.component.tsx";

const PTZControl = React.lazy(() => import("./PTZControl.components.tsx"));

export default function outdoorList() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof outdoorItems)[0] | null
  >(null);
  const isVisualDevice =
    selectedItem?.text.toUpperCase().includes("CAMERA") ||
    selectedItem?.text.toUpperCase().includes("OLHO") ||
    selectedItem?.text.toUpperCase().includes("VIDEO");

  const scrollList = (direction: "left" | "right") => {
    const container = document.getElementById("devices-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const [ptzPos, setPtzPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div className="w-[95%] max-w-7xl z-20 relative mx-auto px-4 mt-6 md:mt-8">
        <button
          onClick={() => scrollList("left")}
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-8 md:h-8 bg-white/10 active:bg-white/30 backdrop-blur-xl border border-white/20 rounded-md hidden md:flex items-center justify-center text-black shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div
          id="devices-scroll-container"
          className="flex flex-col md:flex-row justify-start items-stretch md:items-start py-2 md:py-6 px-2 bg-white/1 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-y-auto md:overflow-y-visible overflow-x-hidden md:overflow-x-auto scrollbar-hide max-h-[55vh] md:max-h-none"
        >
          {outdoorItems.map((item: any, index: any) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`shrink-0 flex flex-row md:flex-col items-center justify-start px-4 py-3 md:py-0 md:px-4 cursor-pointer transition-transform duration-300 min-w-25 sm:min-w-30 md:min-w-37.5 ${
                index < outdoorItems.length - 1
                  ? "border-r border-white/20"
                  : ""
              }`}
            >
              {/* FIXED: Replaced h-22 and w-25 with standard Tailwind sizes and added object-contain */}
              <div className="mr-4 md:mr-0 md:mb-3 flex items-center justify-center h-10 w-10 md:h-24 md:w-full shrink-0">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-12 sm:w-16 md:w-20 h-full object-contain drop-shadow-lg"
                />
              </div>

              {/* FIXED: Changed to whitespace-normal and added leading-snug so multiline text looks great */}
              <p className="flex-1 text-left md:text-center whitespace-normal text-[10px] md:text-xs font-bold text-black tracking-widest uppercase drop-shadow-md leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollList("right")}
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-8 md:h-8 bg-white/10 active:bg-white/30 backdrop-blur-xl border border-white/20 rounded-md hidden md:flex items-center justify-center text-black shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Clicking this background overlay closes the modal
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-9999  bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 pb-32 md:p-8 md:pb-24"
          >
            {/* The actual Modal Box */}
            <motion.div
              // The "Grow Up" effect
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // e.stopPropagation() prevents the overlay onClick from firing when you click INSIDE the modal
              onClick={(e) => e.stopPropagation()}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-full relative flex flex-col md:flex-row shadow-2xl overflow-y-auto scrollbar-hide max-h-[80vh] md:max-h-[75vh] pt-14 ${
                isVisualDevice
                  ? "max-w-5xl gap-8 md:p-8 md:pt-12"
                  : "max-w-3xl gap-8 md:p-10 md:pt-12"
              }`}
            >
              {/* Decorative background glow */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close "X" Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 transition-colors p-2 bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>

              {/* Left Side: Large Product Image */}
              {isVisualDevice ? (
                // --- WIDE LAYOUT (For Cameras, Olho, Video) ---
                <>
                  {/* Left Side: Image in Action */}
                  <div className="w-[full] md:w-3/5 min-h-62.5 md:min-h-100 bg-black/50 rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
                    {selectedItem.text.includes("PTZ") ? (
                      <Suspense
                        fallback={
                          <div className="text-white/50 text-xs tracking-widest uppercase">
                            Carregando PTZ...
                          </div>
                        }
                      >
                        <PTZControl
                          ptzPos={ptzPos}
                          setPtzPos={setPtzPos}
                          povImage={selectedItem.actionImage}
                        />
                      </Suspense>
                    ) : (
                      <div className="w-full flex flex-col gap-3">
                        {/* --- STATUS BAR --- */}
                        <div className="flex items-center justify-between px-2">
                          <div className="flex items-center gap-2">
                            {/* Pulsing red recording dot */}
                            <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                            <span className="text-red-400 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                              VIEWPORT // LIVE_STREAM_STATIC
                            </span>
                          </div>
                        </div>

                        {/* --- STATIC CAMERA VIEWPORT --- */}
                        <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex items-center justify-center">
                          {selectedItem.actionImage ? (
                            <img
                              src={selectedItem.actionImage}
                              alt="POV"
                              className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 transition-opacity duration-500"
                            />
                          ) : (
                            <span className="text-white/30 text-sm tracking-widest uppercase z-10">
                              Imagem de Demonstração
                            </span>
                          )}

                          {/* Timestamp Overlay (Glassmorphism box floating on the image) */}
                          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 shadow-lg">
                            <span className="text-white/80 font-mono text-[9px] md:text-[10px] tracking-widest uppercase drop-shadow-md">
                              {/* I added a quick time fetch so it looks even more live! */}
                              CAM_01 // {new Date().toLocaleDateString()} -{" "}
                              {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Device Image -> Name -> Specs */}
                  <div className="w-full md:w-2/5 flex flex-col justify-center">
                    {/* Device PNG isolated in a glass box */}
                    <div className="mx-auto mb-5 bg-white/5 backdrop-blur-md rounded-2xl p-4 w-max border border-white/10 shadow-inner">
                      <img
                        src={selectedItem.realImage}
                        alt={selectedItem.text}
                        className="size-16 md:w-20 md:h-20 object-contain drop-shadow-2xl"
                      />
                    </div>

                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide leading-tight">
                      {selectedItem.text}
                    </h3>

                    <p className="text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold mb-4">
                      Especificações
                    </p>

                    <ul className="space-y-4">
                      {selectedItem.specs.map((spec: any, i: any) => (
                        <li
                          key={i}
                          className="flex items-center text-gray-300 text-sm md:text-base font-bold"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 shrink-0" />
                          <div className="w-full ">
                            {spec}
                            <hr className="w-full h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-200" />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <DeviceVisualizer item={selectedItem} />
                  </div>
                </>
              ) : (
                // --- STANDARD LAYOUT (For Sensors, Buttons, etc) ---
                <>
                  <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 p-8 flex items-center justify-center relative min-h-50">
                    <img
                      src={selectedItem.realImage}
                      alt={selectedItem.text}
                      className="w-full h-auto max-w-50 text-white object-contain drop-shadow-2xl"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold mb-2">
                      Especificações
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wide">
                      {selectedItem.text}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {selectedItem.description}
                    </p>

                    <ul className="space-y-3">
                      {selectedItem.specs.map((spec: any, i: any) => (
                        <li
                          key={i}
                          className="flex items-center text-gray-300 text-sm font-bold"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1 shrink-0" />
                          <div className="w-full ">
                            {spec}
                            <hr className="w-full h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-200" />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <DeviceVisualizer item={selectedItem} />
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
