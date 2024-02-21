
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
import { useParams } from 'react-router-dom';
import welcomeImage from "../assets/images/WELCOME.png"
import harbanImage from "../assets/images/3win.png"
import khariImage from "../assets/images/KHARI.png"
import brownImage from "../assets/images/BROWN.png"
import silverImage from "../assets/images/SILVER.png"
import goldonImage from "../assets/images/GOLDEN.png"
import hackerImage from "../assets/images/HACKER.png"
import './Achievements.css'



function Achievements() {
    const { id: paramId } = useParams();
    const userId = paramId === 'me' ? useUserStore().id : paramId;
    console.log('iiiiiiiiii = ', userId)
    const axiosPrivate = useAxiosPrivate();
    const [achievements, setAchievements] = useState<Record<string, boolean> | null>(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axiosPrivate.get(`/users/achievements/${userId}`);
        const achievementsData = Object.fromEntries(
            Object.entries(response.data).filter(([key]) => key !== 'UserId')
        ) as Record<string, boolean>;    
        setAchievements(achievementsData);
        console.log("acccch = ", achievementsData)
    };

    const achievementImages = {
        welcome: welcomeImage,
        harban: harbanImage,
        khari: khariImage,
        brown: brownImage,
        silver: silverImage,
        goldon: goldonImage,
        hacker: hackerImage
    };

    return (
        <div  className="scroll-container">
             <div className="achievements-card">
                {achievements &&
                Object.entries(achievements).map(([key, value]) => (
                    <div className="card" key={key}>
                        <img
                            src={achievementImages[key]}
                            alt={key}
                            className={value ? 'achievement-icon color' : 'achievement-icon gray'}
                        />
                    </div>
                ))}
        </div>
        </div>
    );
}


export default Achievements;
