import Link from "next/link";

import { Badge } from "./Badge";
import { Button } from "./Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[rgba(8,10,14,0.6)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-brand-gold" />
          <span className="text-sm tracking-widest text-brand-mute">NEIHON</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Badge>Live</Badge>
          <Link href="https://neihon-api.onrender.com/docs" target="_blank" rel="noreferrer">
            <Button variant="ghost">API Docs</Button>
          </Link>
          <Link href="https://neihon-api.onrender.com" target="_blank" rel="noreferrer">
            <Button>Open API</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
