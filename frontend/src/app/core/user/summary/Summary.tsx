import { useLevel } from "../../../../context/LevelContext";
import { ContainerModules } from "../../../hook/containerModules";
import { IconBackHome } from "../components/Icon";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { getSummary } from "../../../../service/get/summary/summary";
import { GetSummaryDTO } from "../../../../types/summary";
import { LoaderHover } from "../../../loaders/Loaders";
import { months, yearsUntilCurrent } from "../../../utils/date";
import SelectYear from "./components/SelectYear";
import SelectMonth from "./components/SelectMonth";

export function Summary({ domain, type }: ComponentProp) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const [summarys, setSummarys] = useState<GetSummaryDTO[]>()
    const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
    console.log(selectedMonth)
    const [selectedYears, setSelectedYears] = useState<string>(new Date().getFullYear().toString())
    //loading
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        try {
            setLoading(true)
            const params: any = {
                year: selectedYears
            }
            if (selectedMonth !== '') {
                params.month = selectedMonth
            }
            const response = await getSummary(params);
            setSummarys(response)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    // Usamos useEffect para retrasar la aparición del footer
    useEffect(() => {
        getData()
        console.log('mes numerico-->', selectedMonth)
        console.log('mes palabra-->', (new Date().getMonth() + 1).toString())
    }, [selectedMonth, selectedYears]);

    return (
        <>
            {loading && (
                <LoaderHover />
            )}
            <ContainerModules type={type} domain={domain}>
                <IconBackHome level={level} />
                {/* PRIMER MODULO RESUMENES */}
                <Header level={level} />
                {/*  <TemplateSelects level={level} /> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 items-center mb-4 gap-4">
                    <SelectMonth months={months} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                    <SelectYear years={yearsUntilCurrent} selectedYear={selectedYears} setSelectedYear={setSelectedYears} />
                </div>
                <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[500px] sm:max-h-[700px]">
                    {summarys && summarys.length > 0 ? (
                        summarys.map((summary, index) => (
                            <Card onCloseOk={getData} level={level} data={summary} key={index} />
                        ))
                    ) : !loading ? (
                        <div className="flex justify-center items-center h-32 w-full col-span-full">
                            <h1 className="text-base text-gray-500">No hay datos</h1>
                        </div>
                    ) : null}
                </div>
            </ContainerModules>
        </>

    )
}
