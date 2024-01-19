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
    return (
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
                            // TODO: store this in a custom style proprty
                            style: ' px-6 py-1 bg-stone-50 rounded-[20px] border border-stone-300 justify-center items-center gap-3 inline-flex text-center text-neutral-500 text-lg font-normal font-["Acme"] hover:bg-stone-200',
                            type: 'submit',
                            text: 'Submit'
                        }}
                    />
                </div>
            </div>
            <div className="w-px h-[80%] relative bg-neutral-200" />
            <div className="flex-col justify-center items-start gap-5 inline-flex  ">
                <FormComponent
                    fields={SETTING_FIELDS}
                    btn={{
                        style: 'hidden'
                    }}
                />
                <Twofa />
            </div>
        </div>
    );
}

export default Setting;
