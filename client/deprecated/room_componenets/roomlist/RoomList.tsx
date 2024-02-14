// import { useState, ChangeEvent } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import './RoomList.css';
import { useModelStore } from '../../../stores/ModelStore';
import { Modal } from '../..';
import CreateGroup from '../../CreateGroup';
// import RoomTypes from './RoomTypes';
// import { useModelStore } from '../../../stores/ModelStore';

// interface SearchBarProps {
//     // onSearch: (searchText: string) => void;
// }

const RoomList: React.FC = () => {
    const { isEventOpen, openEvent } = useModelStore();

    const handleClick = () => {
        openEvent();
    };
    return (
        <>
            <button className="create_room" onClick={handleClick}>
                <IoMdAddCircle size={50} color="55c255" />
            </button>
            {isEventOpen && (
                <Modal removable={true}>
                    <CreateGroup />
                </Modal>
            )}
        </>
    );
};

export default RoomList;

// const { isEventOpen, closeEvent } = useModelStore();

// const handleTypeSelection = (selectedType: string) => {
//     console.log(`Selected room type: ${selectedType}`);
// };

// const contacts: Contactr[] = [
//     // {
//     //   image:
//     //   "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg",
//     //   id: 1,
//     //   name: "groupe1",
//     //   time: '09:45',
//     // },
//     // {
//     //   image:
//     //     "https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg",
//     //   id: 2,
//     //   name: "groupe2",
//     //   time: '09:45',
//     // },
//     // {
//     //   image:
//     //     "https://cdn.intra.42.fr/users/ea4d0a8aa80f54aaf6e2904e00258a09/mannahri.jpg",
//     //   id: 3,
//     //   name: "groupe",
//     //   time: '09:45',
//     // },
// ];

// <div className="main__roomlist">
//     <div className="conversation-room">
//         {contacts.map((contactr) => (
//             <div key={contactr.id} className="conversation-room-item">
//                 <img src={contactr.image} alt={contactr.name} />
//                 <div>
//                     <p>{contactr.name}</p>
//                     <p> {contactr.time}</p>
//                 </div>
//             </div>
//         ))}
{
    /* <div className="create_room"> */
}

//         {/* </div> */}
//     </div>
// </div>
