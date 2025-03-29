import React, { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
    useEffect(() => {
        if (!props.isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                props.onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [props.isOpen]);

    if (!props.isOpen) return null;

    return (
        <div
            onClick={() => {
                console.log("clicked")
                props.onClose()
            }}
            className="fixed inset-0 z-20 bg-black/50 flex justify-center items-center transition-opacity duration-300"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg  border-2 h-fit w-96 max-w-full relative animate-fadeIn"
            >
                <button
                    onClick={props.onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    Close
                </button>
                {props.children}
            </div>
        </div>
    );
}
