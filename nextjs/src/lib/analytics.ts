// Analytics utility functions for Umami tracking

interface UmamiUser {
  email?: string;
  id?: string;
  name?: string;
}

export const setUmamiUser = (user: UmamiUser) => {
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.identify(user);
  }
};

export const clearUmamiUser = () => {
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.reset();
  }
};

export const injectUmami = () => {
  if (typeof window === "undefined") return;

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const src = process.env.NEXT_PUBLIC_UMAMI_SRC;

  if (!websiteId || !src) {
    console.log(
      "Umami analytics not configured - missing environment variables"
    );
    return;
  }

  // Check if script is already loaded
  if (document.querySelector(`script[src="${src}"]`)) {
    console.log("Umami analytics already loaded");
    return;
  }

  // Create and inject the Umami script
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.setAttribute("data-website-id", websiteId);

  // Add to head
  document.head.appendChild(script);

  script.onload = () => {
    console.log("Umami analytics initialized successfully");
  };

  script.onerror = () => {
    console.error("Failed to load Umami analytics");
  };
};
