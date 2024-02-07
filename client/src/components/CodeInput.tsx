interface CodeInputProps {
    code: string[];
    style?: string;
    hide: boolean;
    HandleChangeType: (
        index: number
    ) => (event: React.FormEvent<HTMLInputElement>) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
    HandleChangeType,
    code,
    style = 'w-16 h-14 text-center text-black text-xl relative bg-white rounded-[10px] border border-neutral-400',
    hide
}) => {
    return (
        <div
            className={`justify-center items-center gap-[15px] inline-flex ${
                hide ? 'hidden' : ''
            }`}
        >
            {code.map((c, index) => (
                <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength={1}
                    value={c}
                    onChange={HandleChangeType(index)}
                    className={style}
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
            ))}
        </div>
    );
};

export default CodeInput;
