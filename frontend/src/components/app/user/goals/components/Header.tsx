
export function Header({ level }: { level: number }) {
    return (
        <div className="flex items-center tracking-wider justify-between mb-6">
            <div>
                <h1 className={`text-lg font-bold uppercase  tracking-widest  ${level !== 0 ? 'text-white' : 'text-[#CF0144]'}`}>OBJETIVOS</h1>
                <p className={`${level !== 0 ? 'text-gray-200' : 'text-stone-700'} text-base font-thin  tracking-wider  `}>La contabilidad de los objetivos es únicamente mensual.</p>
            </div>
        </div>
    )
}