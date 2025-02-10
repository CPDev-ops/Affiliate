import '../utils/loader.scss';
import { useEffect, useState } from 'react';

interface LoaderProps {
    visible: boolean; // Controla si el loader se muestra o no
}

export function LoaderPage({ visible }: LoaderProps) {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShow(true);
        } else {
            // Retrasa la eliminación para que termine la animación
            setTimeout(() => setShow(false), 500);
        }
    }, [visible]);

    return show ? (
        <div className={`loader-container ${visible ? 'visible' : 'hidden'}`}>
            <div className="loader">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="loader__bar"></div>
                ))}
                <div className="loader__ball"></div>
            </div>
        </div>
    ) : null;
}