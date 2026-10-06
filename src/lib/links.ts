/** On the home page the contact section is on the same page, so we scroll to it. */
export const contactHref = (url: URL) => (url.pathname === "/" ? "#contact" : "/contact");
