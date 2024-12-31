"use client"

import { useState } from 'react'
import CodeModal from '@/components/ui/CodeModal'
import { searchImplementations } from './searchImplementations'
import prettyMs from 'pretty-ms'
import { X, History, Clock, Database, BarChart, LineChart, ListFilter, Archive } from 'lucide-react'

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

    // code modal
    const [modalOpen, setModalOpen] = useState(false);

    // result
    type Status = "SUCCESS" | "FAILED" | "PENDING"
    type Result = {
        timestamp: string // formatted string for displayin
        timestampRaw: number // unix timestamp (ms) for calc
        algorithm: Algorithm
        language: Language
        memory: MemorySize
        timeTaken: number
        memoryUsage: number
        cpuUsage: number
        cost: number
        status: Status
    }
    const [testHistory, setTestHistory] = useState<Result[]>([])

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



    // run testy
    const [isTestRunning, setIsTestRunning] = useState(false)
    const runTest = async () => {
        try {
            // stop them running multiple tests at once
            // causes issue with not replacing pending test
            // at end of list
            setIsTestRunning(true)

            // add pending result to end of array
            setTestHistory(prevTests => [...prevTests, {
                timestamp: 'Just now',
                timestampRaw: Date.now(),
                algorithm: algorithm,
                language: language,
                memory: memorySize,
                timeTaken: 0,
                memoryUsage: 0,
                cpuUsage: 0,
                cost: 0,
                status: "PENDING"
            }])

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

            // initial request
            const response = await fetch("http://localhost:8080/api/algo-benchmarks/search/execute", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            // request error
            if (!response.ok) {
                throw new Error("Network response error")
            }

            // parse response 
            const responseData = await response.json()

            // replace pending one at end of array
            setTestHistory(currentTestHistory => {
                const testHistoryNew = [...currentTestHistory] // copy current one
                testHistoryNew[testHistoryNew.length - 1] = responseData // replace last (pending) test
                return testHistoryNew
            })


        } catch (error) {
            alert(error)
        } finally {
            setIsTestRunning(false)
        }
    }

    return (
        <div>
            <h1 className="text-3xl mb-8">Algorithm Benchmarks {">"} Searching</h1>

            <div className="flex flex-col gap-4">
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
                                            <p>{memorySize} mb</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">vCPU:</p>
                                            <p>{memorySize >= 10240 ? "6" : (memorySize / 1024).toFixed(3)} vCPU</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Cost per GB-second:</p>
                                            <p>£0.00</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Region:</p>
                                            <p>{region}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row justify-start gap-4 py-16 pb-0">
                                {/* display code imply */}
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="bg-white-400 border border-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                                >
                                    View Code
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
                                {/* run testy */}
                                <button
                                    onClick={runTest}
                                    disabled={isTestRunning}
                                    className="bg-white-400 bg-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                                >
                                    {isTestRunning ? "Running Test..." : "Run Test"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* results */}
                <div className="border border-white p-4 mt-6 rounded-lg">
                    <div className="flex justify-between pb-4">
                        <h2 className="text-xl font-bold">Results</h2>
                    </div>
                    <div className="flex flex-col gap-4 text-white">
                        <div className="grid grid-cols-9 gap-4 border-b border-gray-700 pb-2">
                            <p>Timestamp</p>
                            <p>Algorithm</p>
                            <p>Language</p>
                            <p>Memory</p>
                            <p>Time Taken</p>
                            <p>Memory Usage</p>
                            <p>CPU Usage</p>
                            <p>Cost</p>
                            <p>Status</p>
                        </div>
                        {testHistory.length > 0 ? (
                            <div>
                                {testHistory.toReversed().map(result => (
                                    <div
                                        key={result.timestampRaw}
                                        className="grid grid-cols-9 gap-4">
                                        <p>
                                            {result.status === 'PENDING'
                                                ? 'Just now'
                                                : prettyMs(Date.now() - result.timestampRaw, { secondsDecimalDigits: 1 }) + ' ago'
                                            }
                                        </p>
                                        <p>{result.algorithm.toLowerCase()}</p>
                                        <p>{result.language.toLowerCase()}</p>
                                        <p>{result.memory} MB</p>
                                        <p>{result.timeTaken}s</p>
                                        <p>{result.memoryUsage} MB</p>
                                        <p>{result.cpuUsage}%</p>
                                        <p>£{result.cost.toFixed(8)}</p>
                                        <p className={
                                            result.status === 'SUCCESS' ? 'text-green-500' :
                                                result.status === 'FAILED' ? 'text-red-500' :
                                                    'text-amber-500'
                                        }>
                                            {result.status.toLowerCase()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center ">No test results yet.</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    {testHistory.length > 0 && (
                        <button
                            onClick={() => setTestHistory([])}
                            className="bg-white-400 border border-gray-400 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            Clear Results <X size={18} />
                        </button>
                    )}
                    <button
                        className="bg-white-400 border border-gray-400 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        Historical Tests <LineChart size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}