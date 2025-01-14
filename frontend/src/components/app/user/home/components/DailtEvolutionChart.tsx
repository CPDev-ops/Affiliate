import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { getGradient } from '../../../../config/getGradient'
import { useNavigate } from 'react-router-dom'
import { getDeviceConfig } from '../../../../hook/useDeviceType'

const dailyData = [
    { date: "01/12", value: 20 },
    { date: "02/12", value: 45 },
    { date: "03/12", value: 60 },
    { date: "04/12", value: 35 },
    { date: "05/12", value: 90 },
    { date: "06/12", value: 65 },
    { date: "07/12", value: 55 },
    { date: "08/12", value: 50 },
    { date: "09/12", value: 35 }
]

interface propsComponent {
    level: number
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
}

export function DailyEvolutionChart({ level, isDesktop, isMobile, isTablet }: propsComponent) {
    const chartRef = useRef<HTMLCanvasElement | null>(null)
    const chartInstance = useRef<Chart | null>(null)
    //navigate
    const navigate = useNavigate()
    //obtener la configuracion segun el dispositivo
    const deviceConfig = getDeviceConfig(isDesktop, isTablet, isMobile)

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d')
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy()
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: dailyData.map(item => item.date),
                        datasets: [{
                            label: 'Valor',
                            data: dailyData.map(item => item.value),
                            backgroundColor: 'rgb(34, 200, 50)', // Tailwind green-500
                            borderColor: 'rgb(34, 197, 94)',
                            borderWidth: 1,
                            borderRadius: 12,
                            barThickness: deviceConfig?.barThickness//config dinamica,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: 'rgb(255, 255, 255)',
                                bodyColor: 'rgb(255, 255, 255)',
                                cornerRadius: 4,
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#FFFFFF', // rose-400
                                    font: {
                                        size: deviceConfig?.fontSize//config dinamica
                                    },
                                    maxRotation: 45,
                                    minRotation: 45
                                },
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                ticks: {
                                    color: '#FFFFFF', // rose-400
                                    font: {
                                        size: deviceConfig?.fontSize//config dinamica
                                    },
                                    callback: (value: any) => `${value}`
                                },
                                grid: {
                                    color: 'rgba(244, 63, 94, 0.1)' // rose-400 with low opacity
                                }
                            }
                        },
                    }
                })
            }
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [])

    return (
        <div className={`w-full bg-gradient-to-b ${getGradient(level)} shadow-2xl rounded-xl p-3 `}>
            <h3 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.3)' }} className={`${level !== 0 ? 'text-rose-100' : 'text-black'}  mb-4 `}>Evolución diaria</h3>
            <div className='bg-gradient-to-t from-black/80 to-redCard/0 rounded-md p-2'>
                <div className="h-[250px]">
                    <canvas className='cursor-pointer' onClick={() => navigate('/user/balance')} ref={chartRef}></canvas>
                </div>
            </div>
        </div >
    )
}


