import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDataUser } from '../service/get/user/user';
import { routesToFechtLevel } from '../content/dataDomain';
import { LevelDto } from '../types/user';

// Definir el tipo para el contexto
interface LevelContextType {
    level: LevelDto;                    // Valor global
    setLevel: (level: LevelDto) => void; // Función para cambiar el valor
}

// Crear el contexto con valores predeterminados
const LevelContext = createContext<LevelContextType | undefined>(undefined);

// Crear el proveedor del contexto
export const LevelProvider = ({ children }: { children: ReactNode }) => {
    const [level, setLevel] = useState<number | null>(null); // El valor inicial de 'level' es null
    //obtener el nivel de la api al montar el componente
    useEffect(() => {
        //verificar si la ruta actual esta dentro de las rutas permitidas
        console.log(location.pathname)
        if (routesToFechtLevel.includes(location.pathname)) {
            const fetchLevel = async () => {
                try {
                    const response = await getDataUser();
                    console.log(response)
                    if (response.nivel_alcanzado !== undefined) {
                        setLevel(response.nivel_alcanzado);
                    } else {
                        toast.error('Error al obtener el nivel del usuario.')
                    }
                } catch (error) {
                    toast.error('Error al obtener el nivel del usuario.')
                }
            }
            fetchLevel()
        }
    }, [])
    return (
        <LevelContext.Provider value={{ level, setLevel }}>
            {children}
        </LevelContext.Provider>
    );
};

// Crear un hook para usar el contexto de manera más sencilla
export const useLevel = (): LevelContextType => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error('useLevel must be used within a LevelProvider');
    }
    return context;
};

// Función para actualizar el valor de 'level'
export const updateLevel = (newLevel: LevelDto) => {
    const { setLevel } = useLevel();
    setLevel(newLevel);
};
