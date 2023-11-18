import axios from 'axios';
import toast from 'react-hot-toast';

// todo: store svgs in components
export function Auth() {
    const handleIntraClick = async (endpoint : string) => {
        try {
            // Make a GET request to the Intra endpoint
            const response = await axios.get(endpoint);
            // Handle the response as needed
            console.log(response);
            // You could navigate the user to another route or perform other actions
        } catch (error) {
            toast.error(
                `Error fetching Intra data: ${error}`
            );
        }        }
    };
    return (
        <>
            <div className="flex">
                <div className="w-[40%] h-screen overflow-hidden bg-auth-sidebar-image bg-cover bg-no-repeat"></div>
                <div className="bg-white flex-col w-full justify-center items-start gap-2.5 inline-flex ">
                    <div className="flex flex-col justify-start items-start ml-36 gap-8">
                        <div className="font-mona font-bold text-custom">
                            Sign in to Laughtale
                        </div>
                        <div className="py-2 flex-col justify-start items-start gap-3 inline-flex">
                            <div className="px-36 py-5 bg-stone-950 rounded-[47px] justify-center items-center gap-2.5 inline-flex hover:opacity-60 transition-opacity hover:bg-gray-900">
                                <button
                                    className="justify-start items-center gap-[11px] flex "
                                    onClick={async () => handleIntraClick('')} 
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clip-path="url(#clip0_854_2339)">
                                            <path
                                                d="M6.96721 0.657779C4.9689 1.35101 3.24556 2.66679 2.05032 4.41184C0.855082 6.1569 0.250946 8.23925 0.326651 10.353C0.402355 12.4668 1.15391 14.5006 2.47092 16.1557C3.78794 17.8108 5.60099 18.9999 7.64377 19.5484C9.2999 19.9757 11.035 19.9945 12.7 19.6031C14.2083 19.2643 15.6028 18.5396 16.7469 17.5C17.9376 16.3849 18.802 14.9663 19.2469 13.3968C19.7304 11.69 19.8164 9.89519 19.4985 8.14997H10.1985V12.0078H15.5844C15.4768 12.6231 15.2461 13.2103 14.9062 13.7344C14.5663 14.2585 14.1242 14.7086 13.6063 15.0578C12.9487 15.493 12.2073 15.7857 11.4297 15.9172C10.6499 16.0622 9.85011 16.0622 9.07033 15.9172C8.27995 15.7539 7.53227 15.4277 6.87502 14.9593C5.819 14.2118 5.02608 13.1498 4.6094 11.925C4.18579 10.6771 4.18579 9.32437 4.6094 8.07653C4.906 7.20187 5.39632 6.40549 6.04377 5.74684C6.7847 4.97926 7.72273 4.43059 8.75495 4.16102C9.78718 3.89146 10.8737 3.91142 11.8953 4.21872C12.6935 4.4636 13.4233 4.89165 14.0266 5.46872C14.6339 4.86455 15.2401 4.25882 15.8453 3.65153C16.1578 3.32497 16.4985 3.01403 16.8063 2.67965C15.8852 1.82265 14.8042 1.15575 13.625 0.717154C11.4777 -0.0625493 9.12811 -0.0835031 6.96721 0.657779Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M6.96709 0.657806C9.12781 -0.08398 11.4774 -0.0635778 13.6249 0.715618C14.8043 1.1572 15.8848 1.82731 16.8046 2.68749C16.4921 3.02187 16.1624 3.33437 15.8437 3.65937C15.2374 4.26458 14.6317 4.8677 14.0265 5.46874C13.4232 4.89168 12.6933 4.46362 11.8952 4.21874C10.8739 3.91037 9.78743 3.88925 8.75493 4.15772C7.72243 4.42618 6.78383 4.97384 6.04209 5.74062C5.39464 6.39927 4.90432 7.19564 4.60772 8.07031L1.36865 5.56249C2.52804 3.26337 4.53545 1.50472 6.96709 0.657806Z"
                                                fill="#E33629"
                                            />
                                            <path
                                                d="M0.509419 8.04688C0.683388 7.18402 0.972428 6.34843 1.36879 5.5625L4.60786 8.07656C4.18425 9.3244 4.18425 10.6772 4.60786 11.925C3.52869 12.7583 2.449 13.5958 1.36879 14.4375C0.376842 12.463 0.0743142 10.2133 0.509419 8.04688Z"
                                                fill="#F8BD00"
                                            />
                                            <path
                                                d="M10.1984 8.14844H19.4984C19.8164 9.89366 19.7303 11.6885 19.2469 13.3953C18.8019 14.9648 17.9376 16.3834 16.7469 17.4984C15.7016 16.6828 14.6516 15.8734 13.6063 15.0578C14.1245 14.7082 14.5668 14.2576 14.9067 13.733C15.2467 13.2084 15.4771 12.6205 15.5844 12.0047H10.1984C10.1969 10.7203 10.1984 9.43437 10.1984 8.14844Z"
                                                fill="#587DBD"
                                            />
                                            <path
                                                d="M1.36719 14.4375C2.4474 13.6042 3.52708 12.7667 4.60625 11.925C5.02376 13.1504 5.81782 14.2124 6.875 14.9594C7.5343 15.4256 8.28359 15.7492 9.075 15.9094C9.85477 16.0545 10.6546 16.0545 11.4344 15.9094C12.2119 15.778 12.9533 15.4853 13.6109 15.05C14.6562 15.8657 15.7062 16.675 16.7516 17.4907C15.6076 18.5309 14.2132 19.2561 12.7047 19.5954C11.0397 19.9868 9.30457 19.968 7.64844 19.5407C6.3386 19.1909 5.11512 18.5744 4.05469 17.7297C2.93239 16.8385 2.01568 15.7156 1.36719 14.4375Z"
                                                fill="#319F43"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_854_2339">
                                                <rect
                                                    width="20"
                                                    height="20"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="font-mona text-center text-white text-[14px] font-semibold">
                                        Sign in to Google
                                    </div>
                                </button>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-gray-600">
                                        or
                                    </span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                            </div>
                            <div className="px-32 py-5 bg-white rounded-[47px] justify-center items-center gap-2.5 inline-flex border border-black  hover:opacity-60 transition-opacity hover:bg-gray-100">
                                <button className="justify-start items-center gap-[11px] flex">
                                    <svg
                                        width="31"
                                        height="18"
                                        viewBox="0 0 31 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="Group">
                                            <path
                                                id="Vector"
                                                d="M6.02321 4.95629L0.5 9.41042V11.2206V13.0286H6.03125H11.5625V15.2643V17.5L14.3161 17.4957L17.067 17.4892L17.075 13.4541L17.0804 9.42122H11.5571H6.03125L9.16518 6.88742C10.8902 5.49632 13.3705 3.48742 14.683 2.42681L17.067 0.500002H14.308H11.5491L6.02321 4.95629Z"
                                                fill="black"
                                            />
                                            <path
                                                id="Vector_2"
                                                d="M19.4368 2.72485C19.4368 3.94746 19.4448 4.94975 19.4528 4.94975C19.4609 4.94975 20.7011 3.95179 22.2091 2.72917L24.9519 0.510743L24.9546 2.74645V4.98215L22.1957 7.20706L19.4368 9.43196V11.6504V13.871H22.1957H24.9546V11.6504V9.43196L27.7269 7.19626L30.4993 4.96055V2.73133V0.499943H24.968H19.4368V2.72485Z"
                                                fill="black"
                                            />
                                            <path
                                                id="Vector_3"
                                                d="M27.7279 11.6461L24.969 13.871H27.736H30.5002V11.6461C30.5002 10.4213 30.4976 9.42116 30.4922 9.42116C30.4895 9.42116 29.244 10.4213 27.7279 11.6461Z"
                                                fill="black"
                                            />
                                        </g>
                                    </svg>
                                    <div
                                        className="font-mona text-center text-black text-[14px] font-semibold"
                                        onClick={async () => handleIntraClick('')} 
                                    >
                                        Continute with Intra
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
