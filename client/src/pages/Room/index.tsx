import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../../stores/chatStore';
import { Message } from '../../../../shared/types';
import { Avatar, FormComponent, ProgressRingLoader } from '../../components';
import { useUserStore } from '../../stores/userStore';
// import { isAxiosError } from 'axios';
// import toast from 'react-hot-toast';
import { DateFormatter } from '../../tools/date_parsing';
import { MAX_MESSAGE_LENGTH } from '../../constants';
import { HiLogout } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';
import { ImCross } from 'react-icons/im';
import Popup from 'reactjs-popup';
import { BsThreeDots } from 'react-icons/bs';

interface MembersProbs {
    id: string;
    avatar: string;
    nickName: string;
    role: string;
    actions: string[];
}

export function Room() {
    const { id } = useParams();
    const [message, setMessage] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const { socket, updateState, messages, pushMessage } = useChatStore();
    const { id: userId } = useUserStore();
    const contentRef = useRef<HTMLDivElement>(null);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_MESSAGE_LENGTH)
            setMessage(e.target.value);
    };
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [isModifiable, setIsModifiable] = useState<boolean>(false);
    const [members, setMembers] = useState<MembersProbs[]>([]);
    // const [isblocked, setIsblocked] = useState<boolean>(false);
    // const navigate = useNavigate();
    const sendMessage = () => {
        if (message.trim()) {
            socket?.emit('message', { message, id });
            setMessage('');
        }
    };

    // useEffect(() => {
    //     const fetchMembes = async () => {
    //         const res = await fetch('http://localhost:3000/members');
    //         const data = await res.json();
    //         setMembers(data);
    //     };

    //     fetchMembes();
    // }, []);

    const handleExit = () => {};

    useEffect(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axiosPrivate.get(`/chat/room/${id}`);
                console.log(res);
                updateState({
                    messages: res.data.messages
                });
            } catch (error) {
                console.error('There was a problem fetching messages:', error);
            }
        };

        fetchMessages();
        socket?.on('message', (message: Message) => {
            console.log('hello ', message);

            if (id) {
                if (message.id === +id) pushMessage(message);
            }
        });

        return () => {
            socket?.off('message');
        };
    }, [id]);

    return (
        <div className=" flex-grow h-full flex gap-0 ">
            <div className="flex flex-col w-[70%] items-center justify-end ">
                {/* content */}
                <div className="flex-grow w-full bg-gray-200 z-[0] pb-5 overflow-y-auto flex flex-col relative justify-end">
                    {/* Background div */}
                    <img
                        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover"
                        src="../../..//chat-bg.png" // Ensure this path is correct
                        alt="Chat Background"
                    />

                    {/* Messages */}
                    <div className="overflow-y-auto h-full flex flex-col justify-start mt-5">
                        {messages.map((msg, index) => {
                            if (userId !== msg.senderId) {
                                return (
                                    <div
                                        key={index}
                                        className="justify-start flex z-[10] mx-5 gap-2 'flex-row' items-end "
                                    >
                                        <div className="relative inline-block">
                                            <Avatar
                                                imageUrl={msg.avatar}
                                                style="w-11 h-11 bg-black rounded-[150px]  mr-2 flex-shrink-0  ring ring-lime-400 ring-offset-base-100 ring-offset-0"
                                            />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                            <div className="text-lime-400 text-xl  font-normal font-['Acme']">
                                                {/* {msg.senderId} */}
                                                {msg.nickName}
                                            </div>
                                            <div
                                                className="h-9 p-2.5 bg-gray-700 rounded-[10px] justify-start items-center gap-2.5 inline-flex text-white text-sm font-normal font-['Acme'] rounded-tl-none max-w-[320px] "
                                                style={{
                                                    wordWrap: 'break-word'
                                                }}
                                            >
                                                {msg.message}
                                            </div>
                                            {/* <div className="text-gray-600 text-xs leading-none bottom-0">
                                                {DateFormatter(msg.createdAt)}
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={index}
                                    className={`flex z-[10] mx-5  gap-2 flex-row-reverse items-end`}
                                >
                                    <div
                                        key={index}
                                        className={`rounded-lg my-1 p-2 text-sm flex flex-col relative rounded-tr-none speech-bubble-right bg-blue-800 max-w-[320px] text-white`}
                                        style={{ wordWrap: 'break-word' }}
                                    >
                                        {msg.message}
                                    </div>
                                    <div className="text-gray-600 text-xs leading-none bottom-0">
                                        {DateFormatter(msg.createdAt)}
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={contentRef}></div>
                    </div>
                </div>
                <div
                    //  ${isblocked ? 'hidden' : ''}
                    className="flex items-center w-full h-[8%] gap-2 border border-stone-300  bg-white py-2 justify-center"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="send message"
                        className="h-full bg-gray-100 w-full ml-5 border border-stone-300 rounded justify-start pl-4 items-center inline-flex text-neutral-700  outline-none  text-base font-normal font-['Acme']"
                    />
                    <div className=" text-stone-500  w-10 text-xs flex flex-col">
                        <div className="inline-flex justify-between">
                            <div>{message.length}</div>/
                        </div>
                        <div>{MAX_MESSAGE_LENGTH}</div>
                    </div>
                    <RiSendPlaneFill
                        size={38}
                        className="text-blue-800 mr-5 cursor-pointer"
                        onClick={sendMessage}
                    />
                </div>
            </div>
            <div className="flex flex-col bg-white border-l border-stone-300 flex-grow items-start justify-between px-5 py-5 gap-4  ">
                <div className="h-[30%] w-full flex flex-col items-center justify-center gap-8 ">
                    <div className="justify-center items-center gap-10 inline-flex ">
                        <input
                            className="hidden"
                            id="inputTag"
                            type="file"
                            onChange={async (event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    const objectURL = URL.createObjectURL(file);
                                    setImagePath(objectURL);
                                    // await uploadData(file);
                                    event.target.value = '';
                                }
                            }}
                        />
                        <div className="relative flex items-center justify-center">
                            <Avatar
                                imageUrl={
                                    imagePath
                                        ? imagePath
                                        : 'http://localhost:4000/upload/Screenshotfrom2024-01-3004-39-05-1708143657844-107260818.png' // ! group avatar
                                }
                                style="w-32 h-32 bg-black rounded-[150px]  flex-shrink-0"
                                // isloading={!!(progress && progress < 100)}
                                // errror={isFailed}
                            />
                            <label htmlFor="inputTag">
                                <ProgressRingLoader
                                    style={
                                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                    }
                                    radius={72}
                                    stroke={2}
                                    progress={100}
                                />
                            </label>
                            <span
                                className={`absolute bg-[#f9164f] p-0.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white border-solid flex justify-center items-center z-10 cursor-pointer ${
                                    false ? 'hidden' : ''
                                }`}
                                onClick={async (e) => {
                                    e.stopPropagation(); // This stops the event from reaching the label
                                    setImagePath(null);
                                    //  await deleteData()
                                }}
                            >
                                <div className="w-9 h-9 flex justify-center items-center">
                                    <IoTrashOutline
                                        className="text-white"
                                        size={22}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="flex  flex-col gap-4 justify-center items-center">
                        {!isModifiable ? (
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-black text-2xl font-normal font-['Acme'] leading-snug tracking-tight">
                                    dwada
                                </div>
                                <MdEdit
                                    className="cursor-pointer"
                                    size={22}
                                    onClick={() => {
                                        setIsModifiable(true);
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-4">
                                <FormComponent
                                    fields={[
                                        {
                                            label: '',
                                            type: 'text',
                                            name: 'nickName',
                                            placeholder: 'group name',
                                            validation: {
                                                required:
                                                    'Nickname is required!',
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
                        )}

                        <div className="text-base font-normal font-['Acme']">
                            Group - 5 members
                        </div>
                    </div>
                </div>
                <div className="flex-grow w-full max-h-[450px] overflow-y-auto gap-4 flex flex-col items-center justify-start  border border-stone-400 rounded-md  bg-slate-100 px-4 py-4 ">
                    {members.map((member, index) => (
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
                    ))}
                </div>
                <div
                    className="flex gap-5 cursor-pointer text-red-700 text-lg font-semibold"
                    onClick={handleExit}
                >
                    <HiLogout size={33} />
                    <div>Exit Group</div>
                </div>
            </div>
        </div>
    );
}
