import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';
import { backgroundByIndex, generateWeekLabels, getColorByChartText, getColorLinesChartBackground, getCurrentMonth, getTextByLevel } from '../../../../utils/transformData';
import { getDeviceConfig } from '../../../../hook/useDeviceType';
import { getGradient } from '../../../client/game/utils/utils';

// Registrar componentes de Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip);

interface ChartProps {
    level: number;
    conversionValuesList: number[][]; // Cambiado para aceptar múltiples datasets
    isMobile: boolean;
    names: string[]
    isTablet: boolean;
    isDesktop: boolean;
}

export const AllCollaboratorsChart = ({ level, names, conversionValuesList, isDesktop, isMobile, isTablet }: ChartProps) => {
    const colorByLevel = getColorByChartText(level);
    const colorLines = getColorLinesChartBackground(level);

    const chartRef = useRef<ChartJS<'line'> | null>(null);

    const deviceConfig = getDeviceConfig(isDesktop, isTablet, isMobile);

    const createEmojiCanvas = (emoji: string): HTMLCanvasElement => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas 2D context is not available.');
        }
        canvas.width = 20;
        canvas.height = 20;
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
        return canvas;
    };

    const year = 2025;
    const month = getCurrentMonth();
    const labels = generateWeekLabels(year, month);

    // Generar datasets dinámicamente
    const datasets = conversionValuesList.map((values, index) => ({
        data: values,
        label: names[index] || `Dataset ${index + 1}`, // Etiqueta para cada línea
        borderColor: `hsl(${index * 360 / conversionValuesList.length}, 70%, 50%)`, // Colores dinámicos y únicos
        backgroundColor: `rgba(${200 - index * index}, ${0 + index * index}, 0, 0.5)`, // Cambiar color dinámicamente
        pointStyle: createEmojiCanvas('😎'), // Primer dataset con círculo, los demás con emoji
        pointRadius: 10,
        pointHoverRadius: 0,
    }));

    const data = {
        labels: labels,
        datasets: datasets,
    };

    const config = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: colorLines,
                },
                ticks: {
                    font: {
                        size: deviceConfig?.fontSize,
                    },
                    color: colorByLevel,
                },
            },
            y: {
                grid: {
                    color: colorLines,
                },
                ticks: {
                    font: {
                        size: deviceConfig?.fontSize,
                    },
                    color: colorByLevel,
                },
            },
        },

    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [level, conversionValuesList]);

    return (
        <div className=''>
            {/* Mostrar los nombres en la parte superior */}
            <div className="flex-col justify-center items-center  mb-4">
                <h1 className={`text-start ${getTextByLevel(level)}`}>Comparativas de ingresos por período</h1>
                <div className='grid grid-cols-2 lg:grid-cols-3 w-full gap-4 justify-center mx-auto   items-center '>
                    {names.map((name, index) => (
                        <div key={index} className="flex bg-[#3E3838] p-2 rounded-full items-center space-x-2">
                            {/* Círculo pequeño */}
                            <div

                                className={`w-4 h-4 rounded-full ${backgroundByIndex(index)}`}
                            ></div>
                            {/* Nombre del usuario */}
                            <span className='text-xs'
                                style={{
                                    color: `white`, // Colores dinámicos para coincidir con las líneas
                                }}
                            >
                                {name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`w-full bg-gradient-to-b ${getGradient(level)} shadow-2xl rounded-xl p-3 `}>
                <h3 className={`${level !== 0 ? 'text-white' : 'text-black'} mb-4`}>Ingresos diarios</h3>
                <div className="rounded-md mx-auto flex justify-center items-center p-2 max-h-[500px] w-full">
                    <Line ref={chartRef} data={data} options={config} />
                </div>
            </div>
        </div>
    );
};
