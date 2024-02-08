import { TwoFaVerfication, ProfileCompletion } from '../../src/components';
import { useUserStore } from '../../src/stores/userStore';

function Verfication() {
    const { f2A } = useUserStore();

    return (
        <div className="flex flex-col h-screen shadow-2xl">
            {/* Content */}
            <div className="flex flex-col flex-grow shadow-custom z-0">
                {/* Header */}
                <div className="px-7 py-8 justify-start items-center gap-2.5 inline-flex">
                    <div className="text-black text-lg font-lemonada font-bold">
                        LaughTale
                    </div>
                </div>
                {/* content */}
                <div className="flex-grow w-full flex flex-col justify-center items-center gap-2.5">
                    {/* // !fix conditions logic later */}
                    {f2A ? <TwoFaVerfication /> : <ProfileCompletion />}
                </div>
                {/* Footer */}
                <div className="h-1/4 w-screen -z-1 bg-footer-image bg-cover bg-no-repeat"></div>
            </div>
        </div>
    );
}

export default Verfication;
