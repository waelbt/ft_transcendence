const TwoFA = () => {
    const SubmitHandler = () => {};
    return (
        <>
            <img
                className="w-[202px] h-[203px]"
                src="https://via.placeholder.com/202x203"
            />
            <div className="justify-center items-center gap-2 inline-flex">
                <div className="w-[130px] h-[0px] border border-zinc-400"></div>
                <div className="text-center text-zinc-400 text-sm font-light font-['Poppins']">
                    enter code
                </div>
                <div className="w-[130px] h-[0px] border border-zinc-400"></div>
            </div>
            <div className="flex-col justify-center items-center gap-5 flex">
                <div className="justify-center items-center gap-2.5 inline-flex">
                    <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                    <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                    <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                    <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                    <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                    <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                </div>
                <button
                    className="px-20 py-2.5 bg-stone-50 rounded-[10px] border border-stone-300 justify-center items-center gap-3 inline-flex text-center text-neutral-500 text-lg font-normal font-['Acme']"
                    onClick={SubmitHandler}
                >
                    Confirm
                </button>
            </div>
        </>
    );
};

export default TwoFA;
