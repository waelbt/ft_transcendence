


interface RoomTypesProps {
    onSelectType: (selectedType: string) => void;
  }
  
  const RoomTypes: React.FC<RoomTypesProps> = ({ onSelectType }) => {
    return (
      <div className="room-types">
        <div className="room-type" onClick={() => onSelectType('protected')}>
          Protected
        </div>
        <div className="room-type" onClick={() => onSelectType('private')}>
          Private
        </div>
        <div className="room-type" onClick={() => onSelectType('public')}>
          Public
        </div>
      </div>
    );
};

export default RoomTypes;