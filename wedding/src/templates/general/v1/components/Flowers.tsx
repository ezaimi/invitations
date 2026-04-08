import Image from "next/image"

function Flowers() {
    return (
        <div className="min-w-full flex items-start   relative h-60">
           
            <Image
                src="/images/templetes/v1/pink_lilies/1.png"
                alt=""
                width={150}
                height={100}
                className="object-contain absolute left-0 bottom-3  -ml-24 z-30"
            />
            <Image
                src="/images/templetes/v1/pink_lilies/3.png"
                alt=""
                width={260}
                height={260}
                className="object-contain absolute left-0 -ml-24 z-30"
            />
            <Image
                src="/images/templetes/v1/pink_lilies/4.png"
                alt=""
                width={260}
                height={260}
                className="object-contain absolute left-1/3 -translate-x-1/2 -mt-25 z-20"
            />
            <Image
                src="/images/templetes/v1/pink_lilies/5.png"
                alt=""
                width={280}
                height={260}
                className="object-contain absolute right-1 -mt-28 "
            />
            <Image
                src="/images/templetes/v1/pink_lilies/6.png"
                alt=""
                width={260}
                height={260}
                className="object-contain absolute -right-36 -top-1  z-20"
            />
        </div>
    )
}

export default Flowers