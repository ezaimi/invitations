export default function Schedule() {
  const items = [
    { time: "16:00", label: "Сбор гостей" },
    { time: "16:30", label: "Регистрация" },
    { time: "18:00", label: "Банкет" },
  ];

  return (
    <section className="px-6 py-8">
      <h2 className="text-xl font-semibold text-center">Расписание</h2>

      <div className="mt-6 space-y-4">
        {items.map((i, idx) => (
          <div key={idx} className="flex justify-between border-b pb-2">
            <span className="font-medium">{i.time}</span>
            <span>{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}