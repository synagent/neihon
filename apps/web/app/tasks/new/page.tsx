import TaskForm from "@/components/TaskForm";

export const dynamic = "force-static";

export default function NewTaskPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="ne-glass rounded-3xl p-6">
        <h1 className="text-xl font-semibold">New Task</h1>
        <p className="text-sm text-brand-mute mb-4">
          Create a task by typing or using voice dictation. You can also download an .ics file to add it to your
          calendar.
        </p>
        <TaskForm />
      </div>
    </main>
  );
}
