export const dynamic = "force-static";

const DEFAULT_CAL = "en.usa#holiday@group.v.calendar.google.com";
const TZ = "America/New_York";

function iframeSrc(calId: string) {
  const params = new URLSearchParams({
    src: calId,
    mode: "WEEK",
    ctz: TZ.replace("/", "%2F"),
    showPrint: "0",
    showTabs: "0",
    showCalendars: "0",
    showTz: "0",
    showDate: "1",
    showNav: "1",
    bgcolor: "#0b0d10",
    color: "#D4AF37",
  });

  return `https://calendar.google.com/calendar/embed?${params.toString()}`;
}

export default function CalendarEmbed() {
  const calId =
    process.env.NEXT_PUBLIC_PUBLIC_CAL_ID && process.env.NEXT_PUBLIC_PUBLIC_CAL_ID.trim().length > 0
      ? process.env.NEXT_PUBLIC_PUBLIC_CAL_ID
      : DEFAULT_CAL;

  return (
    <main className="mx-auto max-w-6xl p-4">
      <div className="ne-glass rounded-3xl p-2 overflow-hidden">
        <iframe
          title="Google Calendar"
          src={iframeSrc(calId)}
          className="w-full"
          style={{ height: "80vh", border: 0 }}
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-xs text-brand-mute">
        Showing public calendar:{" "}
        <code className="bg-black/40 border border-white/10 px-2 py-1 rounded-lg">{calId}</code>
      </p>
    </main>
  );
}
