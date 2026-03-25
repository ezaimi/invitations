export default function Location() {
  return (
    <section className="px-6 py-8 text-center">
      <h2 className="text-xl font-semibold">Место</h2>

      <p className="mt-3 text-sm">
        Ресторан "Белладжио"
      </p>

      <a
        href="https://maps.google.com"
        target="_blank"
        className="inline-block mt-4 bg-[#c8c15c] px-6 py-3 rounded-full text-white"
      >
        Открыть карту
      </a>
    </section>
  );
}