import { useParams } from 'react-router';
import { MessageIcon } from '../assets/custom-icons';
import { useEffect, useState } from 'react';
import { Avatar } from '.';
import { DEFAULT_PATH } from '../constants';
import { BsFillSendFill } from 'react-icons/bs';
function GlobalChat() {
    const params = useParams();
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        // Handle the message sending logic here
        console.log(message);
        setMessage(''); // Clear the input after sending
    };
    useEffect(() => {
        console.log(params);
    }, [params]);

    return (
        <div className="w-[350px] self-stretch p-2.5 bg-white rounded-[20px] shadow flex-col justify-center items-center gap-[13px] inline-flex my-7">
            {/* header */}
            <div className="self-stretch px-2.5 py-[15px] border-b border-neutral-300 justify-between items-center inline-flex">
                <div className="justify-start items-center gap-[5px] flex">
                    <MessageIcon />
                    <div className="text-black text-sm font-normal font-['Acme'] leading-[18.20px] tracking-tight">
                        General Chat
                    </div>
                </div>
                <div className="justify-center items-center gap-[5px] flex">
                    <div className="text-neutral-500 text-sm font-normal font-['Acme']">
                        147
                    </div>
                    <ul className="flex -space-x-4 rtl:space-x-reverse">
                        {Array.from({ length: 3 }, (_, index) => (
                            <Avatar
                                imageUrl={`${DEFAULT_PATH}${index + 1}.png`}
                                style="w-6 h-6 bg-black rounded-[150px] border border-white"
                            />
                        ))}
                    </ul>
                </div>
            </div>
            {/* message */}
            <div className="flex-grow overflow-auto"></div> 
            {/* input */}
            <div className="w-[317px] px-5 bg-zinc-100 rounded-[10px] justify-between     items-center gap-[30px] inline-flex space">
                <input
                    type="text"
                    placeholder="write your message....."
                    className="h-14 text-neutral-400 bg-zinc-100 text-sm font-normal outline-none font-['Acme'] flex-grow"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    // onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <div className="cursor-pointer" onClick={sendMessage}>
                    <BsFillSendFill className="text-blue-500" size={22} />
                </div>
            </div>
            {/* <div className="w-[317px] h-14 pl-5 pr-2.5 py-2.5 bg-zinc-100 rounded-[10px] justify-center items-center gap-[30px] inline-flex">
                <div className="w-[233px] h-9 text-neutral-400 text-sm font-normal font-['Acme']">
                    write your message.....
                </div>
                <div className="w-6 h-6 relative"></div>
            </div> */}
            {/* <div className="self-stretch px-2.5 py-[15px] border-b border-neutral-300 justify-between items-center inline-flex">
                <div className="justify-start items-center gap-[5px] flex">
                    <MessageIcon />
                    <div className="text-black text-sm font-normal font-['Acme'] leading-[18.20px] tracking-tight">
                        General Chat
                    </div>
                </div>
                <div className="justify-center items-center gap-[5px] flex">
                    <div className="text-neutral-500 text-sm font-normal font-['Acme']">
                        147
                    </div>
                    <div className="justify-start items-start flex">
                        <div className="w-6 h-6 justify-center items-center flex">
                            <img
                                className="w-6 h-6 rounded-[150px] border border-stone-900 border-opacity-10"
                                src="https://via.placeholder.com/24x24"
                            />
                        </div>
                        <div className="w-6 h-6 justify-center items-center flex">
                            <img
                                className="w-6 h-6 rounded-[150px] border border-stone-900 border-opacity-10"
                                src="https://via.placeholder.com/24x24"
                            />
                        </div>
                        <div className="w-6 h-6 justify-center items-center flex">
                            <img
                                className="w-6 h-6 rounded-[150px] border border-stone-900 border-opacity-10"
                                src="https://via.placeholder.com/24x24"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pl-5 pr-2.5 py-2.5 bg-zinc-100 rounded-[10px] justify-center items-center gap-[30px] inline-flex">
                <div className="w-[233px] h-9 text-neutral-400 text-sm font-normal font-['Acme']">
                    write your message.....
                </div>
                <div className="w-6 h-6 relative"></div>
            </div> */}
        </div>
    );
}
// <div className="w-[348px] h-[998px] p-2.5 bg-white rounded-[20px] shadow flex-col justify-start items-center gap-[13px] inline-flex">
//     <div className="self-stretch px-2.5 py-[15px] border-b border-neutral-300 justify-between items-start inline-flex">
//         <div className="justify-start items-center gap-[5px] flex">
//             <div className="w-6 h-6 relative"></div>
//             <div className="text-black text-sm font-normal font-['Acme'] leading-[18.20px] tracking-tight">
//                 General Chat
//             </div>
//         </div>
//         <div className="justify-center items-center gap-[5px] flex">
//             <div className="text-neutral-500 text-sm font-normal font-['Acme']">
//                 147
//             </div>
//             <div className="justify-start items-start flex">
//                 <div className="w-6 h-6 justify-center items-center flex">
//                     <img
//                         className="w-6 h-6 rounded-[150px] border border-stone-900 border-opacity-10"
//                         src="https://via.placeholder.com/24x24"
//                     />
//                 </div>
//                 <div className="w-6 h-6 justify-center items-center flex">
//                     <img
//                         className="w-6 h-6 rounded-[150px] border border-stone-900 border-opacity-10"
//                         src="https://via.placeholder.com/24x24"
//                     />
//                 </div>
//                 <div className="w-6 h-6 justify-center items-center flex">
//                     <img
//                         className="w-6 h-6 rounded-[150px] border border-stone-900 border-opacity-10"
//                         src="https://via.placeholder.com/24x24"
//                     />
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div className="h-[842px] p-2.5 bg-white flex-col justify-start items-start gap-2.5 flex">
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-red-600 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-amber-500 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-blue-700 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-fuchsia-600 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-lime-400 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-pink-600 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-yellow-600 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-cyan-400 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-fuchsia-600 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-rose-800 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-red-600 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-zinc-500 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//         <div className="justify-start items-center gap-[22px] inline-flex">
//             <div className="w-[35px] h-[35px] pl-[21px] pr-1.5 pt-[26.50px] pb-[0.50px] rounded-[800px] border border-black justify-end items-center flex">
//                 <div className="w-2 h-2 relative flex-col justify-start items-start flex">
//                     <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
//                 </div>
//             </div>
//             <div className="flex-col justify-start items-start gap-[3px] inline-flex">
//                 <div className="text-zinc-500 text-xs font-normal font-['Acme']">
//                     dos404
//                 </div>
//                 <div className="h-9 p-2.5 bg-neutral-200 rounded-[10px] justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[184px] text-black text-[10px] font-normal font-['Acme']">
//                         orem Ipsum is simply dummy text of the printing
//                         a
//                     </div>
//                 </div>
//             </div>
//             <div className="w-[25px] self-stretch justify-center items-end gap-[200px] flex">
//                 <div className="text-neutral-400 text-xs font-normal font-['Acme']">
//                     15:47
//                 </div>
//             </div>
//         </div>
//     </div>
//     <div className="pl-5 pr-2.5 py-2.5 bg-zinc-100 rounded-[10px] justify-center items-center gap-[30px] inline-flex">
//         <div className="w-[233px] h-9 text-neutral-400 text-sm font-normal font-['Acme']">
//             write your message.....
//         </div>
//         <div className="w-6 h-6 relative"></div>
//     </div>
// </div>

export default GlobalChat;
