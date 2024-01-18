type ProgressBarProps = {
    value: number;
    max?: number;
    color?: string;
};

const ProgressBar = ({
    value,
    max = 100,
    color = 'bg-orange-500'
}: ProgressBarProps) => {
    const progressWidth = `w-${Math.min((value / max) * 100, 100)}%`;

    return (
        <div className="container mx-auto">
            <div className="progress h-4 rounded-full bg-grey">
                <div
                    className={`progress-bar ${progressWidth} rounded-full ${color}`}
                />
            </div>
        </div>
    );
};

export default ProgressBar;


// // type ProgressBarProps = {
// //     value: number;
// //     max: number;
// // };
// // { value, max }: ProgressBarProps)
// // ! men b3d
// const ProgressBar = () => {
//     // Calculate the width of the filled part of the bar
//     // const width = (value / max) * 100;

//     // Define the style for the filled part of the bar
//     // const filledStyle = {
//     //     width: `${width}%`,
//     //     height: '100%',
//     //     backgroundImage: 'linear-gradient(to right, orange , yellow)',
//     //     borderRadius: '8px', // Adjust this value to match your design
//     //     transition: 'width 0.5s ease-in-out' // Smooth transition for the bar animation
//     // };

//     // Define the style for the container of the bar
//     // const containerStyle = {
//     //     width: '100%',
//     //     backgroundColor: 'black', // Background color of the unfilled part
//     //     borderRadius: '8px',
//     //     overflow: 'hidden' // Ensures the inner div doesn't spill out
//     // };

//     return (
//         <div className="w-[100%] h-[25px] relative bg-gradient-to-r from-amber-500 to-stone-50 to-yellow  rounded-[10px] border border-black"/>
//         // <div style={containerStyle}>
//         //     <div style={filledStyle} />
//         // </div>
//     );
// };
// export default ProgressBar;

// // Usage example:
// // <ProgressBar value={50} max={100} />
