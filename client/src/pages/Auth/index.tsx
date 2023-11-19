import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleIcon, IntraIcon } from '../../assets/icons';

// todo: store svgs in components
export function Auth() {
    const handleClick = async () => {
        window.location.href = `http://localhost:4000/auth/google`;
        // // try {
        // //     // Make a GET request to the Intra endpoint
        // //     const response = await axios.get(endpoint);
        // //     // Handle the response as needed
        // //     console.log(response);
        // //     // You could navigate the user to another route or perform other actions
        // // } catch (error) {
        // //     toast.error(`Error fetching Intra data: ${error}`);
        // // }
        // fetch('http://localhost:4000/auth/google')
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.text(); // or response.json() if the response is JSON
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         // Process the data here
        //     })
        //     .catch((error) => {
        //         toast.error(`Error fetching Intra data: ${error}`);
        //     });
    };
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
                            <a className="px-36 py-5 bg-stone-950 rounded-[47px] justify-center items-center gap-2.5 inline-flex hover:opacity-60 transition-opacity hover:bg-gray-900" href="http://localhost:4000/auth/google">
                                <div
                                    className="justify-start items-center gap-[11px] flex "
                                >
                                    <GoogleIcon />
                                    <div className="font-mona text-center text-white text-[14px] font-semibold">
                                        Sign in to Google
                                    </div>
                                </div>
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
                                <button className="justify-start items-center gap-[11px] flex">
                                    <IntraIcon />
                                    <div
                                        className="font-mona text-center text-black text-[14px] font-semibold"
                                        onClick={() => handleClick('/auth/42')}
                                    >
                                        Continue with Intra
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
