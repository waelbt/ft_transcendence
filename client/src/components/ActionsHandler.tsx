import { BiSolidDownArrow } from 'react-icons/bi';
import Popup from 'reactjs-popup';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { FC, useEffect, useState } from 'react';

type ActionsHandlerProps = {
    relationship: string;
    target: string;
};

const ActionsHandler: FC<ActionsHandlerProps> = ({ relationship, target }) => {
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();
    const [actions, setActions] = useState<string[]>(['Block user']);
    const [relation, setRelation] = useState<string>(relationship);

    const { removeUserFriendId, addUserBlockId, addUserFriendId } =
        useUserStore();

    const actionToNewRelation: { [key: string]: string } = {
        'Remove Friend': 'not friend',
        'Block User': 'blocked',
        'Send Request': 'invitation sender',
        'Cancel Request': 'not friend',
        'Accept Request': 'friend',
        'Decline Request': 'not friend'
    };

    const actionEndpoints: { [key in string]: string } = {
        'Remove Friend': `/friends/removeFriend/${target}`,
        'Block User': `/users/blockUser/${target}`,
        'Send Request': `/friends/sendFriendRequest/${target}`,
        'Cancel Request': `/users/removeSentFriendRequest/${target}`,
        'Accept Request': `/friends/acceptFriendRequest/${target}`,
        'Decline Request': `/friends/rejectFriendRequest/${target}`
    };

    const actionEffects: { [key in string]: (id: string) => void } = {
        'Remove Friend': (id) => removeUserFriendId(id),
        'Block User': (id) => addUserBlockId(id),
        'Accept Request': (id) => addUserFriendId(id)
    };

    useEffect(() => {
        console.log(relation)
        if (relation) {
            if (relation == 'blocked') navigate('/error/403');
            let updatedActions = ['Block User']; // Default action

            switch (relation) {
                case 'friend':
                    updatedActions = [
                        // 'Send Message',
                        'Remove Friend',
                        ...updatedActions
                    ];
                    break;
                case 'not friend':
                    updatedActions = ['Send Request', ...updatedActions];
                    break;
                case 'invitation sender':
                    updatedActions = ['Cancel Request', ...updatedActions];
                    break;
                case 'invitation receiver':
                    updatedActions = [
                        'Accept Request',
                        'Decline Request',
                        ...updatedActions
                    ];
                    break;
            }
            setActions(updatedActions);
        }
    }, [relation]);
    const handleAction = async (action: string) => {
        const endpoint = actionEndpoints[action];
        if (!endpoint) {
            console.error(`No endpoint found for action: ${action}`);
            return;
        }

        try {
            const response = await axiosPrivate.post(endpoint);
            console.log('Action response:', response);

            const effect = actionEffects[action];
            if (effect) {
                effect(target);
            }
            if (actionToNewRelation[action]) {
                setRelation(actionToNewRelation[action]);
            }
        } catch (error) {
            console.error(`Error executing action '${action}':`, error);
        }
    };

    return (
        <Popup
            trigger={
                <div
                    className={`group px-2.5 text-white py-[21px] justify-center items-center gap-2.5 inline-flex  border-b-4 border-white  hover:border-neutral-100 hover:bg-neutral-100 rounded cursor-pointer`}
                >
                    <div className="text-neutral-500 text-xl font-normal font-['Acme']">
                        More
                    </div>
                    <BiSolidDownArrow className="text-neutral-500" size={12} />
                </div>
            }
            position="bottom center"
            nested
        >
            <div className="py-[5px] w-[200px] bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex divide-y divide-gray-100 ">
                {actions?.map((action) => (
                    <div
                        key={action}
                        className="text-zinc-600 text-lg font-normal font-['Acme'] self-stretch p-2.5 border-b border-gray-200 justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-neutral-100"
                        onClick={() => handleAction(action)}
                    >
                        {action}
                    </div>
                ))}
            </div>
        </Popup>
    );
};

export default ActionsHandler;
