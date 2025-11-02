import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusCard from "@/components/StatusCard";

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-16 flex items-center justify-center">
        <StatusCard />
      </div>
      <Footer />
    </main>
  );
}
