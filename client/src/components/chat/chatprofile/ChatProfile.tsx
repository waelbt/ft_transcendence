import './ChatProfile.css';
// import ChallengeIcon from './ChallengeIcon.tsx';
import contre from '../images/contre.png';
import sortie from '../images/sortie.png';
import interdit from '../images/interdit.png';
interface ChatProfileProps {
  userProfileImage: string;
  userName: string;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ userProfileImage, userName }) => {
  return (
    <div className="chat-profile"><center>
      <div className="profile-image">
        <img  src="https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg" alt={`Profile of ${userName}`} />
      </div>
      <div className="user-details">
        <p className="user-name">Dos os</p>
      </div>
      <div className="action-buttons">
        
        <div className="challengcontainer" >
          <img  src={contre} alt="vs" width={24}  height={24}/>
          <button className="challenge-button">
          Challenge</button>
        </div>

        <div className="seeprofilecontainer">
          <img  src={sortie} alt="profile" width={24}  height={24}/>
          <button className="see-profile-button">See Profile</button>
        </div>
        
        <div className="blockcontainer">
          <img  src={interdit} alt="profile" width={18}  height={18}/>
          <button className="block-button">Block</button>
        </div>
        
      </div>
      </center>
    </div>
  );
};

export default ChatProfile;