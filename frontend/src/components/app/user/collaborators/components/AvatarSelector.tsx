import { useState } from "react"

interface AvatarOption {
    id: number
    src: string
    alt: string
}

export function ListAvatarSelect() {
    const [selectedAvatar, setSelectedAvatar] = useState<number>(0)
    const avatars: AvatarOption[] = [
        { id: 1, src: "/images/user/collaborators/avatar-1.png", alt: "Avatar 1" },
        { id: 2, src: "/images/user/collaborators/avatar-2.png", alt: "Avatar 2" },
        { id: 3, src: "/images/user/collaborators/avatar-3.png", alt: "Avatar 3" },
        { id: 4, src: "/images/user/collaborators/avatar-4.png", alt: "Avatar 4" },
        { id: 5, src: "/images/user/collaborators/avatar-5.png", alt: "Avatar 5" },
    ]

    return (
        <div className="w-full max-w-md  p-2">
            <h2 className="text-sm  text-[#3E3838] mb-4">Elegir ávatar</h2>
            <div className="flex items-center justify-center gap-5">
                {avatars.map((avatar) => (
                    <button
                        type="button"
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`relative rounded-full w-12 h-12 overflow-hidden transition-transform hover:scale-110 ${selectedAvatar === avatar.id ? "ring-2 ring-blue-500 ring-offset-2" : ""
                            }`}
                    >
                        <img
                            src={avatar.src || "/placeholder.svg"}
                            alt={avatar.alt}
                            className="w-full h-full object-cover rounded-full bg-gray-900"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}