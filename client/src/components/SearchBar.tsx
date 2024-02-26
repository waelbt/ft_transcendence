import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Popup from 'reactjs-popup';
import { useDebounce } from '../hooks/debouncerHook';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { Friend } from '../../../shared/types';
import { Avatar } from '.';
import { Link } from 'react-router-dom';
import { UserStatus } from './Avatar';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce<string>(searchTerm, 600);
    const axiosPrivate = useAxiosPrivate();
    const [searchResults, setSearchResults] = useState<Friend[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPrivate.get(`/users/search/${searchTerm}`);
            setSearchResults(res.data);
        };
        if (searchTerm.length) fetchData();
        else setSearchResults([]);
    }, [debouncedValue]);

    return (
        <Popup
            trigger={
                <div className="w-[300px] h-11 pl-[15px] pr-2.5 py-2.5 bg-stone-50 rounded-[20px] border border-neutral-200 justify-start items-center gap-2.5 inline-flex">
                    <CiSearch size={24} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for users"
                        className="w-full h-11 p-2.5 bg-transparent rounded-[5px] justify-start items-center gap-2.5 flex  outline-none  text-slate-600 text-base font-normal font-['Acme']"
                    />
                </div>
            }
            position="bottom center"
            nested
        >
            {searchResults.length ? (
                <ul className="w-[300px] pl-2.5 py-2.5 bg-white rounded-bl-[20px] rounded-br-[20px] shadow border border-stone-300 flex-col justify-start items-start    cursor-pointer gap-2.5 inline-flex">
                    {searchResults.map((result, index) => (
                        <Link
                            key={index}
                            className="justify-center items-center gap-2 flex "
                            to={`/profile/${result.id}`}
                        >
                            <Avatar
                                imageUrl={result.avatar}
                                style="w-14 h-14 bg-black rounded-[150px] border border-white"
                                userStatus={result.status as UserStatus}
                                avatarUserId={result.id}
                            />
                            <div className="text-black text-xl font-normal font-['Acme']">
                                {result.nickName}
                            </div>
                            <div className="text-zinc-500 text-base font-normal font-['Acme']">
                                {result.fullName}
                            </div>
                        </Link>
                    ))}
                </ul>
            ) : null}
        </Popup>
    );
}

export default SearchBar;
