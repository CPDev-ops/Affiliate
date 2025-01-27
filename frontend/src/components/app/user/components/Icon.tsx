import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function IconBackHome({ level }: { level: number }) {
    const navigate = useNavigate()
    console.log(level)
    return (
        <HiOutlineArrowNarrowLeft onClick={() => navigate('/user/balance')} className={`text-[#3E3838]`} size={24} />
    )
}
