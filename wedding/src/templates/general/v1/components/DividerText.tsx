type Props = {
    text: string;
    className?: string;
  };
  
  export default function DividerText({ text, className }: Props) {
    return (
      <p
        className={`text-center text-[1.30rem] mt-10 ${className || ""}`}
        style={{ fontFamily: "var(--font-slight)" }}
      >
        <span className="inline-block w-6 h-px bg-[#676a26] align-middle mr-2"></span>
        {text}
        <span className="inline-block w-6 h-px bg-[#676a26] align-middle ml-2"></span>
      </p>
    );
  }