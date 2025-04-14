interface SelectsProps {
    selected: number;
    setSelected: (index: number) => void;
}
export const Selects: React.FC<SelectsProps> = ({ selected, setSelected }) => {
    const options = ["BALANCES", "RESÚMENES Y FACTURAS"];

    return (
        <div className="grid grid-cols-3 sm:grid-cols-2 bg-gray-300/10 items-center rounded shadow-sm  justify-center">
            {options.map((data, index) => (
                <button
                    key={index}
                    className={`rounded m-1 p-1 ${index===1&&'col-span-2'} sm:col-span-1 transition-colors duration-300 ${selected === index ? "bg-indigo-600  text-white" : "bg-gray-300/0 text-gray-400"
                        }`}
                    onClick={() => setSelected(index)}
                >
                    {data}
                </button>
            ))}
        </div>
    );
};