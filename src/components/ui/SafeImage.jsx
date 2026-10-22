"use client";

import Image from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/constants";

function usableUrl(src) {
  try {
    const url = new URL(src);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** next/image that survives missing, malformed or broken URLs by showing the local fallback. */
export default function SafeImage({ src, alt, className = "", ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const useFallback = !src || !usableUrl(src) || failedSrc === src;
  const finalSrc = useFallback ? FALLBACK_IMAGE : src;

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt}
      className={className}
      unoptimized={!useFallback && src.startsWith("http:")}
      onError={() => setFailedSrc(src)}
    />
  );
}
