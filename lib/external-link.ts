/** Opens a link to another site (an absolute http(s) URL, e.g. the demo booking page) in a new tab. */
export function externalLinkProps(href: unknown) {
  return typeof href === "string" && /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
