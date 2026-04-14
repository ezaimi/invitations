type SectionTitleProps = {
    children: React.ReactNode
    className?: string
  }
  
  export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
    return (
      <h1
        className={`text-[#000000] text-[40px] sm:text-[3.5rem] md:text-[4rem] leading-none font-serenity z-10 ${className}`}
      >
        {children}
      </h1>
    )
  }