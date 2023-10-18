import React from 'react';

const AvatarOptionsContext = React.createContext<{
    path: string;
    setPath: React.Dispatch<React.SetStateAction<string>>;
}>({
    path: '',
    setPath: () => {}
});

export default AvatarOptionsContext;
