import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';

function Achievements() {
    const { id: paramId } = useParams();
    const userId = paramId === 'me' ? useUserStore().id : paramId;
    const axiosPrivate = useAxiosPrivate();
    const [achievements, setAchievements] = useState<Record<
        string,
        boolean
    > | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axiosPrivate.get(
            `/users/achievements/${userId}`
        );
        const achievementsData = Object.fromEntries(
            Object.entries(response.data).filter(([key]) => key !== 'UserId')
        ) as Record<string, boolean>;
        setAchievements(achievementsData);
    };

    const achievementImages: { [key: string]: string } = {
        welcome: '../../images/WELCOME.png',
        harban: '../../images/3win.png',
        khari: '../../images/KHARI.png',
        brown: '../../images/BROWN.png',
        silver: '../../images/SILVER.png',
        goldon: '../../images/GOLDEN.png',
        hacker: '../../images/HACKER.png'
    };

    return (
        <div className="overflow-y-auto h-full ">
            <div className="grid grid-cols-4 gap-4 p-6 ">
                {achievements &&
                    Object.entries(achievements).map(([key, value]) => (
                        <div
                            className="flex justify-center items-center m-2 p-2 border border-gray-300 rounded-lg shadow bg-white w-52 h-52 transform transition duration-300 hover:scale-105 cursor-pointer"
                            key={key}
                        >
                            <img
                                src={achievementImages[key]}
                                alt={key}
                                className="max-w-full max-h-full object-contain"
                                style={
                                    !value
                                        ? {
                                              filter: 'grayscale(100%) blur(2px)',
                                              opacity: '0.4'
                                          }
                                        : {}
                                }
                                // grayscale opacity-40
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Achievements;
