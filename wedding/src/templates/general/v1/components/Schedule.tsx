
export default function Schedule() {
  const program = [
    {
      time: "17:30",
      title: "GUEST ARRIVAL",
      description:
        "Please arrive, find your seats, and settle in as we prepare to begin the ceremony.",
    },
    {
      time: "18:00",
      title: "CEREMONY",
      description:
        "Join us as we exchange our vows and celebrate the start of our life together.",
    },
    {
      time: "19:00",
      title: "COCKTAIL HOUR",
      description:
        "Enjoy a selection of drinks and light bites while mingling with family and friends.",
    },
    {
      time: "20:00",
      title: "PARTY & DINNER",
      description:
        "Celebrate with us on the dance floor as we enjoy music, laughter, and the evening together.",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-[#f5f4ec]">
      {/* Main Header */}
      <h2
        className="text-center mb-12"
        style={{
          fontFamily: "Slight",
          color: "#676a26",
          fontSize: "2rem",
        }}
      >
        — Will you join us? —
      </h2>

      {/* Timeline */}
      <div className="relative flex flex-col items-center w-full max-w-md">
        {program.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Time */}
            <span
              style={{
                fontFamily: "Simple Serenity",
                color: "#bf777c",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              {item.time}
            </span>

            {/* Title */}
            <h3
              style={{
                fontFamily: "Perandory Condensed",
                color: "#4a4a4a",
                fontSize: "1.4rem",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              {item.title}
            </h3>

            {/* Description */}
            <p
              className="max-w-xs leading-relaxed"
              style={{
                fontFamily: "Belleza",
                color: "#4a4a4a",
                fontSize: "1rem",
              }}
            >
              {item.description}
            </p>

            {/* Divider */}
            {index !== program.length - 1 && (
              <div className="flex flex-col items-center my-8">
                <div className="w-[2px] h-12 bg-[#676a26]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
