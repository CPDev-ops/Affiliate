import { optionBaseStylesAffiliate, selectBaseStylesAffiliate } from "../../../../utils/css/styles";
import { YearDTO } from "../../../../utils/date";

interface SelectYearProps {
    selectedYear: string;
    setSelectedYear: (value: string) => void;
    years: YearDTO[];
}

const SelectYear: React.FC<SelectYearProps> = ({ selectedYear, setSelectedYear, years }) => {
    return (
        <div className="min-w-[200px] w-full">
            <label className="block mb-1 text-black">Filtrar por Año</label>
            <select
                className={selectBaseStylesAffiliate}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
            >
                {years.map((option, index) => (
                    <option className={optionBaseStylesAffiliate} value={option.year} key={index}>
                        {option.year}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectYear;
