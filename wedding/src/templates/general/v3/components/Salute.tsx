function Salute() {
    return (
        <div
            className="w-full h-screen  max-h-235 bg-center bg-cover flex flex-col text-white justify-between items-center py-10"
            style={{
                backgroundImage: "url('/images/templates/v3/salute.png')",
            }}
        >
            <div className="flex flex-col gap-2 text-center px-10">
                <div className="font-serenity text-[2rem]">Save the date</div>
                <div className="font-belleza text-[0.9rem] text-[#e9e9e9]">Set in a beautiful and carefully chosen location, our wedding will unfold in a place filled with charm, </div>
            </div>
            <div className="font-serenity text-white text-[5rem] font-light flex gap-2">
                <span>22</span>
                <span>·</span>
                <span>07</span>
                <span>·</span>
                <span>26</span>
            </div>
        </div>
    );
}

export default Salute;