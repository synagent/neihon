export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-brand-mute">
        <p>© {new Date().getFullYear()} Neihon. All rights reserved.</p>
      </div>
    </footer>
  );
}
