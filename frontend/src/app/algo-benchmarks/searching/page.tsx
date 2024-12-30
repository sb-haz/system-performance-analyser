"use client"

import { useState } from 'react'
import CodeModal from '@/components/ui/CodeModal'
import { searchImplementations } from './searchImplementations'

export default function Searching() {
    // test settings
    const [numArray, setNumArray] = useState("1,2,3,4,5,6,7,8,9,10")
    const [numTarget, setNumTarget] = useState<number>(1)
    type Algorithm = "linear" | "binary" | "jump" | "interpolation"
    const [algorithm, setAlgorithm] = useState<Algorithm>("linear")
    type Language = "java" | "python" | "javascript" | "csharp"
    const [language, setLanguage] = useState<Language>("java")

    // server settings
    type MemorySize = 128 | 512 | 1024 | 2048 | 4096 | 10240
    const [memorySize, setMemorySize] = useState<MemorySize>(128)
    type Region = "eu-west-2" | "us-east-1" | "eu-central-1"
    const [region, setRegion] = useState<Region>("eu-west-2")

    // toggle test or server
    type ViewToggle = "test" | "server"
    const [settingsView, setSettingsView] = useState<ViewToggle>("test")

    // handlers
    const handleNumArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // only allow numbers and commas
        setNumArray(e.target.value.replace(/[^0-9,]/g, ''))
    }

    const handleNumTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // only allow numbers to be entered
        if (!isNaN(Number(e.target.value))) {
            setNumTarget(Number(e.target.value))
        }        
    }

    const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(e.target.value as Algorithm)
    }

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as Language)
    }

    const handleMemorySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMemorySize(Number(e.target.value) as MemorySize)
    }

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value as Region)
    }

    // code modal
    const [modalOpen, setModalOpen] = useState(false);

    // run testy
    const runTest = async () => {
        try {

            if (numArray == null || numArray.length == 0) {
                throw new Error("Array cannot be empty")
            } 

            const cleanedNumArray = numArray
                .split(",")
                .map(num => num.trim()) // remove whitspace
                .filter(num => !isNaN(Number(num))) // remove non numbers
                .filter(num => num != "") // remove empty ones
                .join(",")
            setNumArray(cleanedNumArray)

            // data we gonna submit
            const data = {
                array: numArray,
                target: numTarget,
                algorithm: algorithm,
                language: language,
                memorySize: memorySize,
                region: region
            }

            // submit
            


        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <h1 className="text-3xl mb-8">Algorithm Benchmarks {">"} Searching</h1>

            <div className="flex flex-col gap-12">
                <div className="grid grid-cols-2 gap-8">
                    {/* left col */}
                    <div className="flex flex-col gap-8">
                        {/* settings toggle */}
                        <div className="flex gap-4">
                            {/* testt settings */}
                            <button
                                onClick={() => setSettingsView("test")}
                                className={`px-4 py-2 rounded ${settingsView === "test" ? "border border-pink-100" : "border-black"}`}
                            >
                                Test Settings
                            </button>
                            {/* server settings */}
                            <button
                                onClick={() => setSettingsView("server")}
                                className={`px-4 py-2 rounded ${settingsView === "server" ? "border border-pink-100" : "border-black"}`}
                            >
                                Server Settings
                            </button>
                        </div>

                        {/* test settings */}
                        {settingsView === "test" && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Numbers to search</p>
                                    <input
                                        type="text"
                                        value={numArray}
                                        onChange={handleNumArrayChange}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </div>
                                <div>
                                    <p>Target</p>
                                    <input
                                        type="text"
                                        value={numTarget}
                                        onChange={handleNumTargetChange}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </div>
                                <div>
                                    <p>Search Method</p>
                                    <select
                                        value={algorithm}
                                        onChange={handleAlgorithmChange}
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
                                        value={language}
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

                        {/* server settings */}
                        {settingsView === "server" && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Memory Size (GB)</p>
                                    <select
                                        value={memorySize}
                                        onChange={handleMemorySizeChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value={128}>0.1 GB (0.125 vCPU)</option>
                                        <option value={512}>0.5 GB (0.5 vCPU)</option>
                                        <option value={1024}>1 GB (1 vCPU)</option>
                                        <option value={2048}>2 GB (2 vCPU)</option>
                                        <option value={4096}>4 GB (4 vCPU)</option>
                                        <option value={10240}>10 GB (6 vCPU)</option>
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

                    {/* right col */}
                    <div className="border border-white p-4 rounded-lg h-fit">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2 gap-8">
                                {/* test settings section */}
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Test Settings</h2>
                                    <div className="flex flex-col gap-4 text-white">
                                        <div>
                                            <p className="font-medium">Array to Search:</p>
                                            <p>{numArray}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Target Number:</p>
                                            <p>{numTarget}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Search Method:</p>
                                            <p>{algorithm}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Language:</p>
                                            <p>{language}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* system settings */}
                                <div>
                                    <h2 className="text-xl font-bold mb-4">System Information</h2>
                                    <div className="flex flex-col gap-4 text-white">
                                        <div>
                                            <p className="font-medium">Memory Size:</p>
                                            <p>{memorySize} MB</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">vCPU:</p>
                                            <p>{memorySize >= 10240 ? "6" : (memorySize / 1024).toFixed(3)} vCPU</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Cost per GB-second:</p>
                                            <p>£-</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Region:</p>
                                            <p>{region}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-4 py-16 pb-0">
                                {/* run testy */}
                                <button
                                    onClick={() => runTest()}
                                    className="bg-white-400 border border-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                                >
                                    Run Test
                                </button>

                                {/* display code imply */}
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="bg-white-400 border border-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                                >
                                    View Implementation
                                </button>
                                <CodeModal
                                    isOpen={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    title={
                                        language.charAt(0).toUpperCase() + language.slice(1)
                                        + " - "
                                        + algorithm.charAt(0).toUpperCase() + algorithm.slice(1)
                                        + " search"
                                    }
                                    codeContent={searchImplementations[algorithm][language]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* results */}
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
                            <p>£-</p>
                        </div>
                        <div>
                            <p className="font-medium">Status:</p>
                            <p className="text-green-500">Success</p>
                        </div>
                    </div>
                </div>

                {/* past tests */}
                <div className="border border-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Past Test Runs</h2>
                    <div className="flex flex-col gap-4 text-white">
                        <div className="grid grid-cols-7 gap-4 border-b border-gray-700 pb-2">
                            <p>Timestamp</p>
                            <p>Search Method</p>
                            <p>Language</p>
                            <p>Memory</p>
                            <p>Time Taken</p>
                            <p>Cost</p>
                            <p>Status</p>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            <p>2024-12-29 14:30</p>
                            <p>Binary</p>
                            <p>Python</p>
                            <p>128 MB</p>
                            <p>0.0021s</p>
                            <p>£0.00000001</p>
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