"use client"

import { useState } from 'react'
import CodeModal from '@/components/ui/CodeModal'
import GenerateModal from '@/components/ui/GenerateModal'
import { searchImplementations } from './searchImplementations'
import prettyMs from 'pretty-ms'
import { X, LineChart, Sparkles, Play, Loader, Braces } from 'lucide-react'

export default function Searching() {
    // test settings
    const [numArray, setNumArray] = useState("1,2,3,4,5,6,7,8,9,10")
    const [numTarget, setNumTarget] = useState<number>(7)
    type Algorithm = "LINEAR" | "BINARY" | "JUMP" | "INTERPOLATION"
    const [algorithm, setAlgorithm] = useState<Algorithm>("LINEAR")
    type Language = "JAVA" | "PYTHON" | "JAVASCRIPT" | "CSHARP"
    const [language, setLanguage] = useState<Language>("JAVA")

    // server settings
    type MemorySize = "MB_128" | "MB_256" | "MB_512" | "MB_1024" | "MB_2048"
    const [memorySize, setMemorySize] = useState<MemorySize>("MB_128")
    type Region = "EU_WEST_2" | "US_EAST_1" | "EU_CENTRAL_1"
    const [region, setRegion] = useState<Region>("EU_WEST_2")

    // toggle test or server
    type ViewToggle = "TEST" | "SERVER"
    const [settingsView, setSettingsView] = useState<ViewToggle>("TEST")

    // code modal
    const [codeModalOpen, setCodeModalOpen] = useState(false);

    // generate modal
    const [generateModalOpen, setGenerateModalOpen] = useState(false);

    // result
    type ExecutionStatus = "SUCCESS" | "FAILED" | "PENDING"
    type SearchStatus = "FOUND" | "NOT_FOUND"
    type Result = {
        timestamp: string // formatted string for displayin
        timestampRaw: number // unix timestamp (ms) for calc

        array: string,
        target: number,

        algorithm: Algorithm
        language: Language
        memorySize: MemorySize
        region: Region,

        iterations: number,
        comparisons: number,
        timeTaken: number
        cost: number

        executionStatus: ExecutionStatus,
        searchStatus: SearchStatus,
        foundIndex: number
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
        setMemorySize((e.target.value) as MemorySize)
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
                array: numArray,
                target: numTarget,
                algorithm: algorithm,
                language: language,
                memorySize: memorySize,
                region: region,
                iterations: 0,
                comparisons: 0,
                timeTaken: 0,
                cost: 0,
                executionStatus: "PENDING",
                searchStatus: "NOT_FOUND",
                foundIndex: -1
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
            const response = await fetch("http://localhost:8080/api/v1/algos/search", {
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
            console.log(responseData)

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
            <h1 className="text-3xl mb-8 text-white">Searching Benchmarks</h1>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-8">
                    {/* left col */}
                    <div className="flex flex-col gap-8">
                        {/* settings toggle */}
                        <div className="flex gap-4">
                            {/* testt settings */}
                            <button
                                onClick={() => setSettingsView("TEST")}
                                className={`px-4 py-2 rounded text-gray-200 ${settingsView === "TEST" ? "border border-pink-600" : "hover:bg-pink-600"}`}
                            >
                                Test Settings
                            </button>
                            {/* server settings */}
                            <button
                                onClick={() => setSettingsView("SERVER")}
                                className={`px-4 py-2 rounded text-gray-200 ${settingsView === "SERVER" ? "border border-pink-600" : "hover:bg-pink-600"}`}
                            >
                                Server Settings
                            </button>
                        </div>

                        {/* test settings */}
                        {settingsView === "TEST" && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Numbers to search</p>
                                    <div className="flex flex-row gap-2">
                                        <input
                                            type="text"
                                            value={numArray}
                                            onChange={handleNumArrayChange}
                                            className="w-full p-2 border rounded text-black"
                                        />
                                        <button
                                            onClick={() => setGenerateModalOpen(true)}
                                            className="pink-button flex items-center gap-1"
                                        >
                                            Generate <Sparkles size={18} />
                                        </button>
                                        <GenerateModal
                                            isOpen={generateModalOpen}
                                            runOnClose={() => setGenerateModalOpen(false)}
                                            setNumArray={setNumArray}
                                        />
                                    </div>
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
                                        <option value="LINEAR">Linear Search</option>
                                        <option value="BINARY">Binary Search</option>
                                        <option value="JUMP">Jump Search</option>
                                        <option value="INTERPOLATION">Interpolation Search</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Language</p>
                                    <select
                                        value={language}
                                        onChange={handleLanguageChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="JAVA">Java</option>
                                        <option value="PYTHON">Python</option>
                                        <option value="JAVASCRIPT">JavaScript</option>
                                        <option value="CSHARP">C#</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* server settings */}
                        {settingsView === "SERVER" && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>Memory Size (GB)</p>
                                    <select
                                        value={memorySize}
                                        onChange={handleMemorySizeChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="MB_128">128 MB (0.07 vCPU)</option>
                                        <option value="MB_256">256 MB (0.15 vCPU)</option>
                                        <option value="MB_512">512 MB (0.30 vCPU)</option>
                                        <option value="MB_1024">1024 MB (0.50 vCPU)</option>
                                        <option value="MB_2048">2048 MB (1.00 vCPU)</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Region</p>
                                    <select
                                        value={region}
                                        onChange={handleRegionChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        <option value="EU_WEST_2">London (eu-west-2)</option>
                                        <option value="US_EAST_1" disabled>N. Virginia (us-east-1)</option>
                                        <option value="EU_CENTRAL_1" disabled>Frankfurt (eu-central-1)</option>
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
                                            <p>{numArray.length > 25
                                                ? numArray.substring(0, 15) + " ..." + numArray.substring(numArray.length - 10, numArray.length)
                                                : numArray}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Target Number:</p>
                                            <p>{numTarget}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Search Method:</p>
                                            <p>{algorithm.toLowerCase()}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Language:</p>
                                            <p>{language.toLowerCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* system settings */}
                                <div>
                                    <h2 className="text-xl font-bold mb-4">System Information</h2>
                                    <div className="flex flex-col gap-4 text-white">
                                        <div>
                                            <p className="font-medium">Memory Size:</p>
                                            <p>{memorySize.replace("MB_", "")} mb</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">vCPU:</p>
                                            {(parseInt(memorySize.replace("MB_", "")) / 1792).toFixed(3)} vCPU
                                        </div>
                                        <div>
                                            <p className="font-medium">Cost per request:</p>
                                            <p>£0.00000000</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Region:</p>
                                            <p>{region.toLowerCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row justify-start gap-4 py-16 pb-0">
                                {/* display code imply */}
                                <button
                                    onClick={() => setCodeModalOpen(true)}
                                    className="pink-button flex items-center gap-1"
                                >
                                    View Code
                                    <Braces size={16} />
                                </button>
                                <CodeModal
                                    isOpen={codeModalOpen}
                                    onClose={() => setCodeModalOpen(false)}
                                    title={
                                        language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()
                                        + " - "
                                        + algorithm.charAt(0).toUpperCase() + algorithm.slice(1).toLowerCase()
                                        + " Search"
                                    }
                                    codeContent={searchImplementations[algorithm][language]}
                                />
                                {/* run testy */}
                                <button
                                    onClick={runTest}
                                    disabled={isTestRunning}
                                    className="pink-button flex items-center gap-1"
                                >
                                    {isTestRunning ? (
                                        <>Running Test... <Loader className="animate-spin" size={18} /></>
                                    ) : (
                                        <>Run Test <Play size={18} /></>
                                    )}
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
                            <p className="text-red-200">Time</p>
                            <p className="text-blue-300">Algorithm</p>
                            <p className="text-blue-300">Language</p>
                            <p className="text-blue-300">Memory</p>
                            <p className="text-red-200">Iterations</p>
                            <p className="text-red-200">Comparisons</p>
                            <p className="text-red-200">Time Taken</p>
                            <p className="text-red-200">Cost</p>
                            <p className="text-blue-300">Status</p>
                        </div>
                        {testHistory.length > 0 ? (
                            <div>
                                {testHistory.toReversed().map(result => (
                                    <div
                                        key={result.timestampRaw}
                                        className="grid grid-cols-9 gap-4">
                                        <p>
                                            {result.executionStatus === 'PENDING' || (Date.now() - result.timestampRaw) < 1000
                                                ? 'Just now'
                                                : prettyMs(Date.now() - result.timestampRaw, { secondsDecimalDigits: 0 }) + ' ago'
                                            }
                                        </p>
                                        <p>{result.algorithm.toLowerCase()}</p>
                                        <p>{result.language.toLowerCase()}</p>
                                        <p>{result.memorySize?.replace('MB_', '') || ''} mb</p>
                                        <p>{result.iterations}</p>
                                        <p>{result.comparisons}</p>
                                        <p>{result.timeTaken.toFixed(6)}s</p>
                                        <p>£{result.cost.toFixed(8)}</p>

                                        <p className={
                                            result.executionStatus === 'SUCCESS' ? 'text-green-500' :
                                                result.executionStatus === 'FAILED' ? 'text-red-500' :
                                                    'text-amber-500'
                                        }>
                                            {result.executionStatus.toLowerCase()}
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
                            className="pink-button flex items-center gap-1"
                        >
                            Clear Results <X size={18} />
                        </button>
                    )}
                    <button className="pink-button flex items-center gap-1">
                        Historical Tests <LineChart size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}