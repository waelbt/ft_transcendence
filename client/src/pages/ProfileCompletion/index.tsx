import InputField from '../../components/InputField';

// ! combine the nickname and submit section into a resuable from
export function ProfileCompletion() {
    return (
        <>
            <div className="flex flex-col h-screen shadow-2xl">
                {/* Content */}
                <div className="flex flex-col flex-grow shadow-custom z-0">
                    {/* Header */}
                    <div className="px-7 py-8 justify-start items-center gap-2.5 inline-flex">
                        <div className="text-black text-lg font-lemonada font-bold">
                            LaughTale
                        </div>
                    </div>
                    <div className="flex-grow w-full flex flex-col justify-center items-center gap-2.5">
                        <div className="px-3.5 py-px flex-col justify-start items-start gap-4 flex">
                            {/* Header */}
                            <div className=" flex-col justify-center items-start inline-flex gap-2">
                                <div className="text-neutral-900 text-3xl font-bold font-sans">
                                    Welcome! Let’s create your profile
                                </div>
                                <div className="text-zinc-600 text-xl font-normal font-sans">
                                    Let others get to know you better!
                                </div>
                            </div>
                            {/* avatar section */}
                            <div className="">
                                <div className=''>

								</div>
								<div className=''>

								</div>
                            </div>
                            {/* nickname section */}
                            <InputField label="Nickname" />
                            {/* submit putton section */}
                            <div className="w-full flex-col justify-end items-end gap-3 inline-flex">
                                <button className="bg-black rounded-[55px] justify-center items-center gap-3 inline-flex hover:bg-gray-500">
                                    <div className="py-3.5 px-5 text-center text-white text-sm font-bold font-sans">
                                        Continue
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="h-1/4 w-screen -z-1 bg-footer-image bg-cover bg-no-repeat"></div>
            </div>
        </>
    );
}

{
    /* <div className="w-[1728px] h-[795px] bg-white shadow flex-col justify-center items-start inline-flex"> */
}
{
    /* <div className="self-stretch px-[27px] py-[42px] justify-start items-center gap-2.5 inline-flex">
        <div className="text-black text-[19px] font-bold font-['Lemonada']">LaughTale</div>
    </div>
    <div className="self-stretch h-[673px] px-[27px] py-[42px] bg-white flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="w-[742px] px-[47px] pb-[131px] flex-col justify-start items-start gap-1.5 flex">
            <div className="w-[648px] h-[101px] px-3.5 py-px flex-col justify-center items-start gap-3 flex">
                <div className="text-neutral-900 text-[35px] font-bold font-['Open Sans']">Welcome! Let’s create your profile</div>
                <div className="text-zinc-600 text-xl font-normal font-['Open Sans']">Let others get to know you better!</div>
            </div>
            <div className="w-[648px] h-[229px] pr-3.5 py-px justify-start items-center gap-3 inline-flex">
                <div className="w-[163px] h-[184px] px-2.5 py-[3px] flex-col justify-center items-start gap-[13px] inline-flex">
                    <div className="text-black text-lg font-bold font-['Open Sans']">Add an avatar</div>
                    <div className="justify-start items-start gap-2.5 inline-flex">
                        <div className="w-[26px] pl-0.5 py-px bg-white justify-center items-center flex">
                            <div className="w-6 h-6 relative flex-col justify-start items-start flex" />
                        </div>
                    </div>
                </div>
                <div className="w-[120px] h-[59px] relative" />
                <div className="w-[457px] flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="p-3 bg-white rounded-[55px] border border-stone-300 justify-center items-center gap-3 inline-flex">
                        <div className="text-center text-neutral-500 text-xs font-normal font-['Acme']">Choose image</div>
                    </div>
                    <div className="flex-col justify-start items-start gap-[7px] flex">
                        <div className="flex-col justify-start items-start gap-[21px] flex">
                            <div className="text-neutral-400 text-base font-normal font-['Acme'] leading-snug tracking-tight">Or choose one of our defaults</div>
                        </div>
                        <div className="w-[234px] justify-start items-start gap-3 inline-flex">
                            <img className="w-[37px] h-[37px] rounded-full border border-white" src="https://via.placeholder.com/37x37" />
                            <img className="w-[37px] h-[37px] rounded-full border border-white" src="https://via.placeholder.com/37x37" />
                            <img className="w-[37px] h-[37px] rounded-full border border-white" src="https://via.placeholder.com/37x37" />
                            <img className="w-[37px] h-[37px] rounded-full border border-white" src="https://via.placeholder.com/37x37" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-px flex-col justify-start items-start gap-[15px] flex">
                <div className="h-[62px] flex-col justify-start items-start gap-3 flex">
                    <div className="flex-col justify-start items-start gap-4 flex">
                        <div className="text-black text-lg font-bold font-['Open Sans'] leading-tight">Nickname </div>
                        <div className="w-[385px] pl-[5px] pb-0.5 bg-white border-b-2 border-neutral-400 justify-start items-center inline-flex">
                            <div className="w-[250px] text-zinc-600 text-lg font-normal font-['Acme'] leading-normal">dos404</div>
                        </div>
                    </div>
                </div>
                <div className="w-[606px] h-[49px] flex-col justify-end items-end gap-3 flex">
                    <div className="p-3 bg-black rounded-[55px] border border-stone-300 justify-center items-center gap-3 inline-flex">
                        <div className="w-[89px] text-center text-white text-[19px] font-normal font-['Acme']">continue</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */
}
