# 🏠 Pado Casa Smart - Interactive Dashboard

Casa Smart PADO

> An immersive, interactive digital kiosk experience developed for **Pado** to launch their new "Casa Smart" smart security ecosystem at **Expo Revestir**, the largest coatings and finishings fair in Latin America.

## 📖 Overview

Pado, a brand renowned for trust and traditional locks, is taking a massive leap into the smart home security market. To showcase this at Expo Revestir, I developed a high-performance, interactive dashboard. 

The application allows attendees to explore the new product line (Indoor and Outdoor devices), build a personalized "cart" of their favorite items, and submit a comprehensive feedback form. The entire experience is wrapped in a premium, responsive glassmorphism UI with cinematic animations.

## ✨ Key Features

* **Interactive Device Visualizer:** Users can smoothly navigate between Outdoor (Área Externa) and Indoor (Área Interna) environments to view devices like PTZ Cameras, Smart Peepholes, and Magnetic Sensors.
* **Dynamic "Shopping Cart" Layout:** Built with Framer Motion layout animations. When a user selects their first favorite product, the entire screen fluidly reorganizes from a 2-column to a 3-column grid to reveal a personalized "Bag".
* **Immersive Rating System:** A custom 5-star rating component allowing users to evaluate UX, product design, and likelihood to recommend.
* **Serverless Lead Capture:** Fully integrated with Netlify Forms, capturing user demographics, selected products, and qualitative feedback without needing a dedicated backend.
* **Responsive "Glassmorphism" UI:** Carefully crafted with Tailwind CSS to look flawless on any screen, from an iPad Mini to massive 4K TV displays used at the event.

## 🛠️ Tech Stack

* **Framework:** React + Vite (for lightning-fast HMR and optimized production builds)
* **Styling:** Tailwind CSS (for highly responsive, utility-first styling and glassmorphism effects)
* **Animations:** Framer Motion (utilized for page transitions, complex layout shifts, and SVG icon interactions)
* **Icons:** Lucide React
* **Backend/Forms:** Netlify Forms (Serverless data capture using hidden HTML inputs and URL-encoded fetch requests)

## 📸 Interface Showcase

*(Check out the video demonstration here: [https://www.linkedin.com/posts/julio-cesar-gon%C3%A7alves-bb0134201_frontend-reactjs-webdevelopment-activity-7437980231006724097-89rA?utm_source=share&utm_medium=member_desktop&rcm=ACoAADN0cLQBbpoeFby3tYJlAMBk2x3H-AQPNec])*

## 🧠 Technical Highlights & Challenges Solved

* **Framer Motion Layout Animations:** Engineered a seamless UI transition where the main grid gracefully compresses to the left to make room for the user's customized cart sliding in from the right, preventing any jarring layout jumps.
* **Strict Netlify Form Integration with React:** Solved complex state-handling issues by mapping React state variables (`uxRating`, `likedItems`, `feedbackText`) directly into hidden `<input>` fields within the DOM, ensuring Netlify's strict HTML parsers successfully captured dynamic JavaScript data.
* **Cross-Device Fluid Typography & Positioning:** Implemented dynamic responsive padding (`pt-24` up to `2xl:pt-48`) and flexbox ordering to ensure floating navigation buttons and complex glass cards never overlapped, maintaining a perfect layout on touch-screen kiosks and mobile devices alike.

## 🚀 Running Locally

To run this project on your local machine:

```bash
# Clone the repository
git clone [https://github.com/YourUsername/pado-casa-smart-dashboard.git](https://github.com/YourUsername/pado-casa-smart-dashboard.git)

# Navigate into the directory
cd pado-casa-smart-dashboard

# Install dependencies
npm install

# Start the Vite development server
npm run dev
