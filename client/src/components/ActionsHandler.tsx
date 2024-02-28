import { BiSolidDownArrow } from 'react-icons/bi';
import Popup from 'reactjs-popup';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { FC, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ACTIONS_ENDPOINTS, ACTION_TO_KNOW_RELATION } from '../constants';
import { useChatLayoutStore } from '../stores/chatLayoutStore';

type ActionsHandlerProps = {
    relationship: string;
    target: string;
};

const ActionsHandler: FC<ActionsHandlerProps> = ({ relationship, target }) => {
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();
    const [actions, setActions] = useState<string[]>(['Block user']);
    const [relation, setRelation] = useState<string>(relationship);
    const { socket } = useChatLayoutStore();
    const { removeUserFriendId, addUserBlockId, addUserFriendId } =
        useUserStore();

    const actionEffects: { [key in string]: (id: string) => void } = {
        'Remove Friend': (id) => removeUserFriendId(id),
        'Block User': (id) => {
            addUserBlockId(id);
            navigate(-1);
        },
        'Accept Request': (id) => {
            addUserFriendId(id);
        }
    };

    useEffect(() => {
        // console.log(relation);
        if (relation) {
            let updatedActions = ['Send Message', 'Block User'];

            switch (relation) {
                case 'friend':
                    updatedActions = ['Remove Friend', ...updatedActions];
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
        if (action === 'Send Message') {
            try {
                const res = await axiosPrivate.post('/chat/createDm', {
                    friendId: target
                });
                // console.log(res);
                socket?.emit('checkDm', { friendId: target });
                navigate(`/chat/dms/${res.data.id}`);
            } catch (error) {
                if (isAxiosError(error))
                toast.error(error.response?.data?.message);            }
        } else {
            const endpoint = ACTIONS_ENDPOINTS[action];
            if (!endpoint) {
                toast.error(`No endpoint found for action: ${action}`);
                return;
            }

            try {
                const res = await axiosPrivate.post(`${endpoint}${target}`);

                const effect = actionEffects[action];
                if (effect) {
                    effect(target);
                }
                if (ACTION_TO_KNOW_RELATION[action]) {
                    setRelation(ACTION_TO_KNOW_RELATION[action]);
                }
            } catch (error) {
                if (isAxiosError(error))
                    toast.error(error.response?.data?.message);
            }
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
