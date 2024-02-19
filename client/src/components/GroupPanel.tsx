import { useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import Popup from 'reactjs-popup';
import { BsThreeDots } from 'react-icons/bs';
import { Avatar } from '.';
import useImageUpload from '../hooks/uploadImageHook';
// import { IoTrashOutline } from 'react-icons/io5';

// interface MembersProbs {
//     id: string;
//     avatar: string;
//     nickName: string;
//     role: string;
//     actions: string[];
// }
function GroupPanel() {
    const [isModifiable, setIsModifiable] = useState<boolean>(false);
    // const [members, setMembers] = useState<MembersProbs[]>([]);
    const {
        // progress,
        // uploadData,
        imagePath
        // setImagePath,
        // deleteData,
        // isFailed,
        // success
    } = useImageUpload();

    const handleExit = () => {};

    return (
        <div className="flex flex-col bg-white border-l border-stone-300 flex-grow items-start justify-between px-5 py-10  debug  relative">
            <div className=" w-full flex flex-col items-center justify-center gap-4 ">
                <div className="justify-center items-center gap-10 inline-flex ">
                    <div className="relative flex items-center justify-center">
                        <Avatar
                            imageUrl={
                                imagePath
                                    ? imagePath
                                    : 'http://localhost:4000/upload/Screenshotfrom2024-01-3004-39-05-1708143657844-107260818.png' // ! group avatar
                            }
                            style="w-32 h-32 bg-black rounded-[150px]  flex-shrink-0"
                        />
                    </div>
                </div>
                <div className="flex  flex-col gap-4 justify-center items-center">
                    {/* {!isModifiable ? ( */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="text-black text-2xl font-normal font-['Acme'] leading-snug tracking-tight">
                            dwada
                        </div>
                    </div>

                    <div className="text-base font-normal font-['Acme']">
                        Group - 5 members
                    </div>
                </div>
            </div>
            <div className="flex-grow w-full max-h-[450px] overflow-y-auto gap-4 flex flex-col items-center justify-start  border border-stone-400 rounded-md  bg-slate-100 px-4 py-4 "></div>
            <div
                className="flex gap-5 cursor-pointer text-red-700 text-lg font-semibold"
                onClick={handleExit}
            >
                <HiLogout size={33} />
                <div>Exit Group</div>
            </div>
        </div>
    );
}

export default GroupPanel;

{
    /* {members.map((member, index) => (
                    <div
                        key={index}
                        className="flex w-full justify-between items-center  "
                    >
                        <div className="flex items-center justify-center gap-1">
                            <Avatar
                                imageUrl={member.avatar}
                                style="w-14 h-14 bg-black rounded-[150px]  mr-2 flex-shrink-0  ring ring-lime-400 ring-offset-base-100 ring-offset-0"
                            />
                            <div className="text-2xl font-normal font-['Acme']">
                                {member.nickName}
                            </div>
                        </div>
                        <Popup
                            trigger={
                                <div
                                    className={`group  text-white  justify-center items-center inline-flex  border-b-4 border-white  hover:border-neutral-100 hover:bg-neutral-100 rounded cursor-pointer`}
                                >
                                    <BsThreeDots
                                        className="cursor-pointer text-black"
                                        size={26}
                                    />
                                </div>
                            }
                            position="bottom center"
                            nested
                        >
                            <div className="py-[5px]  bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex divide-y divide-gray-100 ">
                                {member.actions.map((action) => (
                                    <div
                                        key={action}
                                        className="  text-zinc-600 text-lg font-normal font-['Acme'] self-stretch px-5 border-b border-gray-200 justify-center items-center  inline-flex cursor-pointer hover:bg-neutral-100"
                                    >
                                        {action}
                                    </div>
                                ))}
                            </div>
                        </Popup>
                    </div>
                ))} */
}
{
    /* ) : (
                        <div className="flex items-center justify-center gap-4">
                            <FormComponent
                                fields={[
                                    {
                                        label: '',
                                        type: 'text',
                                        name: 'nickName',
                                        placeholder: 'group name',
                                        validation: {
                                            required: 'Nickname is required!',
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    'Nickname must be less than 15 characters'
                                            },
                                            minLength: {
                                                value: 4,
                                                message:
                                                    'Nickname must be at least 5 characters'
                                            }
                                        }
                                    }
                                ]}
                                onSubmit={() => {}}
                                defaultValues={{ nickName: 'dadwa' }}
                            />
                            <ImCross
                                size={22}
                                className="cursor-pointer"
                                onClick={() => setIsModifiable(false)}
                            />
                        </div>
                    )} */
}
