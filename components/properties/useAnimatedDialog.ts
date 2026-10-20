"use client";

import { useEffect, useRef } from "react";

export function useAnimatedDialog(trigger: HTMLButtonElement | null) {
  const dialog = useRef<HTMLDialogElement>(null);
  const animation = useRef<Animation | null>(null);
  const closing = useRef(false);

  useEffect(() => {
    const overlay = dialog.current;
    closing.current = false;
    if (overlay) delete overlay.dataset.closing;
    overlay?.showModal();
    if (overlay && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current = overlay.animate(
        [{ transform: "translateX(48px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
        { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    }
    return () => {
      if (animation.current) { animation.current.onfinish = null; animation.current.cancel(); }
      overlay?.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  const close = () => {
    const overlay = dialog.current;
    if (!overlay?.open || closing.current) return;
    closing.current = true;
    overlay.dataset.closing = "true";
    const current = getComputedStyle(overlay);
    const from = { transform: current.transform, opacity: current.opacity };
    animation.current?.cancel();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      overlay.close();
      return;
    }
    animation.current = overlay.animate(
      [from, { transform: "translateX(64px)", opacity: 0 }],
      { duration: 320, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" },
    );
    animation.current.onfinish = () => overlay.close();
  };

  return { dialog, close };
}
