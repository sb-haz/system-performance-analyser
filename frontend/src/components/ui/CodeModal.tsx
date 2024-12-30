import { X } from "lucide-react";

interface CodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    codeContent: string;
}

export default function ({ isOpen, onClose, title, codeContent }: CodeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-100">
            <div className="border border-white rounded-lg p-6 w-full max-w-2xl relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    <X />
                </button>
                {/* Title */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {/* Code box */}
                <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>
                        <code>{codeContent}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}