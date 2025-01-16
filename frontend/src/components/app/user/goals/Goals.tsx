import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion"
import { Header } from "./components/Header";
import { CardListV3 } from "./components/CardListV3";

//importacion manual de imagenes
import imgLevel1 from '/images/goals/level1.png';
import imgLevel2 from '/images/goals/level2.png';
import imgLevel3 from '/images/goals/level3.png';
import imgLevel4 from '/images/goals/level4.png';
import imgLevel5 from '/images/goals/level5.png';
import { useLevel } from "../../../../context/LevelContext";
import { IconBackHome } from "../components/Icon";



export function Goals() {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const levels = [
        {
            level: 1,
            range: "DE 11 A 100 PERSONAS",
            credits: "2000",
            bgColor: "from-gradientYellow to-gradientYellowDark",
            colorBorder: 'border-colorYellow',
            textColor: 'text-yellowText',
            img: imgLevel1 // Imagen del nivel 1
        },
        {
            level: 2,
            range: "DE 101 A 200 PERSONAS",
            credits: "3000",
            bgColor: "from-gradientOrange to-gradientRose",
            colorBorder: 'border-gradientOrange',
            textColor: 'text-yellowText',
            img: imgLevel2 // Imagen del nivel 2
        },
        {
            level: 3,
            range: "DE 201 A 300 PERSONAS",
            credits: "5000",
            bgColor: "from-gradientGreen to-gradientGreenDark",
            colorBorder: 'border-colorGreen',
            textColor: 'text-yellowText',
            img: imgLevel3 // Imagen del nivel 3
        },
        {
            level: 4,
            range: "DE 301 A 500 PERSONAS",
            credits: "6000",
            bgColor: "from-gradientBlueLight to-gradientBlue",
            colorBorder: 'border-colorCyan',
            textColor: 'text-yellowText',
            img: imgLevel4 // Imagen del nivel 4
        },
        {
            level: 5,
            range: "DE 501 EN ADELANTE",
            credits: "10000",
            bgColor: "from-gradientPurple to-gradientPurpleDark",
            colorBorder: 'border-colorRose',
            textColor: 'text-yellowText',
            img: imgLevel5 // Imagen del nivel 5
        }
    ];

    return (
        <div className="max-w-md sm:max-w-full mx-auto min-h-screen">
            <Navbar level={level} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-4 sm:max-w-4xl lg:max-w-7xl mx-auto">
                    <IconBackHome level={level} />
                    <Header level={level} />
                </div>
                <div className="max-w-md sm:max-w-4xl lg:max-w-7xl mx-auto  p-4 h-[700px] overflow-y-auto">
                    <ul className="space-y-2">
                        {levels.map((levelDate) => (
                            <CardListV3 userLevel={level} colorText={levelDate.textColor} img={levelDate.img} colorBorder={levelDate.colorBorder} bgColor={levelDate.bgColor} credits={levelDate.credits} level={levelDate.level} range={levelDate.range} />
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    )
}