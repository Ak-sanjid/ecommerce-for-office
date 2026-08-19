import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="KÁNTI home">
      <span className="logo-mark">Radiance</span>
      <span className="logo-word">KÁNTI</span>
    </Link>
  );
}
