import type { FC, CSSProperties } from "react";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  "--after-duration": string;
  "--before-duration": string;
  "--after-shadow": string;
  "--before-shadow": string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}) => {
  const inlineStyles: CustomCSSProperties = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    // Changed to Cyan and Magenta for a true Cyberpunk / Tech aesthetic
    "--after-shadow": enableShadows ? "-2px 0 #0ff" : "none",
    "--before-shadow": enableShadows ? "2px 0 #f0f" : "none",
  };

  const baseClasses = "relative inline-block whitespace-nowrap select-none";

  // FIX 1: Removed bg-[#111111] and replaced with bg-transparent.
  // FIX 2: Fixed the hover logic so it correctly triggers the animation only on hover if requested.
  const pseudoClasses = !enableOnHover
    ? "after:content-[attr(data-text)] after:absolute after:top-0 after:left-[2px] after:text-white after:bg-transparent after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after " +
      "before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-2px] before:text-white before:bg-transparent before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before"
    : "after:content-[attr(data-text)] after:absolute after:top-0 after:left-[2px] after:text-white after:bg-transparent after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-2px] before:text-white before:bg-transparent before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      "hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after " +
      "hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before";

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <span style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </span>
  );
};

export default GlitchText;
