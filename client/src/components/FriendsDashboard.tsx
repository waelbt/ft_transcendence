import React, { useState, useEffect } from 'react';
import { Friend } from '../../../shared/types';
import { FriendsTable } from '.';

// ! implement later
// import SearchBar from './components/SearchBar';
// import FilterButtons from './components/FilterButtons';
// import FriendsTable from './components/FriendsTable';

const FriendsDashboard: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    //   const [searchTerm, setSearchTerm] = useState('');
    //   const [filter, setFilter] = useState('all');

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

    //   const filteredFriends = friends.filter(friend => {
    //     // Implement your filtering logic here
    //     return true; // replace with actual condition
    //   });

    //   const searchedFriends = filteredFriends.filter(friend => {
    //     // Implement your search logic here
    //     return friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    //   });

    return (
        <div className="max-h-[400px] overflow-y-auto w-full relative">
            {/* <SearchBar setSearchTerm={setSearchTerm} />
      <FilterButtons setFilter={setFilter} /> */}
            {/* friends={friends} */}
            <FriendsTable friends={friends} />
        </div>
    );
};

export default FriendsDashboard;
