import Image from "next/image";

const scheduleItems = [
    {
        time: "12 : 00",
        event: "Guest Arrival",
        description:
            "Please arrive, find your seats, and settle in as we prepare to begin the ceremony.",
        icon: "/images/templates/v3/schedule/ring.png",
        iconAlt: "Wedding rings",
        iconLeft: true,

    },
    {
        time: "18 : 00",
        event: "Ceremony",
        description:
            "Join us as we exchange our vows and celebrate the start of our life together.",
        icon: "/images/templates/v3/schedule/candle.png",
        iconAlt: "Candles",
        iconLeft: false,
        width: 60,
        height: 60,
    },
    {
        time: "19 : 00",
        event: "Cocktail Hour",
        description:
            "Enjoy a selection of drinks and light bites while mingling with family and friends.",
        icon: "/images/templates/v3/schedule/glasses.png",
        iconAlt: "Cocktail glasses",
        iconLeft: true,
        width: 90,
        height: 90,
    },
    {
        time: "20 : 00",
        event: "Party & Dinner",
        description:
            "Celebrate with us on the dance floor as we enjoy music and laughter.",
        icon: "/images/templates/v3/schedule/cake.png",
        iconAlt: "Wedding cake",
        iconLeft: false,
        width: 70,
        height: 70,
    },
];

function Schedule() {
    return (
        <div className="py-8">
            <div className="flex flex-col items-center text-center px-8 mb-10">
                <h1 className="font-serenity text-[#4d0c12] text-[2rem]">
                    The details
                </h1>
                <p className="font-belleza text-[#642c2b] text-[0.85rem] mt-2 leading-relaxed max-w-95">
                    <span className="whitespace-nowrap">
                        Set along the shores of Lake Como, our venue offers a romantic
                    </span>
                    <br />
                    setting of historic architecture, gardens,  and <br /> panoramic views.
                </p>
            </div>

            <div className="w-full max-w-85 mx-auto mt-16">
                {scheduleItems.map((item, index) => (
                    <div key={index}>
                        {/* LEFT */}
                        {item.iconLeft && (
                            <>
                                <div className="flex items-center gap-6">
                                    <Image
                                        src={item.icon}
                                        alt={item.iconAlt}
                                        width={item.width ?? 85}
                                        height={item.height ?? 85}
                                    />
                                    <div className="w-55">
                                        <p className="font-serenity text-[#4d0c12] text-[0.9rem]">
                                            {item.time} - {item.event.toUpperCase()}
                                        </p>
                                        <p className="font-belleza text-[#5a3535] text-[0.8rem] mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {index < scheduleItems.length - 1 && (
                                    <div className="flex my-5 justify-start ml-9">
                                        <div className="h-6 w-0.5 ml-2 bg-[#af9357]" />
                                    </div>
                                )}
                            </>
                        )}

                        {/* RIGHT */}
                        {!item.iconLeft && (
                            <>
                                <div className="flex items-center justify-between ">
                                    <div className="w-60 text-left ">
                                        <p className="font-serenity text-[#4d0c12] text-[1rem]">
                                            {item.time} - {item.event.toUpperCase()}
                                        </p>
                                        <p className="font-belleza text-[#5a3535] text-[0.8rem] mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                    <Image
                                        src={item.icon}
                                        alt={item.iconAlt}
                                        width={item.width ?? 85}
                                        height={item.height ?? 85}
                                    />
                                </div>

                                {index < scheduleItems.length - 1 && (
                                    <div className="flex my-5 justify-end mr-9">
                                        <div className="h-6 w-0.5 bg-[#af9357] -mr-1" />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Schedule;