import { Disclosure } from "@headlessui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({
  setActiveArea,
  activeArea,
  onFeedbackClick,
  onReset,
}: any) {
  const navigation = [
    { id: "home", name: "HOME" },
    { id: "externa", name: "ÁREA EXTERNA" },
    { id: "interna", name: "ÁREA INTERNA" },
  ];

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("devices-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -350 : 350; // Distance to swipe
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Disclosure
      as="nav"
      // Used left-1/2 and -translate-x-1/2 to perfectly center it, and w-[95%] max-w-7xl to keep it off the edges!
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-3xl h-auto min-h-20 bg-white/10 backdrop-blur-md border border-white/20 z-1000 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
    >
      <div className="px-2 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full">
        {/* Changed to standard flex layout with gap handling */}
        <div className="flex h-20 items-center justify-between gap-2 md:gap-4">
          {/* LOGO - Left (shrink-0 prevents it from being crushed) */}
          <div className="flex shrink-0 items-center">
            <button onClick={onReset} title="Reset Application">
              <img
                alt="Pado"
                src="/../Pado-Logo-Novo.png" // Ensure it starts with / for public folder!
                className="w-16 md:w-24 lg:w-32 h-auto drop-shadow-lg object-contain"
              />
            </button>
          </div>

          {/* NAV LINKS - Center */}
          {/* overflow-x-auto allows swiping on super small screens instead of breaking */}
          <div className="flex-1 flex justify-center overflow-x-auto scrollbar-hide px-2">
            <div className="flex space-x-2 sm:space-x-4 md:space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveArea(item.id)}
                  className={classNames(
                    activeArea === item.id
                      ? "text-black border-b-2 border-black"
                      : "text-gray-600 hover:text-black",
                    // Text sizes scale dynamically: very small on mobile, large on desktop
                    "px-1 py-2 text-[9px] sm:text-xs md:text-sm lg:text-lg font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-6">
            {/* Liquid Glass Scroll Controller (Only shows on Externa/Interna screens) */}
            {activeArea !== "home" && (
              <div className="hidden sm:flex items-center bg-white/5 backdrop-blur-xl border border-white/20 rounded-full shadow-[inset_0_0_10px_rgba(0, 0, 0, 0.1)] overflow-hidden transition-all">
                <button
                  onClick={() => handleScroll("left")}
                  className="p-1.5 md:p-2 text-black/70 hover:text-white hover:bg-white/20 active:bg-white/30 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                {/* Thin glass divider */}
                <div className="w-px h-5 bg-white/20" />
                <button
                  onClick={() => handleScroll("right")}
                  className="p-1.5 md:p-2 text-black/70 hover:text-white hover:bg-white/20 active:bg-white/30 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            )}
            <button
              onClick={onFeedbackClick}
              className="bg-black text-white px-2 md:px-4 py-2 rounded-md text-[9px] md:text-sm font-bold tracking-widest hover:bg-gray-200 transition-all duration-300 uppercase whitespace-nowrap"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
