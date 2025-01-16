import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function IconBackHome({ level }: { level: number }) {
    const navigate = useNavigate()
    return (
        <FaLongArrowAltLeft onClick={() => navigate('/user/home')} className={`${level !== 0 ? 'text-white' : 'text-[#6C6C6C]'}`} size={24} />
    )
}
