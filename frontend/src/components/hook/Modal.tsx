import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    domain: string
}

export const Modal = ({ isOpen, onClose, children, domain }: ModalProps) => {
    return (
        <div style={{ zIndex: 100 }}
            className={`fixed inset-0 ${isOpen ? "block" : "hidden"} overflow-y-auto`}
        >
            <div className="flex items-center justify-center min-h-screen">
                <div
                    className={`fixed inset-0 ${domain.toUpperCase() !== 'SALTA' ? 'bg-black opacity-30' : 'bg-white opacity-70'} `}
                    onClick={onClose}
                ></div>
                <div className="relative z-10  p-4 max-w-sm mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};
