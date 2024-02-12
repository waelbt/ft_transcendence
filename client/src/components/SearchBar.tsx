import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Popup from 'reactjs-popup';
import { useDebounce } from '../hooks/debouncerHook';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { Friend } from '../../../shared/types';
import { Avatar } from '.';
import { Link } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce<string>(searchTerm, 500);
    const axiosPrivate = useAxiosPrivate();
    const [searchResults, setSearchResults] = useState<Friend[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPrivate.get(`/users/search/${searchTerm}`);
            setSearchResults(res.data);
        };
        if (searchTerm.length) fetchData();
    }, [debouncedValue]);

    // ? clear searh item
    return (
        <Popup
            trigger={
                <div className="w-[450px] h-[49px] pl-[15px] pr-2.5 py-2.5 bg-stone-50 rounded-[20px] border border-neutral-200 justify-start items-center gap-2.5 inline-flex">
                    <CiSearch size={24} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for users"
                        className="bg-transparent text-neutral-500 text-sm font-normal font-['Poppins'] outline-none w-full"
                    />
                </div>
            }
            position="bottom right"
            nested
        >
            <ul className=" w-[440px] pl-2.5 py-2.5 bg-white rounded-bl-[20px] rounded-br-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-2.5 inline-flex">
                {searchResults.map((result, index) => (
                    <Link
                        key={index}
                        to={`/profile/${result.id}`}
                        className="w-full h-full pl-3 pr-[13px] py-[15px] bg-white border-b border-black border-opacity-40  justify-start items-center gap-2.5 inline-flex"
                    >
                        <Avatar imageUrl={result.avatar} style="w-16 h-16" />

                        <div className="text-black text-base font-normal font-['Acme'] leading-tight">
                            {result.nickName}
                        </div>
                    </Link>
                ))}
            </ul>
        </Popup>
    );
}

export default SearchBar;

<div className="w-[430px] h-[62px] pl-3 pr-[13px] py-[15px] bg-white border-b border-black border-opacity-40 flex-col justify-center items-start inline-flex">
    <div className="justify-center items-center gap-2.5 inline-flex">
        <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/32x32"
        />
        <div className="text-black text-base font-normal font-['Acme'] leading-tight">
            dos404
        </div>
    </div>
</div>;
