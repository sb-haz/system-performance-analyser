"use client"

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function Searching() {
    const [numsToSort, setNumsToSearch] = useState("1,2,3,4,5,6,7,8,9,10")
    const [numTarget, setNumTarget] = useState("1")
    const [languageType, setLanguageType] = useState("java")

    // Array of numbers
    const handleNumsToSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumsToSearch(e.target.value)
    }

    // Num to find
    const handleNumsTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumTarget(e.target.value)
    }

    // Language
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguageType(e.target.value)
    }

    return (
        <div>
            {/* Heading */}
            <div>
                <h1 className="text-3xl mb-8">Algorithm Benchmarks {">"} Searching</h1>
            </div>
            {/* Content */}
            <div className="grid grid-cols-2 gap-8">

                {/* Left Column - Input Fields */}
                <div className="flex flex-col gap-8">

                    {/* Array of nums */}
                    <div>
                        <p>Numbers to search</p>
                        <input
                            type="text"
                            value={numsToSort}
                            onChange={handleNumsToSearchChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {/* Num to find */}
                    <div>
                        <p>Target</p>
                        <input
                            type="text"
                            value={numTarget}
                            onChange={handleNumsTargetChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {/* Language */}
                    <div>
                        <p>Language</p>
                        <select
                            name="language"
                            id="language"
                            value={languageType}
                            onChange={handleLanguageChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                            <option value="csharp">C#</option>
                        </select>
                    </div>
                </div>

                {/* Right Column - Selected Values */}
                <div className="rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Selected Values</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="font-medium">Array to Search:</p>
                            <p className="text-white">{numsToSort}</p>
                        </div>
                        <div>
                            <p className="font-medium">Target Number:</p>
                            <p className="text-white">{numTarget}</p>
                        </div>
                        <div>
                            <p className="font-medium">Selected Language:</p>
                            <p className="text-white">{languageType}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}