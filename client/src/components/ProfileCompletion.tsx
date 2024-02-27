import { Avatar, ProgressRingLoader, FormComponent } from '../components/';
import { type FieldValues } from 'react-hook-form';
import { NICKNAME_FIELD } from '../constants';
import { useUserStore } from '../stores/userStore';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { IoTrashOutline } from 'react-icons/io5';
import useImageUpload from '../hooks/uploadImageHook';
import toast from 'react-hot-toast';

function ProfileCompletion() {
    const { updateState, logout } = useUserStore();
    // const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
    const axiosPrivate = useAxiosPrivate();
    const {
        progress,
        uploadData,
        imagePath,
        setImagePath,
        deleteData,
        isFailed,
        success
        // setProgress
    } = useImageUpload();

    const handleSubmit = async (data: FieldValues) => {
        try {
            data['avatar'] = success ? imagePath : '';

            const response = await axiosPrivate.post(
                '/users/info',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);
            const updatedState = {
                nickName: data.nickName,
                avatar: data.avatar,
                completeProfile: true,
                redirectedForProfileCompletion: true
            };

            updateState(updatedState);
            toast.success('Profile created successfully');
        } catch (error) {
            // console.log(error.response.data.);
            toast.error('That name is already taken. Try a different one');
        }
    };

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
                    <div className="flex-grow w-full flex flex-col justify-center items-center gap-2.5 mb-10">
                        <div className="px-3.5 py-px flex-col justify-start items-start gap-12 flex">
                            {/* Header */}
                            <div className=" flex-col justify-center items-start inline-flex gap-2">
                                <div className="text-neutral-900 text-3xl font-bold font-sans">
                                    Welcome! Let’s create your profile
                                </div>
                                <div className="text-zinc-600 text-xl font-normal font-sans">
                                    Let others get to know you better!
                                </div>
                            </div>
                            {/* avatar section */}
                            <div className="flex flex-col justify-center items-center w-full gap-4">
                                {/* <span className="text-center text-neutral-500 text-2xl font-normal font-['Acme']">
                                    Add an avatar
                                </span> */}
                                <div className=" pr-3.5 py-px justify-center items-center gap-10 inline-flex">
                                    <input
                                        className="hidden"
                                        id="inputTag"
                                        type="file"
                                        onChange={async (event) => {
                                            const file =
                                                event.target.files?.[0];
                                            if (file) {
                                                const objectURL =
                                                    URL.createObjectURL(file);
                                                setImagePath(objectURL);
                                                await uploadData(file);
                                                event.target.value = '';
                                            }
                                        }}
                                    />
                                    {/* uploader section */}
                                    <div className="relative flex items-center justify-center">
                                        <Avatar
                                            imageUrl={imagePath}
                                            style="p-24 "
                                            isloading={
                                                !!(progress && progress < 100)
                                            }
                                            error={isFailed}
                                        />
                                        <label htmlFor="inputTag">
                                            <ProgressRingLoader
                                                style={
                                                    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                                }
                                                radius={100}
                                                stroke={2}
                                                progress={progress}
                                            />
                                        </label>
                                        <span
                                            className={`absolute bg-[#f9164f] p-0.5 rounded-full border-w bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white border-solid flex justify-center items-center z-10 cursor-pointer ${
                                                !imagePath ? 'hidden' : ''
                                            }`}
                                            onClick={async (e) => {
                                                e.stopPropagation(); // This stops the event from reaching the label
                                                setImagePath(null);
                                                await deleteData();
                                            }}
                                        >
                                            <div className="w-9 h-9 flex justify-center items-center">
                                                <IoTrashOutline
                                                    className="text-white"
                                                    size={22}
                                                />
                                            </div>
                                        </span>
                                    </div>
                                    {/* btn and default section */}
                                </div>
                                {/* nickname section */}
                            </div>
                            <FormComponent
                                fields={NICKNAME_FIELD}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div
                            className="fixed inline-flex bottom-4 left-10 cursor-pointer mr-10 hover:underline underline-offset-1 text-white text-4xl font-normal font-['Acme']"
                            onClick={() => logout()}
                        >
                            leave
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="h-1/4 w-screen -z-1 bg-footer-image bg-cover bg-no-repeat"></div>
            </div>
        </div>
    );
}

export default ProfileCompletion;
