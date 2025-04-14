import { optionBaseStyles, selectBaseStyles } from "../../../../utils/css/styles";
import { MonthsDTO } from "../../../../utils/date";

interface SelectMonthProps {
    selectedMonth: string;
    setSelectedMonth: (value: string) => void;
    months: MonthsDTO[];
}

const SelectMonth: React.FC<SelectMonthProps> = ({ selectedMonth, setSelectedMonth, months }) => {
    return (
        <div className="min-w-[200px] w-full">
            <label className="block mb-1 text-white/60">Filtrar por Mes</label>
            <select
                className={selectBaseStyles}
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                <option className={optionBaseStyles} value="">TODOS</option>
                {months.map((option, index) => (
                    <option className={optionBaseStyles} value={option.number} key={index}>
                        {option.month}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectMonth;