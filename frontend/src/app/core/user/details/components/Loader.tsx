export function CardListLoader() {
    return (
        <li className="flex justify-between items-center text-sm border-b-2 p-3 animate-pulse">
            <div className="flex items-center space-x-3">
                {/* Avatar circle placeholder */}
                <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            </div>
            {/* Info de la visita */}
            <div className="flex flex-col sm:flex-row mr-auto items-start sm:items-center sm:ml-4 space-y-1 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="flex flex-col justify-center w-full sm:w-auto">
                    <div className="text-[#3E3838] font-medium leading-tight">
                        <div className="h-3 w-20 bg-gray-300 animate-pulse"></div>
                        <div className="h-2 w-40 bg-gray-300 mt-1 animate-pulse"></div>
                    </div>
                </div>
            </div>
            {/* Amount */}
            <div className="h-6 w-24 bg-gray-300 animate-pulse"></div>
        </li>
    );
}