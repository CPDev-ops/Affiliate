import { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo para el contexto
interface LevelContextType {
    level: number;                    // Valor global
    setLevel: (level: number) => void; // Función para cambiar el valor
}

// Crear el contexto con valores predeterminados
const LevelContext = createContext<LevelContextType | undefined>(undefined);

// Crear el proveedor del contexto
export const LevelProvider = ({ children }: { children: ReactNode }) => {
    const [level, setLevel] = useState<number>(0); // El valor inicial de 'level' es 0
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
export const updateLevel = (newLevel: number) => {
    const { setLevel } = useLevel();
    setLevel(newLevel);
};
