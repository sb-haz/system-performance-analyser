import { useState } from 'react'
import { X } from "lucide-react";

interface GenerateModalProps {
    isOpen: boolean,
    runOnClose: () => void,
    setNumArray: (array: string) => void;
}

export default function GenerateModal({ isOpen, runOnClose, setNumArray }: GenerateModalProps) {
    const [min, setMin] = useState<number>(1);
    const [max, setMax] = useState<number>(10000);
    const [isRandom, setIsRandom] = useState<boolean>(false);

    if (!isOpen) return null;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value))) {
            setMin(Number(e.target.value))
        }
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value))) {
            setMax(Number(e.target.value))
        }
    }

    const generateNumbers = () => {
        if (max > 100000) {
            alert("Max must be less than 100,000")
            return
        }

        if (min > max) {
            alert("Min must be less than max")
            return
        }

        // make array
        const numbers = [];
        for (let i = min; i <= max; i++) {
            numbers.push(i)
        }

        // randomise
        if (isRandom) {
            numbers.sort(() => Math.random() - 0.5)
        }

        // convert to string with commas
        const strNumbers = numbers.join(",")

        setNumArray(strNumbers)
        runOnClose()
    }

    return (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-100">
            <div className="border border-white rounded-lg p-6 w-full max-w-2xl relative">
                {/* close */}
                <button
                    onClick={runOnClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    <X />
                </button>

                <h2 className="text-xl font-bold mb-4">Generate Numbers</h2>

                <div className="flex flex-col gap-4">
                    {/* min input */}
                    <div>
                        <p>Min</p>
                        <input
                            type="text"
                            value={min}
                            onChange={handleMinChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>
                    {/* max input */}
                    <div>
                        <p>Max</p>
                        <input
                            type="text"
                            value={max}
                            onChange={handleMaxChange}
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>
                    {/* Randomise yes or no */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isRandom}
                            onChange={(e) => setIsRandom(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <p>Randomise order</p>
                    </div>
                </div>

                {/* generate button */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={generateNumbers}
                        className="bg-white-400 bg-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    )
}