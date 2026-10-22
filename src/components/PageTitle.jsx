"use client";

import { useEffect } from "react";

export default function PageTitle({ title }) {
  useEffect(() => {
    document.title = title ? `${title} | IdeaVault` : "IdeaVault – Startup Idea Sharing";
  }, [title]);

  return null;
}
