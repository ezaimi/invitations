type SectionSubtitleProps = {
    children: React.ReactNode
    className?: string
  }
  
  export default function SectionSubtitle({ children, className = "" }: SectionSubtitleProps) {
    return (
      <p
        className={`text-[#000000] mt-8 max-w-md text-[13px] sm:text-[1.1rem] leading-[1.1] font-belleza z-10 mx-5 ${className}`}
      >
        {children}
      </p>
    )
  }