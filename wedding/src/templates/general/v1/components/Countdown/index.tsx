import AnimatedFlowers from "./AnimatedFlowers"


function Countdown() {
  return (
    <div className='h-140 flex items-end justify-center'>
      <div className='h-110 rounded-t-[90%] w-full bg-[#c3c2a0] pb-3 relative max-w-[500px]'>
        <div className="-mt-3 ">
          <AnimatedFlowers />
        </div>
        <div className='flex flex-col h-full justify-end items-center '>
          <div className='text-[#676a26] font-serenity text-[2.5rem]'>Countdown</div>
          <div className='text-[#676a26] font-serenity text-[5rem] tracking-wider'>32:11:47:07</div>
        </div>
      </div>
    </div>
  )
}

export default Countdown