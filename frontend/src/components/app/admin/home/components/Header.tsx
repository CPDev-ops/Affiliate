import { getTextByLevel } from "../../../../utils/transformData";
import { LevelBadge, LevelBadgeImage } from "../../../user/balance/components/LevelBadge";

interface HeaderProps {
    level: number
    userName: string
}
export function Header({ userName, level }: HeaderProps) {
    const color = getTextByLevel(level)
    console.log(color)
    return (
        <div className="flex-col items-center justify-center">
            <div className="flex items-center tracking-wider justify-between  ">
                <div>
                    <h1 className={`text-lg font-bold uppercase  tracking-widest ${color}`}>balances</h1 >
                    <p className={`text-[#3E3838]/90 text-base font-thin  tracking-wider  `}>Hola, {userName}!</p>
                </div>
                <div className="flex-col justify-center items-center ">
                    {level === 0 ? (
                        <LevelBadge level={level} />
                    ) : (
                        <LevelBadgeImage level={level} />
                    )}
                    <h1 className={`mx-auto text-xs font-sans text-center text-[#3E3838]`}>Admin User</h1>
                </div>
            </div>
        </div>
    );
}
