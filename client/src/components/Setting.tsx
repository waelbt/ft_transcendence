import { useEffect } from 'react';
import { Avatar, FormComponent, Twofa } from '.';
import { NICKNAME_FIELD } from '../constants';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { ProfileOutletContextType } from '../types/global';

function Setting() {
    const { isCurrentUser } = useOutletContext<ProfileOutletContextType>() ?? {
        isCurrentUser: false
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (!isCurrentUser) navigate(-1); // Go back to the Previouss page
    }, [isCurrentUser]);

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
    <div className="flex h-full w-full justify-center items-center gap-8">
        <div className="flex-col justify-center items-start gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-8 inline-flex">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Edit Avatar
                </div>
                <div className=" pb-2.5 justify-center items-center gap-[30px] inline-flex ">
                    <Avatar
                        imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                        style="w-32 h-32"
                    />
                    <div className="flex-col justify-center items-start gap-4 inline-flex ">
                        <input
                            className="hidden"
                            id="inputImage"
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
                        <div
                            id="inputImage"
                            className="p-0.5 bg-gray-200 rounded-[3px] border border-zinc-400 justify-center items-center gap-3 inline-flex text-center text-black text-sm font-normal font-['Poppins']"
                        >
                            Browse...
                        </div>
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
                        style: ' px-6 py-1 bg-stone-50 rounded-[20px] border border-stone-300 justify-center items-center gap-3 inline-flex text-center text-neutral-500 text-lg font-normal font-["Acme"] hover:bg-stone-200',
                        type: 'submit',
                        text: 'Submit'
                    }}
                />
            </div>
        </div>
        <div className="w-px h-[80%] relative bg-neutral-200" />
    </div>;
    return (
        <div className="flex h-full w-full justify-between items-center gap-8">
            <div className="     flex-col justify-between items-center inline-flex px-4 py-4">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Appearance
                </div>
                <div className="px-2.5 pt-5 pb-2.5 justify-center items-center gap-[30px] inline-flex">
                    <Avatar
                        imageUrl="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                        style="w-32 h-32"
                    />
                    <div className="flex-col justify-center items-start gap-4 inline-flex ">
                        <input
                            className="hidden"
                            id="inputImage"
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
                        <div
                            id="inputImage"
                            className="p-0.5 bg-stone-100 rounded-[3px] border border-zinc-300 justify-center items-center gap-3 inline-flex text-center text-neutral-700 text-sm font-bold font-['Poppins'] cursor-pointer"
                        >
                            Browse...
                        </div>
                        <div className="text-center text-zinc-400 text-sm font-normal font-['Poppins']">
                            JPG or PNG. Max size of 4Mo
                        </div>
                        {/* //! prevent the  user from spawning Upload click */}
                        <div className="px-5 py-3 bg-stone-100 rounded-[32px] flex-col justify-center items-center gap-2.5 flex text-center text-neutral-500 text-sm font-normal font-['Acme'] cursor-pointer hover:bg-stone-200 ">
                            Upload Now
                        </div>
                    </div>
                </div>
                <FormComponent
                    fields={NICKNAME_FIELD}
                    onSubmit={onSubmit}
                    btn={{
                        style: ' px-6 py-1 bg-stone-50 rounded-[20px] border border-stone-300 justify-center items-center gap-3 inline-flex text-center text-neutral-500 text-lg font-normal font-["Acme"] hover:bg-stone-200',
                        type: 'submit',
                        text: 'Submit'
                    }}
                />
            </div>
            <div className="w-px h-[80%] relative bg-neutral-200" />{' '}
            <div className="flex-col justify-between items-center inline-flex gap-8 px-4 py-4">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Security
                </div>
                <div className="flex-col justify-center items-start gap-2.5 flex">
                    <div className="text-center text-black text-base font-normal font-['Poppins']">
                        Two-Factor Authentication
                    </div>
                    <div className="w-[440px] text-neutral-400 text-sm font-light font-['Poppins']">
                        Download the Google Authenticator app from the app store
                        and scan the QR code below
                    </div>
                </div>
                <Twofa />
            </div>
        </div>
    );
}

export default Setting;

{
    /* <div className="flex-col justify-center items-center gap-4 inline-flex"> */
}
{
    /* // add header here Personal infos */
}
{
    /* <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                    Personal infos
                </div> */
}
{
    /* <FormComponent
                    fields={SETTING_FIELDS}
                    btn={{
                        style: 'hidden'
                    }}
                /> */
}
{
    /* <div className="h-px w-64 relative bg-neutral-200" />
                <div className="flex-col justify-start items-start gap-[18px] flex w-full">
                    <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                        Security
                    </div>
                    <Twofa />
                    <li role="option">
                        <label htmlFor="github">
                            <i className="bx bxl-github"></i>GitHub
                        </label>
                    </li> */
}
{
    /* <div className="flex-col justify-start items-start gap-2.5 flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="w-3.5 h-3.5 relative bg-zinc-100 border border-neutral-400" />

                            <div className="text-center text-neutral-400 text-base font-normal font-['Poppins']">
                                Two-Factor Authentication
                            </div>
                        </div>

                        <div className="w-[440px] text-neutral-400 text-sm font-light font-['Poppins']">
                            Download the Google Authenticator app from the app
                            store and scan the QR code below
                        </div>
                    </div> */
}
{
    /* </div> */
}
{
    /* <div className=''>
                    <Twofa />
                </div> */
}
{
    /* </div> */
}
{
    /* <div className="w-[990px] h-[537px] justify-between items-center inline-flex">
    <div className="self-stretch flex-col justify-between items-center inline-flex">
        <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">Appearance </div>
        <div className="w-[415px] px-2.5 pt-5 pb-2.5 justify-center items-center gap-[30px] inline-flex">
            <img className="w-[158px] h-[158px] relative rounded-[800px] border border-black" src="https://via.placeholder.com/158x158" />
            <div className="flex-col justify-center items-start gap-5 inline-flex">
                <div className="justify-start items-center gap-[15px] inline-flex">
                    <div className="p-[5px] bg-gray-200 rounded-[3px] border border-zinc-400 justify-center items-center gap-3 flex">
                        <div className="text-center text-black text-sm font-normal font-['Poppins']">Browse...</div>
                    </div>
                    <div className="text-center text-black text-sm font-normal font-['Poppins']">No file selected.</div>
                </div>
                <div className="text-center text-zinc-400 text-sm font-normal font-['Poppins']">JPG or PNG. Max size of 4Mo</div>
                <div className="px-[15px] py-[13px] bg-stone-100 rounded-[32px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="text-center text-black text-sm font-normal font-['Acme']">Upload Now</div>
                </div>
            </div>
        </div>
        <div className="pb-[50px] flex-col justify-center items-start gap-2.5 flex">
            <div className="flex-col justify-start items-start gap-[5px] flex">
                <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">Nickname</div>
                <div className="w-[387px] h-[47px] pl-5 pr-2.5 py-2.5 bg-white rounded-[10px] border-2 border-gray-200 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-neutral-400 text-base font-normal font-['Poppins']">Dos404</div>
                </div>
            </div>
            <div className="w-[387px] justify-center items-center gap-2.5 inline-flex">
                <div className="px-20 py-2.5 bg-stone-50 rounded-[10px] border border-stone-300 justify-center items-center gap-3 flex">
                    <div className="text-center text-neutral-500 text-lg font-normal font-['Acme']">Submit</div>
                </div>
            </div>
        </div>
    </div>
    <div className="w-px h-[500px] relative bg-neutral-200" />
    <div className="bg-white flex-col justify-center items-center gap-[22px] inline-flex">
        <div className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">Security</div>
        <div className="w-[440px] h-[485px] relative">
            <div className="w-[440px] h-[459px] left-0 top-[26px] absolute flex-col justify-center items-center gap-[22px] inline-flex">
                <div className="self-stretch flex-col justify-center items-start gap-2.5 inline-flex">
                    <div className="text-center text-black text-base font-normal font-['Poppins']">Two-Factor Authentication</div>
                    <div className="w-[440px] text-neutral-400 text-sm font-light font-['Poppins']">Download the Google Authenticator app from the app store and scan the QR code below</div>
                </div>
                <img className="w-[202px] h-[203px]" src="https://via.placeholder.com/202x203" />
                <div className="self-stretch justify-center items-center gap-2 inline-flex">
                    <div className="w-[130px] h-[0px] border border-zinc-400"></div>
                    <div className="text-center text-zinc-400 text-sm font-light font-['Poppins']">enter code</div>
                    <div className="w-[130px] h-[0px] border border-zinc-400"></div>
                </div>
                <div className="self-stretch flex-col justify-center items-center gap-5 inline-flex">
                    <div className="justify-center items-center gap-2.5 inline-flex">
                        <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                        <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                        <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                        <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                        <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                        <div className="w-[30px] h-10 relative bg-white rounded-[10px] border border-neutral-400" />
                    </div>
                    <div className="px-20 py-2.5 bg-stone-50 rounded-[10px] border border-stone-300 justify-center items-center gap-3 inline-flex">
                        <div className="text-center text-neutral-500 text-lg font-normal font-['Acme']">Confirm</div>
                    </div>
                </div>
            </div>
            <div className="w-64 h-[54px] px-2 left-[91.50px] top-[215.50px] absolute border-b-2 border-red-600 justify-center items-center gap-2.5 inline-flex">
                <div className="w-60 text-center text-red-600 text-[43px] font-normal font-['Acme']">deactivate 2fa</div>
            </div>
        </div>
    </div>
</div> */
}

{
}
