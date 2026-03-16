import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Check, ShoppingBag, Home } from "lucide-react";
import Threads from "./Threads.component.tsx";
// @ts-ignore
import { indoorItems } from "../devices/indoor.js";
// @ts-ignore
import { outdoorItems } from "../devices/outdoor.js";

// Helper array to find images for the cart
const allItems = [...outdoorItems, ...indoorItems];

export default function RatingScreen({ onComplete, userData, onBack }: any) {
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [uxRating, setUxRating] = useState(0);
  const [exRating, setExRating] = useState(0);
  const [inRating, setInRating] = useState(0);
  const [recoRating, setRecoRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the user's first name for the bag title
  const firstName = userData?.nome ? userData.nome.split(" ")[0] : "Sua";

  // Helper function to grab the image for the cart items
  const getItemImage = (itemName: string) => {
    const found = allItems.find((i: any) => i.text === itemName);
    return found ? found.imageWhite : "";
  };

  // Toggle item selection
  const toggleItem = (itemName: string) => {
    setLikedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName],
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalData = {
      "form-name": "feedback-rating",
      nome: userData?.nome || "Unknown",
      email: userData?.email || "Unknown",
      profissao: userData?.profissao || "Unknown",
      liked_items: likedItems.join(", "),
      externa_rating: exRating,
      interna_rating: inRating,
      ux_rating: uxRating,
      reco_rating: recoRating,
      comments: feedbackText,
    };

    const submitData = new URLSearchParams(finalData as any).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: submitData,
    }).catch((error) => {
      console.error("Rating submission background error:", error);
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <motion.div
      key="rating-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-9998 bg-black overflow-y-auto overflow-x-hidden will-change-transform"
    >
      {/* Background Threads */}

      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>

      <button
        type="button" // CRITICAL: Prevents this button from submitting the form!
        onClick={onBack}
        className="absolute top-4 left-4 md:top-5 md:left-6 lg:top-8 lg:left-10 2xl:top-12 2xl:left-12 z-50 flex items-center gap-2 lg:gap-3 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 rounded-full text-white/50 hover:text-white transition-all duration-300 shadow-lg group"
      >
        <Home className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
        <span className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase">
          Voltar
        </span>
      </button>

      <div className="flex min-h-full items-center justify-center p-4 pt-24 sm:pt-24 md:p-8 md:pt-28 lg:pt-36 2xl:pt-15 relative z-10">
        {/* THE FIX: We wrap the entire grid in the form so the submit button works no matter where it moves! */}
        <form
          onSubmit={handleSubmit}
          name="feedback-rating"
          data-netlify="true"
          className="w-full flex justify-center"
        >
          <input type="hidden" name="form-name" value="feedback-rating" />
          <input type="hidden" name="nome" value={userData?.nome || ""} />
          <input type="hidden" name="email" value={userData?.email || ""} />
          <input
            type="hidden"
            name="profissao"
            value={userData?.profissao || ""}
          />
          <input
            type="hidden"
            name="liked_items"
            value={likedItems.join(", ")}
          />
          <input type="hidden" name="externa_rating" value={exRating} />
          <input type="hidden" name="interna_rating" value={inRating} />
          <input type="hidden" name="ux_rating" value={uxRating} />
          <input type="hidden" name="reco_rating" value={recoRating} />
          <input type="hidden" name="comments" value={feedbackText} />

          {/* DYNAMIC GRID: Expands from 2 columns (max-w-7xl) to 3 columns (max-w-[95vw]) smoothly! */}
          <motion.div
            layout
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className={`w-full grid gap-6 min-h-[85vh] ${
              likedItems.length > 0
                ? "grid-cols-1 lg:grid-cols-3 max-w-[95vw]"
                : "grid-cols-1 lg:grid-cols-2 max-w-7xl"
            }`}
          >
            {/* --- COLUMN 1: Favorites Selection --- */}
            <motion.div
              layout
              className="flex flex-col gap-6 bg-[#111111]/60 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl h-full"
            >
              <div>
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
                  Monte sua solução em segurança
                </h2>
                <p className="text-white/50 text-sm mt-2">
                  Selecione seus favoritos da Casa Smart.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-8">
                <div>
                  <h3 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                    Área Externa
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {outdoorItems.map((item: any) => (
                      <button
                        type="button" // Prevents accidental form submission
                        key={`out-${item.id}`}
                        onClick={() => toggleItem(item.text)}
                        className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                          likedItems.includes(item.text)
                            ? "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {likedItems.includes(item.text) && (
                          <Check className="absolute top-1 right-1 w-3 h-3 text-green-400" />
                        )}
                        <img
                          src={item.imageWhite}
                          alt={item.text}
                          className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg"
                        />
                        <span className="text-[8px] md:text-[9px] text-white/80 font-bold tracking-wider text-center uppercase leading-tight line-clamp-2">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                    Área Interna
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {indoorItems.map((item: any) => (
                      <button
                        type="button" // Prevents accidental form submission
                        key={`in-${item.id}`}
                        onClick={() => toggleItem(item.text)}
                        className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                          likedItems.includes(item.text)
                            ? "bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {likedItems.includes(item.text) && (
                          <Check className="absolute top-1 right-1 w-3 h-3 text-blue-400" />
                        )}
                        <img
                          src={item.imageWhite}
                          alt={item.text}
                          className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg"
                        />
                        <span className="text-[8px] md:text-[9px] text-white/80 font-bold tracking-wider text-center uppercase leading-tight line-clamp-2">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- COLUMN 2: Ratings & Form --- */}
            <motion.div
              layout
              className="flex flex-col justify-center gap-8 bg-[#111111]/60 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl h-full"
            >
              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Como foi sua experiência com os produtos da área externa?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`ux-${star}`}
                      onClick={() => setExRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 md:w-10 md:h-10 ${exRating >= star ? "fill-pink-600 text-pink-600 drop-shadow-[0_0_8px_#ed0c6e]" : "text-white/20"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Como foi sua experiência com os produtos da área interna?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`prod-${star}`}
                      onClick={() => setInRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 md:w-10 md:h-10 ${inRating >= star ? "fill-pink-600 text-pink-600 drop-shadow-[0_0_8px_#ed0c6e]" : "text-white/20"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Tendo em vista os produtos apresentados, o quão você
                  recomendaria essas soluções para outras pessoas?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`prod-${star}`}
                      onClick={() => setRecoRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 md:w-10 md:h-10 ${recoRating >= star ? "fill-pink-600 text-pink-600 drop-shadow-[0_0_8px_#ed0c6e]" : "text-white/20"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Como você avalia o fluxo do aplicativo?
                </label>
                <p className="text-white/50 text-sm mt-2">
                  (Home, área externa, área interna, formulário)
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`ux-${star}`}
                      onClick={() => setUxRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 md:w-10 md:h-10 ${uxRating >= star ? "fill-pink-600 text-pink-600 drop-shadow-[0_0_8px_#ed0c6e]" : "text-white/20"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-bold text-lg">
                  O que poderíamos melhorar?
                </label>
                <textarea
                  name="comments"
                  rows={4}
                  placeholder="Deixe seus comentários ou sugestões aqui..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              {/* Show the Submit button HERE only if the Cart is hidden */}
              {likedItems.length === 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="submit"
                  disabled={
                    isSubmitting ||
                    uxRating === 0 ||
                    exRating === 0 ||
                    inRating === 0 ||
                    recoRating === 0
                  }
                  className="mt-4 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
                  <Send className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>

            {/* --- COLUMN 3: THE DYNAMIC BAG (CART) --- */}
            <AnimatePresence>
              {likedItems.length > 0 && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  className="flex flex-col bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] h-full relative overflow-hidden"
                >
                  {/* Decorative Glow */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <ShoppingBag className="w-6 h-6 text-white" />
                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                      Carrinho de {firstName}
                    </h3>
                  </div>

                  {/* List of selected items */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                    {likedItems.map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-md"
                      >
                        <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center p-1 shrink-0">
                          <img
                            src={getItemImage(item)}
                            alt={item}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </div>
                        <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* The Submit button moves HERE when items are selected */}
                  <div className="pt-6 mt-auto border-t border-white/10">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        uxRating === 0 ||
                        exRating === 0 ||
                        inRating === 0 ||
                        recoRating === 0
                      }
                      className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
