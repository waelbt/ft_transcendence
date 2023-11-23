import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleIcon, IntraIcon } from '../../assets/icons';

// todo: store svgs in components
export function Auth() {
    return (
        <>
            {/*container*/}
            <div className="flex">
                {/*side-bar-imamge*/}
                <div className="w-[40%] h-screen overflow-hidden bg-auth-sidebar-image bg-cover bg-no-repeat"></div>
                {/*content*/}
                <div className="bg-white flex-col w-full justify-center items-start gap-2.5 inline-flex ">
                    <div className="flex flex-col justify-start items-start ml-36 gap-8">
                        <div className="font-mona font-bold text-custom">
                            Sign in to Laughtale
                        </div>
                        <div className="py-2 flex-col justify-start items-start gap-3 inline-flex">
                            {/*google btn*/}
                            <a
                                className="px-36 py-5 bg-stone-950 rounded-[47px] justify-center items-center gap-2.5 inline-flex hover:opacity-60 transition-opacity hover:bg-gray-900"
                                href={`${
                                    import.meta.env.VITE_BASE_URL
                                }/auth/google`}
                            >
                                <span className="justify-start items-center gap-[11px] flex ">
                                    <GoogleIcon />
                                    <div className="font-mona text-center text-white text-[14px] font-semibold">
                                        Sign in to Google
                                    </div>
                                </span>
                            </a>
                            <div className="w-full">
                                <div className="flex items-center justify-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-600">
                                        or
                                    </span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                            </div>
                            {/*intra btn*/}
                            <div className="px-32 py-5 bg-white rounded-[47px] justify-center items-center gap-2.5 inline-flex border border-black  hover:opacity-60 transition-opacity hover:bg-gray-100">
                                <a
                                    className="justify-start items-center gap-[11px] flex"
                                    href={`${
                                        import.meta.env.VITE_BASE_URL
                                    }/auth/42`}
                                >
                                    <IntraIcon />
                                    <div className="font-mona text-center text-black text-[14px] font-semibold">
                                        Continue with Intra
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
