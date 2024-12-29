"use client"

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function Searching() {
    // Test Settings State
    const [numsToSort, setNumsToSearch] = useState("1,2,3,4,5,6,7,8,9,10")
    const [numTarget, setNumTarget] = useState("1")
    const [searchMethod, setSearchMethod] = useState("linear")
    const [languageType, setLanguageType] = useState("java")

    // Server Settings State
    const [instanceType, setInstanceType] = useState("t2.micro")
    const [region, setRegion] = useState("eu-west-2")

    // View Toggle State
    const [settingsView, setSettingsView] = useState("test") // "test" or "server"

    // Cost estimates per hour
    const instanceCosts = {
        "t2.micro": 0.0092,
        "t2.small": 0.018,
        "t2.medium": 0.037,
        "m5.large": 0.076,
        "c5.large": 0.067,
        "r5.large": 0.099
    }

    // Handlers
    const handleNumsToSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumsToSearch(e.target.value)
    }

    const handleNumsTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumTarget(e.target.value)
    }

    const handleSearchMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchMethod(e.target.value)
    }

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguageType(e.target.value)
    }

    const handleInstanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInstanceType(e.target.value)
    }

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value)
    }

    return (
        <div>
            <h1 className="text-3xl mb-8">Algorithm Benchmarks {">"} Searching</h1>

            <div className="flex flex-col gap-12">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left col */}
                    <div className="flex flex-col gap-8">
                        {/* Settings toggle */}
                        <div className="flex gap-4">
                            {/* Testt settings */}
                            <button
                                onClick={() => setSettingsView("test")}
                                className={`px-4 py-2 rounded ${settingsView === "test" ? "border border-pink-100" : "border-black"}`}
                            >
                                Test Settings
                            </button>
                            {/* Server settings */}
                            <button
                                onClick={() => setSettingsView("server")}
                                className={`px-4 py-2 rounded ${settingsView === "server" ? "border border-pink-100" : "border-black"}`}
                            >
                                Server Settings
                            </button>
                        </div>

                        {/* Test settings */}
                        {settingsView === "test" && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Numbers to search</p>
                                    <input
                                        type="text"
                                        value={numsToSort}
                                        onChange={handleNumsToSearchChange}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </div>
                                <div>
                                    <p>Target</p>
                                    <input
                                        type="text"
                                        value={numTarget}
                                        onChange={handleNumsTargetChange}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </div>
                                <div>
                                    <p>Search Method</p>
                                    <select
                                        value={searchMethod}
                                        onChange={handleSearchMethod}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="linear">Linear</option>
                                        <option value="binary">Binary</option>
                                        <option value="jump">Jump</option>
                                        <option value="interpolation">Interpolation</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Language</p>
                                    <select
                                        value={languageType}
                                        onChange={handleLanguageChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="java">Java</option>
                                        <option value="python">Python</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="csharp">C#</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Server settings */}
                        {settingsView === "server" && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Instance Type</p>
                                    <select
                                        value={instanceType}
                                        onChange={handleInstanceChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="t2.micro">t2.micro</option>
                                        <option value="t2.small">t2.small</option>
                                        <option value="t2.medium">t2.medium</option>
                                        <option value="m5.large">m5.large (General Purpose)</option>
                                        <option value="c5.large">c5.large (Compute Optimized)</option>
                                        <option value="r5.large">r5.large (Memory Optimized)</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Region</p>
                                    <select
                                        value={region}
                                        onChange={handleRegionChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="eu-west-2">London (eu-west-2)</option>
                                        <option value="us-east-1" disabled>N. Virginia (us-east-1)</option>
                                        <option value="eu-central-1" disabled>Frankfurt (eu-central-1)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right col */}
                    <div className="border border-white p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-8">
                            {/* Test settings */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">Test Settings</h2>
                                <div className="flex flex-col gap-4 text-white">
                                    <div>
                                        <p className="font-medium">Array to Search:</p>
                                        <p>{numsToSort}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Target Number:</p>
                                        <p>{numTarget}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Search Method:</p>
                                        <p>{searchMethod}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Language:</p>
                                        <p>{languageType}</p>
                                    </div>
                                </div>
                            </div>

                            {/* System info */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">System Information</h2>
                                <div className="flex flex-col gap-4 text-white">
                                    <div>
                                        <p className="font-medium">Instance Type:</p>
                                        <p>{instanceType}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Cost per Hour:</p>
                                        <p>£{instanceCosts[instanceType]}/hr</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Region:</p>
                                        <p>{region}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="border border-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Results</h2>
                    <div className="grid grid-cols-4 gap-4 text-white">
                        <div>
                            <p className="font-medium">Time Taken:</p>
                            <p>0.0023s</p>
                        </div>
                        <div>
                            <p className="font-medium">Memory Usage:</p>
                            <p>2.3 MB</p>
                        </div>
                        <div>
                            <p className="font-medium">Estimated Cost:</p>
                            <p>£{(instanceCosts[instanceType] * (0.0023 / 3600)).toFixed(8)}</p>
                        </div>
                        <div>
                            <p className="font-medium">Status:</p>
                            <p className="text-green-500">Success</p>
                        </div>
                    </div>
                </div>

                {/* Past tests */}
                <div className="border border-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Past Test Runs</h2>
                    <div className="flex flex-col gap-4 text-white">
                        <div className="grid grid-cols-7 gap-4 border-b border-gray-700 pb-2">
                            <p>Timestamp</p>
                            <p>Search Method</p>
                            <p>Language</p>
                            <p>Instance</p>
                            <p>Time Taken</p>
                            <p>Cost</p>
                            <p>Status</p>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            <p>2024-12-29 14:30</p>
                            <p>Binary</p>
                            <p>Python</p>
                            <p>t2.micro</p>
                            <p>0.0021s</p>
                            <p>£0.00000007</p>
                            <p className="text-green-500">Success</p>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            <p>2024-12-29 14:25</p>
                            <p>Linear</p>
                            <p>Java</p>
                            <p>t2.small</p>
                            <p>0.0034s</p>
                            <p>£0.00000021</p>
                            <p className="text-green-500">Success</p>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            <p>2024-12-29 14:20</p>
                            <p>Jump</p>
                            <p>JavaScript</p>
                            <p>t2.medium</p>
                            <p>0.0028s</p>
                            <p>£0.00000036</p>
                            <p className="text-red-500">Failed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}