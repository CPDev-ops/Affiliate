import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface CustomSelectProps {
    array: string[]
}
export function CustomSelect({ array }: CustomSelectProps) {
    const [selected, setSelected] = useState("TODOS");
    const [isOpen, setIsOpen] = useState(false);

    const options = array;

    return (
        <div className="relative inline-block text-left w-48 ">
            {/* SELECT BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-2  text-sm font-bold text-gray-900 uppercase"
            >
                {selected}
                {isOpen ? <IoIosArrowUp className="text-blue-600 text-sm" /> : <IoIosArrowDown className="text-blue-600 text-sm" />}

            </button>

            {/* DOTTED BORDER */}
            <div className="border-t-2 border-dotted border-blue-600 w-full"></div>

            {/* OPTIONS DROPDOWN */}
            {isOpen && (
                <ul className="absolute w-full bg-white border border-gray-300 shadow-md rounded-md mt-1 z-10">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => { setSelected(option); setIsOpen(false); }}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-xs text-gray-900"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}