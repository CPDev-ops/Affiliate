//importacion manual de imagenes
import imgLevel1 from '/images/goals/level1.png';
import imgLevel2 from '/images/goals/level2.png';
import imgLevel3 from '/images/goals/level3.png';
import imgLevel4 from '/images/goals/level4.png';
import imgLevel5 from '/images/goals/level5.png';

import axios from "axios";
import { GoalsDTO } from "../../../types/goals";
import { baseUrl } from "../../../content/dataDomain";

export const getGoals = async (): Promise<GoalsDTO[]> => {
    try {
        const response = await axios.get(`${baseUrl}/traer_objetivos_user`, {
            withCredentials: true
        });
        console.log(response.data)
        const data = response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error de conexión');
        }
    }
}
// Función para mapear la data con los estilos agregados
export const mapGoalsWithStyles = (goals: GoalsDTO[]): GoalsDTO[] => {
    return goals.map((goal, index) => ({
        ...goal,
        bgColor: LEVEL_STYLES[index]?.bgColor || "from-gray-300 to-gray-600",
        colorBorder: LEVEL_STYLES[index]?.colorBorder || "border-gray-400",
        textColor: LEVEL_STYLES[index]?.textColor || "text-gray-700", // <-- Asegura un string
        img: LEVEL_STYLES[index]?.img || "", // <-- Asegura que sea string
    }));
};

/* 
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
*/

// Definimos los estilos y las imágenes según el índice
const LEVEL_STYLES = [
    {
        bgColor: "from-gradientYellow to-gradientYellowDark",
        colorBorder: "border-colorYellow",
        textColor: "text-white",
        img: imgLevel1,
    },
    {
        bgColor: "from-gradientOrange to-gradientRose",
        colorBorder: "border-gradientOrange",
        textColor: "text-white",
        img: imgLevel2,
    },
    {
        bgColor: "from-gradientGreen to-gradientGreenDark",
        colorBorder: "border-colorGreen",
        textColor: "text-white",
        img: imgLevel3,
    },
    {
        bgColor: "from-gradientBlueLight to-gradientBlue",
        colorBorder: "border-colorCyan",
        textColor: "text-white",
        img: imgLevel4,
    },
    {
        bgColor: "from-gradientPurple to-gradientPurpleDark",
        colorBorder: "border-colorRose",
        textColor: "text-white",
        img: imgLevel5,
    },
];
