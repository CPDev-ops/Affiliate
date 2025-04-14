import { AffiliatePeriodDTO } from "../../../../../types/admin"
import { optionBaseStyles, selectBaseStyles } from "../../../../utils/css/styles"

interface SelectPartnersProps {
    data: AffiliatePeriodDTO[]
    setSelectedPartner: (id: string) => void
    selectedPartner: string
}
const SelectPartners: React.FC<SelectPartnersProps> = ({ data, selectedPartner, setSelectedPartner }) => {


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value
        console.log(selectedId);

        setSelectedPartner(selectedId)

        if (selectedId === "") {
            console.log("Todos los datos:", data)
        } else {
            const filtered = data.filter(item => item.id_affiliate.toString() === selectedId)
            console.log("Datos filtrados:", filtered)
        }
    }

    // Filtrar para que quede un único registro por id_affiliate
    const uniquePartners = Array.from(
        new Map(data.map(item => [item.id_affiliate, item])).values()
    )

    return (
        <div className="min-w-[200px] w-full   ">
            <label className="block  mb-1 text-white/60 ">Filtrar por partner</label>
            <select value={selectedPartner}
                onChange={handleChange} className={selectBaseStyles} >
                <option value="">TODOS</option>
                {uniquePartners.map((partner, index) => (
                    <option className={optionBaseStyles} key={index} value={partner.id_affiliate}>{partner.razon_social_empresa}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectPartners