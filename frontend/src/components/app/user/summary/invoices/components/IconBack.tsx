import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

interface IconBackSummaryProps {
    onClick: () => void;
}
export function IconBackSummary({ onClick }: IconBackSummaryProps) {
    return (
        <HiOutlineArrowNarrowLeft onClick={onClick} className={`text-[#3E3838] cursor-pointer`} size={24} />
    )
}