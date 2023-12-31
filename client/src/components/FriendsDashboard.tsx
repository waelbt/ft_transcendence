import React, { useState, useEffect } from 'react';
import { Friend } from '../../../shared/types';
import { FriendsTable } from '.';
// import { useOutletContext } from 'react-router-dom';
// import { useUserStore } from '../stores';

// ! implement later
// import SearchBar from './components/SearchBar';
// import FilterButtons from './components/FilterButtons';
// import FriendsTable from './components/FriendsTable';

// ! fix types later
const FriendsDashboard: React.FC = () => {
    const fields = ['all', 'online', 'blocked'];
    const [friends, setFriends] = useState<Friend[]>([]);
    // const profile = useOutletContext();
    // const user = useUserStore();
    // const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/Friends');
                const Friend: Friend[] = await response.json();
                setFriends(Friend);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        // Fetch data from JSON server or local JSON file
        // setFriends(data);
    }, []);

    useEffect(() => {}, []);

    //   const filteredFriends = friends.filter(friend => {

    // return true; // replace with actual condition
    //   });

    //   const searchedFriends = filteredFriends.filter(friend => {
    //     // Implement your search logic here
    //     return friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    //   });

    return (
        <div>
            {/* <SearchBar setSearchTerm={setSearchTerm} /> */}
            <div className=" px-2.5 bg-white justify-start items-center gap-5 inline-flex">
                <div className="grow shrink basis-0 self-stretch px-2.5 justify-between items-center flex">
                    <div className="self-stretch px-2.5 justify-start items-center gap-4 flex">
                        {fields.map((field) => (
                            <div
                                className={`self-stretch p-3 justify-start items-center gap-2.5 flex  text-lg font-normal font-['Acme'] cursor-pointer ${
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
            <FriendsTable friends={friends} />
        </div>
    );
};

export default FriendsDashboard;
