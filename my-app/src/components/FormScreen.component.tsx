import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, FastForward, Home } from "lucide-react";
import Threads from "./Threads.component.tsx";

export default function FormScreen({ onComplete, onBack }: any) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    profissao: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Refs for our custom slide logic
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new URLSearchParams({
      "form-name": "lead-form",
      ...formData,
    }).toString();

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: submitData,
      });
      localStorage.setItem("casaSmartUser", JSON.stringify(formData));
      onComplete(formData);
    } catch (error) {
      console.error("Form submission failed:", error);
      localStorage.setItem("casaSmartUser", JSON.stringify(formData));
      onComplete(formData);
    }
  };

  // --- SLIDER LOGIC ---
  //@ts-ignore
  const handleDragEnd = (event: any, info: any) => {
    // If they drag it more than ~180px to the right
    if (info.offset.x > 180) {
      // 1. Check if the form is fully filled out
      if (formRef.current && !formRef.current.checkValidity()) {
        // If missing fields: Snap back to start and trigger native browser warnings
        controls.start({ x: 0 });
        submitBtnRef.current?.click();
        return;
      }

      // 2. If valid: Lock it at the end and submit!
      setIsUnlocked(true);
      controls.start({ x: 224 }); // Locks the thumb at the right edge
      submitBtnRef.current?.click();
    } else {
      // Didn't drag far enough, snap back to 0
      controls.start({ x: 0 });
    }
  };

  const handleSkip = () => {
    // Create a fake user for testing purposes
    const fakeUser = {
      nome: "Test User",
      email: "test@pado.com",
      profissao: "Tester",
    };
    localStorage.setItem("casaSmartUser", JSON.stringify(fakeUser));
    onComplete(fakeUser);
  };

  return (
    <motion.div
      key="form-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-9998 bg-black flex items-center justify-center px-6 md:px-12 py-12 overflow-y-auto"
    >
      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>

      <button
        onClick={onBack}
        // THE FIX: Reduced the 'top' values across all breakpoints so it hugs the ceiling and clears the logo!
        className="absolute top-4 left-4 md:top-5 md:left-6 lg:top-8 lg:left-10 2xl:top-12 2xl:left-12 z-50 flex items-center gap-2 lg:gap-3 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 rounded-full text-white/50 hover:text-white transition-all duration-300 shadow-lg group"
      >
        <Home className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
        <span className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase">
          Voltar
        </span>
      </button>

      <button
        onClick={handleSkip}
        // THE FIX: Matched the symmetrical 'top' values on the right side!
        className="absolute top-4 right-4 md:top-5 md:right-6 lg:top-8 lg:right-10 2xl:top-12 2xl:right-12 z-50 flex items-center gap-2 lg:gap-3 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 rounded-full text-white/50 hover:text-white transition-all duration-300 shadow-lg group"
      >
        <span className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase">
          Pular
        </span>
        <FastForward className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>

      <div className="max-w-6xl w-full min-h-[80vh] md:h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 py-10 md:py-0">
        {/* LEFT COLUMN: Branding */}
        <div className="flex flex-col justify-between gap-12 md:gap-0 h-full">
          <div>
            <img
              src="/logo_pado_branca.png"
              alt="Pado Logo"
              className="h-8 md:h-12 w-auto object-contain mb-16 md:mb-0"
            />
          </div>
          <div className="mb-12 md:mb-0">
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
              Queremos saber <br /> mais sobre você
            </h1>
          </div>
          <div>
            <p className="text-white text-3xl tracking-widest">
              Casa <span className="font-bold">Smart</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form Card */}
        <div className="flex items-center justify-end h-full">
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl">
            <form
              ref={formRef} // Added ref here
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              name="lead-form"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="lead-form" />

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Nome</label>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  // Made inputs slightly glassy too!
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="endereço de e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Profissão</label>
                <input
                  type="text"
                  name="profissao"
                  required
                  placeholder="Sua área de atuação"
                  value={formData.profissao}
                  onChange={handleChange}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* HIDDEN NATIVE SUBMIT BUTTON */}
              {/* We need this so HTML5 validation (required fields) still triggers correctly */}
              <button type="submit" ref={submitBtnRef} className="hidden" />

              {/* NEW LIQUID GLASS SLIDER BUTTON */}
              <div className="mt-4 relative w-70 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                {/* Background Text */}
                <span className="absolute w-full text-center text-white/70 text-xs font-bold tracking-widest uppercase pointer-events-none select-none">
                  {isSubmitting
                    ? "Enviando..."
                    : isUnlocked
                      ? "Acesso Liberado"
                      : "Deslize para enviar"}
                </span>

                {/* Draggable Glass Thumb */}
                <motion.div
                  drag={!isSubmitting && !isUnlocked ? "x" : false}
                  dragConstraints={{ left: 0, right: 224 }} // 280px track - 48px thumb - 8px padding = 224
                  dragElastic={0.05}
                  onDragEnd={handleDragEnd}
                  animate={controls}
                  className="absolute left-1 w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/30 transition-colors"
                >
                  <ArrowRight
                    className={`w-5 h-5 transition-colors ${isUnlocked ? "text-green-400" : "text-white"}`}
                  />
                </motion.div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
