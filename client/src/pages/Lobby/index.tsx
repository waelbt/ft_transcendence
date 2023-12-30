import { useUserStore } from '../../stores';

export function Lobby() {
    const user = useUserStore();

    return (
        <div className="flex flex-col gap-1">
            <div>nickName {user.nickName}</div>
            <div>fullName {user.fullName}</div>
            <div>email {user.email}</div>
            <div>createdAt {user.createdAt}</div>
            <div>inGame {user.inGame}</div>
            <div>isLogged {user.isLogged ? 'true' : false}</div>
            <div>id {user.id}</div>
            <div>F2A {user.F2A}</div>
        </div>
    );
}
