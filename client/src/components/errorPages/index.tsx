export function NotFound() {
    return (
        <div className="fixed top-0 left-0 w-full h-full px-5 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex bg-white">
            <div className="text-black text-xl font-bold font-['Lemonada']">
                LaughTale
            </div>
            <div className="self-stretch h-[1046.51px] flex-col justify-center items-center gap-2.5 flex">
                <div className="text-black text-[42px] font-bold font-['Lemonada']">
                    Whoops, this page is unavailable
                </div>
                <div className="w-[689.11px] h-[749.25px] relative">
                    <div className="w-[565px] h-[328px] left-[98.56px]  top-0 absolute text-black text-[235px] font-bold font-['Lemonada']">
                        404
                    </div>
                    <div className="bg-pong-table-image w-full h-full"></div>
                </div>
            </div>
        </div>
    );
}

export function InternalError() {
    return (
        <div className="fixed top-0 left-0 w-full h-full px-5 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex bg-white">
            <div className="text-black text-xl font-bold font-['Lemonada']">
                LaughTale
            </div>
            <div className="self-stretch h-[1046.51px] flex-col justify-center items-center gap-2.5 flex">
                <div className="text-black text-[42px] font-bold font-['Lemonada']">
                    Internal server error, Simooooo !!!
                </div>
                <div className="w-[689.11px] h-[749.25px] relative">
                    <div className="w-[565px] h-[328px] left-[98.56px]  top-0 absolute text-black text-[235px] font-bold font-['Lemonada']">
                        500
                    </div>
                    <div className="bg-pong-table-image w-full h-full"></div>
                </div>
            </div>
        </div>
    );
}

export function forbiddenAccess() {
    return (
        <div className="fixed top-0 left-0 w-full h-full px-5 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex bg-white">
            <div className="text-black text-xl font-bold font-['Lemonada']">
                LaughTale
            </div>
            <div className="self-stretch h-[1046.51px] flex-col justify-center items-center gap-2.5 flex">
                <div className="w-[536.96px] h-[84px] justify-center items-center gap-[29px] inline-flex">
                    <div className="text-black text-[42px] font-bold font-['Lemonada']">
                        forbidden access{' '}
                    </div>
                    <TbForbid2 className="text-red-800" size={80}/>
                </div>
                <div className="w-[689.11px] h-[749.25px] relative">
                    <div className="w-[565px] h-[328px] left-[98.56px]  top-0 absolute text-black text-[235px] font-bold font-['Lemonada']">
                        403
                    </div>
                    <div className="bg-pong-table-image w-full h-full"></div>
                </div>
            </div>
        </div>
    );
}
