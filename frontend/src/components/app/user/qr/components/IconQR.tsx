import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function IconBackHome({ level }: { level: number }) {
    const navigate = useNavigate()
    console.log(level)
    return (
        <HiOutlineArrowNarrowLeft onClick={() => navigate('/user/balance')} className={`text-white cursor-pointer`} size={24} />
    )
}
