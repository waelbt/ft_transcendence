import { Avatar } from '.';
import { VersusIcon, WinHeader } from '../assets/custom-icons';
import { useModelStore } from '../stores/ModelStore';
import { ImCross } from 'react-icons/im';

function MatchResultModal() {
    const { closeEvent } = useModelStore();
    return (
        <div className="w-[478px]  bg-white flex-col relative justify-start shadow rounded-[20px] round items-center gap-2.5 inline-flex overflow-hidden">
            <div className="absolute top-0 z-10 left-0">
                <WinHeader />
            </div>
            <div className="w-full z-10 flex-col p-4 justify-start items-center gap-2.5 inline-flex">
                <div className="self-stretch justify-start items-start cursor-pointer">
                    <ImCross
                        className="text-white"
                        onClick={() => closeEvent()}
                    />
                </div>
                <div className="text-white text-[52px] font-normal font-['Acme']">
                    You won!
                </div>
                <div className="justify-center items-center gap-5 inline-flex">
                    <div className="flex-col justify-start items-center gap-[5px] inline-flex">
                        <Avatar
                            imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                            style="w-24 h-24 !rounded-[10px] shadow  !border-solid !border-4 border-green-600"
                        />
                        <div className="text-neutral-500 text-[26px] font-normal font-['Acme']">
                            waelbt
                        </div>
                    </div>
                    <div className="flex-col justify-start items-center gap-[5px] inline-flex">
                        <VersusIcon />
                        <div className="text-neutral-500 text-[26px] font-normal font-['Acme']">
                            5 - 1
                        </div>
                    </div>
                    <div className="flex-col justify-start items-center gap-[5px] inline-flex">
                        <Avatar
                            imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                            style="w-24 h-24 !rounded-[10px] shadow  !border-solid !border-2 border-neutral-500"
                        />
                        <div className="text-neutral-500 text-[26px] font-normal font-['Acme']">
                            daiseken
                        </div>
                    </div>
                </div>

                <div className="pb-[5px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="text-neutral-500 text-[22px] font-normal font-['Acme'] leading-7">
                        Awarded
                    </div>

                    <div className="animate__heartBeat text-green-600 text-[22px] font-normal font-['Acme'] leading-7">
                        +50 exp
                    </div>
                </div>
                <div className="justify-center items-start gap-20 inline-flex">
                    <div className="px-[30px] py-2.5 bg-zinc-300 rounded-[5px] shadow justify-center items-center gap-2.5 flex cursor-pointer">
                        <div className="text-neutral-500 text-[28px] font-normal font-['Acme'] leading-9">
                            Rematch
                        </div>
                    </div>
                    <div className="px-[30px] py-2.5 bg-zinc-300 rounded-[5px] shadow justify-center items-center gap-2.5 flex">
                        <div className="text-neutral-500 text-[28px] font-normal font-['Acme'] leading-9">
                            New game
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchResultModal;
