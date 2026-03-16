import { useState } from "react";
import NavBar from "./components/Navbar.component.tsx";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen.component.tsx";
import FormScreen from "./components/FormScreen.component.tsx";
import Hero from "./components/Hero.component.tsx";
import RatingScreen from "./components/RatingScreen.component.tsx";
import VideoScreen from "./components/VideoScreen.component.tsx";
import "./App.css";

function App() {
  const [activeArea, setActiveArea] = useState("home");

  const [currentScreen, setCurrentScreen] = useState(() => {
    const savedData = localStorage.getItem("casaSmartUser");
    return savedData ? "form" : "intro";
  });

  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("casaSmartUser");
    return savedData ? JSON.parse(savedData) : null;
  });

  const handleResetApp = () => {
    localStorage.removeItem("casaSmartUser");
    setUserData(null);
    setCurrentScreen("intro");
    setActiveArea("home");
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* 1. OVERLAY SCREENS */}
      <AnimatePresence mode="wait">
        {currentScreen === "video" && (
          <VideoScreen onComplete={() => setCurrentScreen("app")} />
        )}
        {currentScreen === "intro" && (
          <IntroScreen onStart={() => setCurrentScreen("app")} />
        )}
        {currentScreen === "form" && (
          <FormScreen
            onComplete={(data: any) => {
              setUserData(data);
              setCurrentScreen("rating");
            }}
          />
        )}
        {currentScreen === "form" && (
          <FormScreen
            onComplete={(data: any) => {
              setUserData(data);
              setCurrentScreen("rating");
            }}
            // ADD THIS LINE: Sends the user back to the main dashboard!
            onBack={() => {
              localStorage.removeItem("casaSmartUser");
              setUserData(null);
              setCurrentScreen("app");
            }}
          />
        )}

        {currentScreen === "rating" && (
          <RatingScreen userData={userData} onComplete={handleResetApp} />
        )}

        {currentScreen === "rating" && (
          <RatingScreen
            userData={userData}
            onComplete={handleResetApp}
            // ADD THIS LINE: Sends them back to the main dashboard!
            onBack={() => {
              localStorage.removeItem("casaSmartUser");
              setUserData(null);
              setCurrentScreen("app");
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. THE MAIN APP */}
      {/* The empty tags <> and </> tell React to group these components without breaking the layout */}
      {currentScreen === "app" && (
        <>
          <main>
            <Hero activeArea={activeArea} />
          </main>

          <NavBar
            setActiveArea={setActiveArea}
            activeArea={activeArea}
            onFeedbackClick={() => setCurrentScreen("form")}
            onReset={handleResetApp}
          />
        </>
      )}
    </div>
  );
}

export default App;
