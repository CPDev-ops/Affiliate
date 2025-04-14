import { optionBaseStylesAffiliate, selectBaseStylesAffiliate } from "../../../../utils/css/styles";
import { MonthsDTO } from "../../../../utils/date";

interface SelectMonthProps {
    selectedMonth: string;
    setSelectedMonth: (value: string) => void;
    months: MonthsDTO[];
}

const SelectMonth: React.FC<SelectMonthProps> = ({ selectedMonth, setSelectedMonth, months }) => {
    return (
        <div className="min-w-[200px] w-full">
            <label className="block mb-1 text-black">Filtrar por Mes</label>
            <select
                className={selectBaseStylesAffiliate}
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                <option className={optionBaseStylesAffiliate} value="">TODOS</option>
                {months.map((option, index) => (
                    <option className={optionBaseStylesAffiliate} value={option.number} key={index}>
                        {option.month}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectMonth;