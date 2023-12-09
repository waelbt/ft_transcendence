

import './Chat-Form.css';

import attachmentLogo from '../images/icons/attachment-logo.png';

const ChatForm: React.FC = () => {
  return (
    <div id="chat-form">
      <img src={attachmentLogo} alt="Add Attachment" />
      <input type="text" placeholder="Type a message" />
    </div>
  );
}

export default ChatForm;