import React from 'react';

interface User {
    id: string;
    // Add other user properties as needed
}

// interface MuterFormProps {
//     socket?: any; // Replace 'any' with the actual socket type
//     id: string;
//     roomTitle: string;
// }

function MuterForm() {
    // const muteUser = (user: User, muteDuration: number) => {
    //     socket?.emit('muteUser', {
    //         userToMute: user.id,
    //         muteDuration,
    //         roomId: id,
    //         roomTitle
    //     });
    // };

    const muteOptions = [
        { label: 'Mute for 1 min', duration: 1 },
        { label: 'Mute for 1 hour', duration: 60 },
        { label: 'Mute for 1 day', duration: 1440 },
        { label: 'Always', duration: 0 }
    ];

    return (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
            <div className="font-['Acme'] font-normal text-3xl">
                Mute messages
            </div>
            {muteOptions.map((option, index) => (
                <div
                    key={index}
                    className="font-['Acme'] text-gray-800 font-normal text-xl cursor-pointer hover:bg-gray-300 p-2"
                    // onClick={() => muteUser(user, option.duration)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
}

export default MuterForm;
