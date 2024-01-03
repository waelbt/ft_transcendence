import { Avatar, FormComponent, Twofa } from '.';
import { NICKNAME_FIELD } from '../constants';

function Setting() {
    const SETTING_FIELDS = [
        {
            label: 'Full Name',
            type: 'text',
            name: 'nickName',
            placeholder: 'wael boutzougarte',
            disabled: true
        },
        {
            label: 'Personal Email',
            type: 'text',
            name: 'nickName',
            placeholder: 'boutzougarte@gmail.com',
            disabled: true
        }
    ];

    const onSubmit = () => {};
    return (
        <div className="px-7 py-2.5 flex-col justify-between items-start inline-flex gap-5">
            <div className="text-neutral-400 text-3xl font-normal font-['Acme']">
                Account Setting
            </div>
            {/* gap-[79px] */}
            <div className="justify-center items-center inline-flex gap-10">
                <div className="flex-col justify-center items-start gap-8 inline-flex">
                    <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                            Edit Avatar
                        </div>
                        <div className="px-2.5 pt-5 pb-2.5 justify-center items-center gap-[30px] inline-flex">
                            <Avatar
                                imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                                style="w-32 h-32"
                            />
                            <div className="flex-col justify-center items-start gap-4 inline-flex ">
                                <input
                                    className=""
                                    // id="inputTag"
                                    type="file"
                                    // onChange={(event) => {
                                    // const file = event.target.files?.[0];
                                    // if (file) {
                                    //     const objectURL =
                                    //         URL.createObjectURL(file);
                                    //     setImagePath(objectURL);
                                    //     uploadData(file);
                                    // }
                                    // }}
                                />
                                <div className="text-center text-zinc-400 text-sm font-normal font-['Poppins']">
                                    JPG or PNG. Max size of 4Mo
                                </div>
                                {/* //! prevent the  user from spawning Upload click */}
                                <div className="px-5 py-3 bg-stone-100 rounded-[32px] flex-col justify-center items-center gap-2.5 flex text-center text-neutral-500 text-sm font-normal font-['Acme'] cursor-pointer hover:bg-stone-200 ">
                                    Upload Now
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[387px] h-[84px] flex-col justify-start items-start gap-[7px] inline-flex">
                        <FormComponent
                            fields={NICKNAME_FIELD}
                            onSubmit={onSubmit}
                            btn={{
                                // TODO: store this in a custom style proprty
                                style: ' px-6 py-1 bg-stone-50 rounded-[20px] border border-stone-300 justify-center items-center gap-3 inline-flex text-center text-neutral-500 text-lg font-normal font-["Acme"] hover:bg-stone-200',
                                type: 'submit',
                                text: 'Submit'
                            }}
                        />
                    </div>
                </div>
                <div className="w-px h-full relative bg-neutral-200" />
                <div className="flex-col justify-center items-start gap-5 inline-flex flex-grow pl-10">
                    <FormComponent
                        fields={SETTING_FIELDS}
                        btn={{
                            style: 'hidden'
                        }}
                    />
                    <Twofa />
                </div>
            </div>
        </div>
    );
}

export default Setting;

{
    /* <div className="w-[1110px] h-[663px] px-[30px] py-2.5 bg-white rounded-[20px] shadow flex-col justify-between items-start inline-flex">
    <div className="text-neutral-400 text-[32px] font-normal font-['Acme']">
        Account Setting
    </div>
    <div className="w-[1050px] justify-center items-center gap-[79px] inline-flex">
        <div className="flex-col justify-center items-start gap-10 inline-flex">
            <div className="flex-col justify-start items-start gap-2.5 flex">
                <div className="px-2.5 justify-start items-start gap-2.5 inline-flex">
                    <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                        Edit Avatar
                    </div>
                </div>
                <div className="px-2.5 pt-5 pb-2.5 justify-center items-center gap-[30px] inline-flex">
                    <div className="flex-col justify-center items-start gap-[13px] inline-flex">
                        <img
                            className="w-[130px] h-[130px] relative rounded-[800px] border border-black"
                            src="https://via.placeholder.com/130x130"
                        />
                    </div>
                    <div className="flex-col justify-center items-start gap-5 inline-flex">
                        <div className="justify-start items-center gap-[15px] inline-flex">
                            <div className="p-[5px] bg-gray-200 rounded-[3px] border border-zinc-400 justify-center items-center gap-3 flex">
                                <div className="text-center text-black text-sm font-normal font-['Poppins']">
                                    Browse...
                                </div>
                            </div>
                            <div className="text-center text-black text-sm font-normal font-['Poppins']">
                                No file selected.
                            </div>
                        </div>
                        <div className="text-center text-zinc-400 text-sm font-normal font-['Poppins']">
                            JPG or PNG. Max size of 4Mo
                        </div>
                        <div className="px-[15px] py-[13px] bg-stone-100 rounded-[32px] flex-col justify-center items-center gap-2.5 flex">
                            <div className="text-center text-black text-sm font-normal font-['Acme']">
                                Upload Now
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-col justify-start items-start gap-[7px] flex">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Nickname
                </div>
                <div className="w-[387px] h-[47px] pl-5 pr-2.5 py-2.5 bg-white rounded-[10px] border-2 border-gray-200 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-neutral-400 text-base font-normal font-['Poppins']">
                        Dos404
                    </div>
                </div>
            </div>
            <div className="w-[387px] justify-end items-center gap-2.5 inline-flex">
                <div className="px-5 py-2.5 bg-stone-50 rounded-[20px] border border-stone-300 justify-center items-center gap-3 flex">
                    <div className="text-center text-neutral-500 text-lg font-normal font-['Acme']">
                        Submit
                    </div>
                </div>
            </div>
        </div>
        <div className="w-px h-[500px] relative bg-neutral-200" />
        <div className="flex-col justify-start items-start gap-[18px] inline-flex">
            <div className="flex-col justify-start items-start gap-[7px] flex">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    First Name
                </div>
                <div className="w-[387px] h-[47px] pl-5 pr-2.5 py-2.5 bg-zinc-100 rounded-[10px] border-2 border-gray-200 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-neutral-400 text-base font-normal font-['Poppins']">
                        wael
                    </div>
                </div>
            </div>
            <div className="flex-col justify-start items-start gap-[7px] flex">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Last Name
                </div>
                <div className="w-[387px] h-[47px] pl-5 pr-2.5 py-2.5 bg-zinc-100 rounded-[10px] border-2 border-gray-200 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-neutral-400 text-base font-normal font-['Poppins']">
                        boutzougarte
                    </div>
                </div>
            </div>
            <div className="flex-col justify-start items-start gap-[7px] flex">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Gmail
                </div>
                <div className="w-[387px] h-[47px] pl-5 pr-2.5 py-2.5 bg-zinc-100 rounded-[10px] border-2 border-gray-200 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-neutral-400 text-base font-normal font-['Poppins']">
                        boutzougarte@gmail.com
                    </div>
                </div>
            </div>
            <div className="self-stretch h-[270px] px-5 py-3.5 bg-gray-100 rounded-[5px] flex-col justify-start items-start gap-[5px] flex">
                <div className="w-[226px] text-center text-neutral-500 text-[22px] font-normal font-['Acme']">
                    two Factor authentication
                </div>
                <div className="w-[440px] text-neutral-400 text-base font-light font-['Poppins']">
                    Download the Google Authenticator app from the app store and
                    scan the QR code below
                </div>
                <img
                    className="w-28 h-[113px]"
                    src="https://via.placeholder.com/112x113"
                />
                <div className="p-[5px] bg-stone-300 rounded-[5px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="text-center text-white text-[22px] font-normal font-['Acme']">
                        Activate 2FA
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>; */
}
