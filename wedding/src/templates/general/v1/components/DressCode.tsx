import DividerText from "./DividerText";

export default function DressCode() {
  const colors = ["#c8c15c", "#7f9c7a", "#d7d77d", "#c2d4a3", "#6b8fbf"];

  return (
    <section className="flex flex-col items-center text-center px-6 py-10">

      <header className="flex items-center gap-4 text-[#6f7f5c] mb-6">
        <DividerText text="Dress Code" />
      </header>

      <p className="text-[#555] text-[1rem] font-belleza leading-relaxed max-w-md">
        Guests are kindly requested to adhere to a formal dress code, opting
        for elegant attire suitable for an evening celebration.
      </p>

      <div className="flex gap-2 mt-4">
        <div className="w-10 h-10 rounded-full bg-[#b7b37a]" />
        <div className="w-10 h-10 rounded-full bg-[#9fb6cf]" />
        <div className="w-10 h-10 rounded-full bg-[#cfa3a1]" />
        <div className="w-10 h-10 rounded-full bg-[#d9c38f]" />
        <div className="w-10 h-10 rounded-full bg-[#d9d69b]" />
      </div>

    </section>
  );
}