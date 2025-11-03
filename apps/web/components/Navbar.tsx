import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[rgba(8,10,14,0.6)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Neihon logo" className="h-6 w-6" />
          <span className="text-sm tracking-widest text-brand-mute">NEIHON</span>
        </a>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-sm text-brand-mute hover:text-brand-text">
            Home
          </a>
          <a href="/docs" className="text-sm text-brand-mute hover:text-brand-text">
            Docs
          </a>
          <a href="/playground" className="text-sm text-brand-mute hover:text-brand-text">
            Playground
          </a>
          <a href="/calendar" className="text-sm text-brand-mute hover:text-brand-text">
            Calendar
          </a>
          <a href="/tasks/new" className="text-sm text-brand-mute hover:text-brand-text">
            New Task
          </a>
          <a href="/auth" className="text-sm text-brand-mute hover:text-brand-text">
            Sign in
          </a>
          <a href="https://neihon-api.onrender.com/docs" target="_blank" rel="noreferrer" className="text-sm text-brand-mute hover:text-brand-text">
            API Docs
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
