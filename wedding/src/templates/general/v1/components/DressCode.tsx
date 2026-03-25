export default function DressCode() {
  const colors = ["#c8c15c", "#7f9c7a", "#d7d77d", "#c2d4a3", "#6b8fbf"];

  return (
    <section className="px-6 py-8 text-center">
      <h2 className="text-xl font-semibold">Дресс-код</h2>

      <p className="mt-3 text-sm">
        Будем рады, если вы поддержите цветовую гамму праздника
      </p>

      <div className="flex justify-center gap-2 mt-4">
        {colors.map((c, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded"
            style={{ background: c }}
          />
        ))}
      </div>
    </section>
  );
}