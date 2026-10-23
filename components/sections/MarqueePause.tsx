"use client";

import { useRef, useState } from "react";
import { PauseButton } from "@/components/ui/PauseButton";

/** Pause / play for the marquee band just above it (marks it data-paused; CSS holds the rows). */
export function MarqueePause() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  return (
    <div ref={ref} className="mt-4 flex justify-end">
      <PauseButton
        paused={paused}
        label="the moving names"
        onToggle={() => {
          const band = ref.current?.previousElementSibling as HTMLElement | null;
          band?.toggleAttribute("data-paused", !paused);
          setPaused(!paused);
        }}
      />
    </div>
  );
}
