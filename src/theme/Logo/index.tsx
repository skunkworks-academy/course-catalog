// The Academy's canonical shell owns its accessible logo and home link.
// Docusaurus otherwise renders an empty duplicate link in the desktop sidebar
// because the local Navbar is intentionally suppressed and has no logo config.
export default function Logo() {
  return null;
}
