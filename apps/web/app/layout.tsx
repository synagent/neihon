import './globals.css';
export const metadata = {
  title: 'Neihon – Voice + AI Companion',
  description: 'Your day, powered by voice and AI.'
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0A0A0A', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
