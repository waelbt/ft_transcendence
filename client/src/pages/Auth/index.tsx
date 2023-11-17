import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { api as axios } from '../../axios-utils'; // nsmiha request


export function Auth() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleFormm = (formName: string) => {
        setCurrentForm(formName);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-primary bg-cover bg-no-repeat blur-sm -z-10"></div>
            <div className="flex w-full h-screen justify-center items-center">
                <div className="inline-flex flex-col items-center gap-9">
                    <div className="text-center text-yellow text-6xl font-BombSound">
                        who want to play
                        <br />
                        Video games?
                    </div>
                    <div className="flex p-9 flex-col items-center gap-4 rounded-3xl bg-blue-opacity-70 shadow-custom">
                        <div className="flex items-start gap-6">
                            {/* 42 button */}
                            <button className="bg-primary-blue flex border-0 px-6 py-3 justify-center items-center gap-2 rounded-custom hover:bg-pink">
                                <svg
                                    className="w-7.5 h-6 flex-shrink-0 bg-contain bg-no-repeat"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="25"
                                    viewBox="0 0 30 25"
                                >
                                    <g id="Group">
                                        <path
                                            id="Vector"
                                            d="M5.52321 6.79123L0 13.0794V15.6349V18.1874H5.53125H11.0625V21.3437V24.5L13.8161 24.4939L16.567 24.4848L16.575 18.7882L16.5804 13.0947H11.0571H5.53125L8.66518 9.51753C10.3902 7.55362 12.8705 4.71754 14.183 3.2202L16.567 0.5H13.808H11.0491L5.52321 6.79123Z"
                                            fill="white"
                                        />
                                        <path
                                            id="Vector_2"
                                            d="M18.9375 3.64125C18.9375 5.3673 18.9455 6.78229 18.9536 6.78229C18.9616 6.78229 20.2018 5.37339 21.7098 3.64735L24.4527 0.515453L24.4554 3.67174V6.82803L21.6964 9.96907L18.9375 13.1101V16.242V19.377H21.6964H24.4554V16.242V13.1101L27.2277 9.95383L30 6.79754V3.6504V0.500204H24.4687H18.9375V3.64125Z"
                                            fill="white"
                                        />
                                        <path
                                            id="Vector_3"
                                            d="M27.2277 16.2359L24.4688 19.377H27.2357H30V16.2359C30 14.5068 29.9973 13.0949 29.992 13.0949C29.9893 13.0949 28.7437 14.5068 27.2277 16.2359Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                                <span className="text-white text-center font-inter text-sm font-semibold">
                                    Network
                                </span>
                            </button>
                            {/* google button */}
                            <button className="intra-button bg-white flex border-0 px-6 py-3 justify-center items-center gap-2 rounded-custom hover:bg-primary-blue" onClick={async () => {
                                const res = await axios.get('/auth/google');
                                console.log("response :       ", res);
                            }}>
                                <svg
                                    className="nested w-7.5 h-6 flex-shrink-0 bg-contain bg-no-repeat"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="27"
                                    viewBox="0 0 28 27"
                                >
                                    <g
                                        id="devicon:google"
                                        clipPath="url(#clip0_177_1312)"
                                    >
                                        <path
                                            id="Vector"
                                            d="M9.90495 0.888661C7.20723 1.82452 4.88072 3.60082 3.26715 5.95665C1.65358 8.31247 0.837996 11.1237 0.940197 13.9773C1.0424 16.8309 2.057 19.5765 3.83497 21.8109C5.61293 24.0452 8.06055 25.6505 10.8183 26.391C13.0541 26.9679 15.3965 26.9932 17.6442 26.4648C19.6805 26.0075 21.563 25.0291 23.1075 23.6256C24.715 22.1203 25.8819 20.2052 26.4825 18.0864C27.1352 15.7822 27.2514 13.3592 26.8221 11.0031H14.2671V16.2112H21.5382C21.3928 17.0418 21.0814 17.8346 20.6226 18.5421C20.1637 19.2496 19.5669 19.8572 18.8677 20.3287C17.9799 20.9162 16.979 21.3114 15.9293 21.4888C14.8766 21.6846 13.7969 21.6846 12.7442 21.4888C11.6771 21.2685 10.6678 20.8281 9.7805 20.1958C8.35487 19.1866 7.28443 17.753 6.7219 16.0994C6.15003 14.4148 6.15003 12.5886 6.7219 10.904C7.12232 9.72318 7.78426 8.64807 8.65831 7.75889C9.65856 6.72266 10.9249 5.98195 12.3184 5.61804C13.7119 5.25413 15.1787 5.28108 16.5579 5.69593C17.6354 6.02652 18.6207 6.60439 19.4351 7.38343C20.255 6.5678 21.0734 5.75007 21.8904 4.93022C22.3123 4.48936 22.7721 4.0696 23.1877 3.61819C21.9443 2.46124 20.4849 1.56093 18.893 0.968817C15.9941 -0.0837824 12.8222 -0.11207 9.90495 0.888661Z"
                                            fill="white"
                                        />
                                        <path
                                            id="Vector_2"
                                            d="M9.90555 0.887733C12.8225 -0.113678 15.9944 -0.0861352 18.8936 0.96578C20.4857 1.56191 21.9445 2.46656 23.1862 3.62781C22.7643 4.07922 22.3192 4.50109 21.8889 4.93984C21.0705 5.75687 20.2527 6.57109 19.4357 7.3825C18.6213 6.60346 17.636 6.02559 16.5585 5.695C15.1798 5.27869 13.713 5.25019 12.3191 5.61261C10.9253 5.97503 9.65814 6.71438 8.6568 7.74953C7.78274 8.63871 7.1208 9.71381 6.72039 10.8946L2.34766 7.50906C3.91283 4.40524 6.62283 2.03106 9.90555 0.887733Z"
                                            fill="#E33629"
                                        />
                                        <path
                                            id="Vector_3"
                                            d="M1.18734 10.8637C1.42219 9.69882 1.8124 8.57077 2.34749 7.50977L6.72023 10.9037C6.14835 12.5883 6.14835 14.4146 6.72023 16.0991C5.26335 17.2241 3.80578 18.3548 2.34749 19.491C1.00836 16.8254 0.599946 13.7883 1.18734 10.8637Z"
                                            fill="#F8BD00"
                                        />
                                        <path
                                            id="Vector_4"
                                            d="M14.2685 11H26.8235C27.2528 13.356 27.1366 15.7791 26.4839 18.0833C25.8832 20.2021 24.7164 22.1171 23.1089 23.6225C21.6977 22.5214 20.2802 21.4287 18.8691 20.3277C19.5687 19.8557 20.1658 19.2474 20.6247 18.5392C21.0836 17.8309 21.3947 17.0373 21.5395 16.2059H14.2685C14.2664 14.472 14.2685 12.736 14.2685 11Z"
                                            fill="#587DBD"
                                        />
                                        <path
                                            id="Vector_5"
                                            d="M2.3457 19.4915C3.80398 18.3665 5.26156 17.2359 6.71844 16.0996C7.28208 17.7538 8.35406 19.1875 9.78125 20.196C10.6713 20.8254 11.6828 21.2622 12.7513 21.4785C13.8039 21.6743 14.8837 21.6743 15.9364 21.4785C16.9861 21.3011 17.987 20.9059 18.8748 20.3184C20.2859 21.4195 21.7034 22.5121 23.1146 23.6132C21.5703 25.0175 19.6878 25.9965 17.6513 26.4545C15.4036 26.9829 13.0612 26.9576 10.8254 26.3807C9.05711 25.9086 7.40541 25.0763 5.97383 23.9359C4.45872 22.7328 3.22117 21.2168 2.3457 19.4915Z"
                                            fill="#319F43"
                                        />
                                    </g>
                                </svg>
                                <span className="nested text-[#3686f7] text-center font-inter text-sm font-semibol">
                                    <span className="nested text-[#3686f7]">
                                        G
                                    </span>
                                    <span className="nested text-[#ff302f]">
                                        o
                                    </span>
                                    <span className="nested text-[#ffba40]">
                                        o
                                    </span>
                                    <span className="nested">g</span>
                                    <span className="nested text-[#20b15a]">
                                        l
                                    </span>
                                    <span className="nested text-[#ff302f]">
                                        e
                                    </span>
                                </span>
                            </button>
                        </div>
                        <div className="flex justify-center items-center gap-1 h-8 text-white text-center font-inter text-lg font-normal leading-normal">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="1"
                                viewBox="0 0 64 1"
                            >
                                <line
                                    x1="0"
                                    y1="0.5"
                                    x2="64"
                                    y2="0.5"
                                    stroke="#ffffff"
                                    strokeOpacity="0.7"
                                    strokeWidth="1"
                                />
                            </svg>
                            or
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="1"
                                viewBox="0 0 64 1"
                            >
                                <line
                                    x1="0"
                                    y1="0.5"
                                    x2="64"
                                    y2="0.5"
                                    stroke="#ffffff"
                                    strokeOpacity="0.7"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>{' '}
                        {currentForm === 'login' ? (
                            <LoginForm onFormSwitch={toggleFormm} />
                        ) : (
                            <RegisterForm onFormSwitch={toggleFormm} />
                        )}{' '}
                    </div>
                </div>
            </div>
        </>
    );
}
