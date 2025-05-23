

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Services", // Example, change as needed
    hash: "#services",
  },
  {
    name: "About Us", // Example, change as needed
    hash: "#about-us",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const; // "as const" is important for type inference

// You can add other data here later as in AnikaPortfolio (experiencesData, projectsData, etc.)