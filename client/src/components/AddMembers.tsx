import { useEffect, useState } from 'react';
import { Avatar } from '.';
import { useDebounce } from '../hooks/debouncerHook';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { Friend } from '../../../shared/types';
import { useUserStore } from '../stores/userStore';
import { useRoomStore } from '../stores/roomStore';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import loadGif from '../assets/loading.gif';

function AddMembers() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce<string>(searchTerm, 500);
    const axiosPrivate = useAxiosPrivate();
    const [searchResults, setSearchResults] = useState<Friend[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const { id } = useUserStore();
    const { id: roomId } = useRoomStore();
    const [isloading, setIsloading] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            const res = await axiosPrivate.get(`/users/search/${searchTerm}`);
            setSearchResults(res.data.filter((user: Friend) => user.id !== id));
            setIsloading(false);
        };

        if (searchTerm.length) fetchData();
        else setSearchResults([]);
    }, [debouncedValue]);

    const handleCheckboxChange = (id: string) => {
        setSelectedIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((prevId) => prevId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    };

    const handleCheckboxDoubleClick = (id: string) => {
        setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    };

    const handleSubmit = async () => {
        if (selectedIds.length) {
            try {
                setIsloading(true);
                const promises = selectedIds.map((id) => {
                    return axiosPrivate.post('/chat/addUserToPrivateRoom', {
                        userId: id,
                        roomId: +roomId
                    });
                });

                await Promise.all(promises);
                toast.success('requests send successfully');
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
            } finally {
                setIsloading(false);
            }
        } else toast.error('select at least one user before submitting');
    };

    return (
        <div className=" py-4  px-6 bg-white rounded flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="text-black text-2xl font-normal font-['Acme']">
                Select Friends
            </div>
            <div className="text-neutral-600 text-base font-normal font-['Acme']">
                you can add 5 more friends{' '}
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for users"
                    className="w-[290px] h-11 p-2.5 bg-neutral-200 rounded-[5px] justify-start items-center gap-2.5 flex  outline-none  text-zinc-600 text-base font-normal font-['Acme']"
                />
                <button
                    className="px-[15px] py-2.5 bg-indigo-800 rounded-[5px] flex-col justify-center items-center  inline-flex text-white text-base font-normal font-['Acme']"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </div>
            <div className="self-stretch  h-[340px] flex-col justify-start items-start gap-2.5 flex overflow-y-auto">
                {isloading ? (
                    <div className="self-stretch h-[340px] flex-col justify-center items-center gap-2.5 flex overflow-y-auto">
                        <img src={loadGif} alt="loading..." />{' '}
                    </div>
                ) : (
                    <div className="self-stretch h-[340px] flex-col justify-start items-start gap-2.5 flex overflow-y-auto">
                        {searchResults.map((result, index) => (
                            <label
                                key={`search${index}`}
                                htmlFor={`checkbox-input${index}`}
                                className="self-stretch p-2.5 border-b border-black border-opacity-30 justify-between items-center inline-flex cursor-pointer"
                            >
                                <div className="justify-center items-center gap-2 flex ">
                                    <Avatar
                                        imageUrl={result.avatar}
                                        style="w-14 h-14 bg-black rounded-[150px] border border-white"
                                    />
                                    <div className="text-black text-xl font-normal font-['Acme']">
                                        {result.nickName}
                                    </div>
                                    <div className="text-zinc-500 text-base font-normal font-['Acme']">
                                        {result.fullName}
                                    </div>
                                </div>
                                <input
                                    id={`checkbox-input${index}`}
                                    type="checkbox"
                                    checked={selectedIds.includes(result.id)}
                                    onChange={() =>
                                        handleCheckboxChange(result.id)
                                    }
                                    onDoubleClick={() =>
                                        handleCheckboxDoubleClick(result.id)
                                    }
                                    className="form-checkbox h-4 w-4 border border-gray-300 rounded-none"
                                />
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddMembers;
