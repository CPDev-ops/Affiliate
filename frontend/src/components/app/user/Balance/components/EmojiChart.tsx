import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';
import { getGradient } from '../../../client/game/utils/utils';
import { generateWeekLabels, getColorByChartText, getColorLineMain, getColorLinesChartBackground, getCurrentMonth } from '../../../../utils/transformData';
import { getDeviceConfig } from '../../../../hook/useDeviceType';
// Registrar componentes de Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip);


interface ChartProps {
    level: number;
    conversionValues: number[]
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
}
export const EmojiOrIconChart = ({ level, conversionValues, isDesktop, isMobile, isTablet }: ChartProps) => {
    const colorByLevel = getColorByChartText(level)
    const colorLines = getColorLinesChartBackground(level)
    const colorLineMain = getColorLineMain(level)

    const chartRef = useRef<ChartJS<'line'> | null>(null);
    //obtener la configuracion segun el dispositivo
    const deviceConfig = getDeviceConfig(isDesktop, isTablet, isMobile)
    // Genera un canvas con un emoji
    const createEmojiCanvas = (emoji: string): HTMLCanvasElement => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas 2D context is not available.');
        }
        canvas.width = 20; // Ajusta el tamaño según sea necesario
        canvas.height = 20;
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
        return canvas;
    };

    // Ejemplo de uso:
    const year = 2025; // Año deseado
    const month = getCurrentMonth() // Enero
    const labels = generateWeekLabels(year, month);

    // Datos iniciales
    const data = {
        labels: labels,
        datasets: [
            {
                data: conversionValues,//aca deberian ir los valores recibidos desde el backend
                borderColor: colorLineMain,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                pointStyle: 'circle' as const, // Estilo inicial
                pointRadius: 10,
                pointHoverRadius: 0,
            },
        ],
    };
    // Configuración del gráfico
    const config = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: colorLines,
                },
                ticks: {
                    font: {
                        size: deviceConfig?.fontSize//config dinamica
                    },
                    color: colorByLevel
                },
            },
            y: {
                grid: {
                    color: colorLines,
                },
                ticks: {
                    font: {
                        size: deviceConfig?.fontSize//config dinamica
                    },
                    color: colorByLevel
                },
            },
        }
    };

    // Handlers para cambiar el estilo de los puntos
    const handleChangeToEmoji = (): void => {
        const chart = chartRef.current;
        if (chart && chart.data.datasets) {
            chart.data.datasets.forEach((dataset) => {
                dataset.pointStyle = createEmojiCanvas('😎');
            });
            chart.update();
        }
    };

    useEffect(() => {
        handleChangeToEmoji()
    }, [level])
    return (

        <div className={`w-full bg-gradient-to-b ${getGradient(level)} shadow-2xl rounded-xl p-3 `}>{/* style={{ width: '100%', margin: 'auto' }} */}
            <h3 className={`${level !== 0 ? 'text-white' : 'text-black'}  mb-4 `}>Evolución diaria</h3>
            <div className=' rounded-md mx-auto  flex justify-center items-center p-2 max-h-[500px] w-full'>
                <Line
                    ref={chartRef}
                    data={data}
                    options={config}
                /* style={{ height: '500px' }} */
                />
            </div>
        </div>
    );
};
