import { RiCloseLargeFill } from "react-icons/ri";
import { getBackgroundButtonModal, getTextByLevel } from "../../../../utils/transformData";
import { ListAvatarSelect } from "./AvatarSelector";
import { getBorderInput } from "./CollaboratorCard";
import { SubmitHandler, useForm } from "react-hook-form";


interface FormData {
    date: string;
    dni: string;
    mail: string;
    phone: string;
    name: string;
    lastName: string;
}

interface ModalProps {
    level: number;
    close: () => void;
}

export function ModalForm({
    level,
    close,
}: ModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        console.log("Form data:", data);
        alert('creado con exito')
        close()
    };

    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-white w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto mt-4 text-black mr-4" />
                <h1 className={`  mx-auto uppercase ${getTextByLevel(level)} text-xl mb-4 text-center font-semibold`}>Nuevo Colaborador</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2 text-black text-sm gap-4 mb-4 mx-[1rem]"
                >
                    {/* NOMBRE */}
                    <div className="col-span-1">
                        <label className="text-[#3E3838]/90 block">Nombre</label>
                        <input
                            {...register("name", {
                                required: "El Nombre es obligatorio",
                            })}
                            className={`p-2 border ${getBorderInput(level)} rounded-md w-full`}
                            autoComplete="off"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name.message}</p>
                        )}
                    </div>
                    {/* APELLIDO */}
                    <div className="col-span-1">
                        <label className="text-[#3E3838]/90 block">Apellido</label>
                        <input
                            {...register("lastName", {
                                required: "El Apellido es obligatorio",
                            })}
                            className={`p-2 border ${getBorderInput(level)} rounded-md w-full`}
                            autoComplete="off"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                        )}
                    </div>
                    {/* Fecha de nacimiento */}
                    <div>
                        <label className="text-[#3E3838]/90 block">Fecha nacimiento</label>
                        <input
                            {...register("date", { required: "La fecha es obligatoria" })}
                            type="date"
                            className={`p-2 border ${getBorderInput(level)} rounded-md w-full`}
                            autoComplete="off"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-xs">{errors.date.message}</p>
                        )}
                    </div>

                    {/* DNI */}
                    <div>
                        <label className="text-[#3E3838]/90 block">DNI</label>
                        <input
                            {...register("dni", { required: "El DNI es obligatorio" })}
                            type="number"
                            className={`p-2 border ${getBorderInput(level)} rounded-md w-full`}
                            autoComplete="off"
                        />
                        {errors.dni && (
                            <p className="text-red-500 text-xs">{errors.dni.message}</p>
                        )}
                    </div>

                    {/* Mail */}
                    <div className="col-span-2">
                        <label className="text-[#3E3838]/90 block">Mail</label>
                        <input
                            {...register("mail", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "El correo no es válido",
                                },
                            })}
                            type="email"
                            className={`p-2 border ${getBorderInput(level)} rounded-md w-full`}
                            autoComplete="off"
                        />
                        {errors.mail && (
                            <p className="text-red-500 text-xs">{errors.mail.message}</p>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div className="col-span-2">
                        <label className="text-[#3E3838]/90 block">Teléfono</label>
                        <input
                            {...register("phone", {
                                required: "El teléfono es obligatorio",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "El teléfono solo puede contener números",
                                },
                            })}
                            type="tel"
                            className={`p-2 border ${getBorderInput(level)} rounded-md w-full`}
                            autoComplete="off"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs">{errors.phone.message}</p>
                        )}
                    </div>
                    {/* LISTA AVATARES */}
                    <div className="col-span-2">
                        <ListAvatarSelect />
                    </div>
                    {/* Botones */}
                    <div className="col-span-2 flex gap-4">
                        <button
                            type="submit"

                            className={`shadow-2xl w-full ${getBackgroundButtonModal(
                                level
                            )} p-3 rounded-md shadow-lg uppercase text-white tracking-widest`}
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

