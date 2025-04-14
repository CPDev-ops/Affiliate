interface InvoiceToggle {
    typeButton: number;
    modalClick: boolean
    onClick: (value: number) => void
}

export const InvoiceToggle = ({ onClick, typeButton, modalClick }: InvoiceToggle) => {
    return (
        <div className="flex  p-1 rounded-md w-full">
            <button
                className={`flex-1 text-sm font-medium py-2 mx-1 rounded-xl transition-all duration-300 ${typeButton === 1 && !modalClick ? "bg-white shadow-md" : "text-gray-600"
                    }`}
                onClick={() => onClick(1)}
            >
                Ver facturas
            </button>
            <button
                className={`flex-1 text-sm font-medium py-2 mx-1 rounded-xl transition-all duration-300 ${typeButton === 2 || typeButton === 0 || modalClick ? "bg-white shadow-md" : "text-gray-600"
                    }`}
                onClick={() => onClick(2)}
            >
                Nueva factura
            </button>
        </div>
    )
}