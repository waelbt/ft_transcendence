import React, { useState, useEffect } from 'react';
// import { FriendsTable } from '.';
import FriendCard from './FriendCard';
// import { Friend } from '../../../shared/types';
// import { useOutletContext } from 'react-router-dom';
// import { useUserStore } from '../stores';

// ! implement later
// import SearchBar from './components/SearchBar';
// import FilterButtons from './components/FilterButtons';
// import FriendsTable from './components/FriendsTable';

// ! fix types later
const FriendsDashboard: React.FC = () => {
    const fields = ['all', 'blocked'];
    const [friendsIdList, setFriendsIdList] = useState<string[]>([]);
    const [filter, setFilter] = useState('all');
    // const fields = ['all', 'online', 'blocked'];
    // const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
    // const profile = useOutletContext();
    // const user = useUserStore();
    // const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/friends');
                const data: string[] = await response.json();
                console.log(data);
                setFriendsIdList(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (filter == 'all') setFilteredFriends(friends);
    //     else if (filter == 'online') {
    //         const onlineFriends = friends.filter(
    //             (friend) => friend.status == 'online'
    //         );
    //         setFilteredFriends(onlineFriends);
    //     }
    // }, [filter, friends]);

    //   const filteredFriends = friends.filter(friend => {

    // return true; // replace with actual condition
    //   });

    // const searchedFriends = () => {};

    return (
        <div className="overflow-y-auto max-h-[540px] w-full">
            {/* <SearchBar setSearchTerm={setSearchTerm} /> */}
            <div className=" px-2.5 bg-white justify-start items-center gap-5 inline-flex sticky top-0 z-10 w-full">
                <div className="grow shrink basis-0 self-stretch px-2.5 justify-between items-center flex">
                    <div className="self-stretch px-2.5justify-start items-center gap-4 flex">
                        {fields.map((field) => (
                            <div
                                key={field}
                                className={`self-stretch px-3 py-4 justify-start items-center gap-2.5 flex  text-xl font-normal font-['Acme'] cursor-pointer ${
                                    field == filter
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-zinc-500'
                                } `}
                                onClick={() => {
                                    setFilter(field);
                                }}
                            >
                                <div>{field}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <FriendsTable friendsIdList={friendsIdList} /> */}
            <div className="flex flex-col w-full">
                {friendsIdList.map((friendId: string) => (
                    <FriendCard key={`friend${friendId}`} friendId={friendId} />
                ))}
            </div>
        </div>
    );
};

export default FriendsDashboard;
