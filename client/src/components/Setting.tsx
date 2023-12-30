import { InputField } from '.';
import { ForAppStore, ForGooglePlay } from '../assets/custom-icons';

function Setting() {
    return (
        <>
            {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
            <ul className="relative m-0 w-full list-none overflow-hidden p-0 transition-[height] duration-200 ease-in-out">
                {/* <!--First item--> */}
                <li className="relative h-fit after:absolute after:left-[2.45rem] after:top-[3.6rem] after:mt-px after:h-[calc(100%-2.45rem)] after:w-px after:bg-[#e0e0e0] after:content-[''] dark:after:bg-neutral-600">
                    <div className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline">
                        <span className="mr-3 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-[black] text-sm font-medium text-white">
                            1
                        </span>
                        <span className="text-black text-2xl font-['Acme] ">
                            Download Google Authenticator
                        </span>
                    </div>
                    <div className="left-0 overflow-hidden pb-2 pl-[3.75rem] pr-6 duration-300 ease-in-out">
                        Google Authentication in available in the following app
                        stores :
                    </div>
                    <div className="left-0 overflow-hidden pb-2 pl-[3.75rem] pr-6 duration-300 ease-in-out flex flex-row gap-5">
                        <ForAppStore />
                        <ForGooglePlay />
                    </div>
                </li>

                {/* <!--Second item--> */}
                <li className="relative h-fit after:absolute after:left-[2.45rem] after:top-[3.6rem] after:mt-px after:h-[calc(100%-2.45rem)] after:w-px after:bg-[#e0e0e0] after:content-[''] dark:after:bg-neutral-600">
                    <div className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline">
                        <span className="mr-3 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                            2
                        </span>
                        <span className="text-black text-2xl font-['Acme] ">
                            Scan the QR code
                        </span>
                    </div>
                    <div className="left-0 overflow-hidden  pl-[3.75rem]  duration-300 ease-in-out flex flex-col">
                        <p>hold your camera at QR code :</p>
                    </div>
                </li>

                {/* <!--Third item--> */}
                <li className="relative h-fit">
                    <div className="flex cursor-pointer items-center p-6 leading-[1.3rem] no-underline">
                        <span className="mr-3 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                            3
                        </span>
                        <span className="text-black text-2xl font-['Acme] ">
                            Enter your 2FA code
                        </span>
                    </div>
                    <div className="left-0 overflow-hidden pb-2 pl-[3.75rem] pr-6 duration-300 ease-in-out">
                        please enter two factor token from Google Authenticator
                        to verify correct setup!
                        <InputField placeholder="code" />
                    </div>
                </li>
            </ul>

            {/* <div className="w-[720px] self-stretch flex-col justify-start items-center gap-5 inline-flex">
                <div className="justify-center items-center gap-2.5 inline-flex">
                    <div className="w-[16.06px] h-[23.75px] relative"></div>
                    <div className="text-neutral-400 text-[32px] font-normal font-['Acme']">
                        two factor authentication{' '}
                    </div>
                </div>
                <div className="self-stretch h-[508px] p-2.5 flex-col justify-center items-start gap-2.5 flex">
                    <div className="py-2.5 flex-col justify-start items-start gap-2.5 flex">
                        <div className="justify-center items-center gap-5 inline-flex">
                            <div className="flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="justify-center items-center gap-2.5 inline-flex">
                                    <div className="w-8 h-8 relative">
                                        <div className="w-8 h-8 left-0 top-0 absolute bg-black rounded-full" />
                                        <div className="w-[11.43px] h-[21.71px] left-[10.50px] top-[5.50px] absolute text-center text-white text-xl font-medium font-['Roboto']">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[62px] h-[0px] origin-top-left rotate-90 bg-neutral-400 border border-neutral-400"></div>
                            </div>
                            <div className="flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="flex-col justify-center items-start gap-2.5 flex">
                                    <div className="text-center text-zinc-600 text-lg font-normal font-['Acme']">
                                        Download Google Authenticator{' '}
                                    </div>
                                    <div className="text-center text-black text-lg font-normal font-['Acme']">
                                        Google Authentication in available in
                                        the following app stores :
                                    </div>
                                </div>
                                <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                                    <ForAppStore />
                                    <ForGooglePlay />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-2.5 flex-col justify-start items-start gap-2.5 flex">
                        <div className="justify-center items-center gap-5 inline-flex">
                            <div className="justify-center items-center flex">
                                <div className="flex-col justify-center items-center gap-2.5 inline-flex">
                                    <div className="w-[62px] h-[0px] origin-top-left rotate-90 bg-neutral-400 border border-neutral-400"></div>
                                    <div className="justify-center items-center gap-2.5 inline-flex">
                                        <div className="w-8 h-8 relative">
                                            <div className="w-8 h-8 left-0 top-0 absolute bg-black rounded-full" />
                                            <div className="w-[11.43px] h-[21.71px] left-[10.50px] top-[5.50px] absolute text-center text-white text-xl font-medium font-['Roboto']">
                                                2<br />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[62px] h-[0px] origin-top-left rotate-90 bg-neutral-400 border border-neutral-400"></div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                                <div className="text-center text-zinc-600 text-[22px] font-normal font-['Acme']">
                                    Scan the QR code
                                </div>
                                <div className="text-center text-black text-lg font-normal font-['Acme']">
                                    hold your camera at QR code :{' '}
                                </div>
                            </div>
                            <div className="p-2.5 bg-black rounded-[5px] justify-center items-center gap-2.5 flex">
                                <div className="w-[100px] h-[100px] relative"></div>
                            </div>
                        </div>
                    </div>
                    <div className="py-2.5 flex-col justify-start items-start gap-2.5 flex">
                        <div className="justify-center items-center gap-5 inline-flex">
                            <div className="flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="w-[62px] h-[0px] origin-top-left rotate-90 bg-neutral-400 border border-neutral-400"></div>
                                <div className="justify-center items-center gap-2.5 inline-flex">
                                    <div className="w-8 h-8 relative">
                                        <div className="w-8 h-8 left-0 top-0 absolute bg-black rounded-full" />
                                        <div className="w-[11.43px] h-[21.71px] left-[10.50px] top-[5.50px] absolute text-center text-white text-xl font-medium font-['Roboto']">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col justify-center items-center gap-2.5 inline-flex">
                                <div className="flex-col justify-center items-start gap-2.5 flex">
                                    <div className="text-center text-zinc-600 text-[22px] font-normal font-['Acme']">
                                        Enter your 2FA code{' '}
                                    </div>
                                    <div className="text-center text-black text-lg font-normal font-['Acme']">
                                        please enter two factor token from
                                        Google Authenticator to verify correct
                                        setup!
                                    </div>
                                </div>
                                <div className="justify-center items-center gap-5 inline-flex">
                                    <div className="justify-center items-center gap-[11px] flex">
                                        <div className="w-[273px] h-10 p-2.5 bg-stone-50 rounded-[5px] border border-neutral-200 justify-start items-center gap-2.5 flex">
                                            <div className="text-neutral-400 text-base font-normal font-['Outfit']">
                                                Code
                                            </div>
                                        </div>
                                        <div className="w-[111px] p-2.5 bg-red-800 rounded-[5px] border border-neutral-200 justify-start items-center gap-2.5 flex">
                                            <div className="text-white text-base font-normal font-['Outfit']">
                                                Activate 2FA
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Setting;
