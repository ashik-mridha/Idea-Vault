// Public site details. Social links and the contact email come from env so the owner
// can set real values; anything left unset is simply not rendered.
export const SITE = {
  name: "IdeaVault",
  tagline: "A community platform to share startup ideas, gather feedback, and discover what is trending.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  location: "Dhaka, Bangladesh",
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/ashik90998/ideaVault",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    x: process.env.NEXT_PUBLIC_X_URL || "",
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Items" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const USER_MENU_LINKS = [
  { href: "/items/add", label: "Add Idea" },
  { href: "/items/manage", label: "Manage Ideas" },
];
