import Button from '@/components/ui/Button'

export default function AlgoBenchmarks() {
    return (
        <div>
            {/* Heading */}
            <div>
                <h1 className="text-3xl text-white">Algorithm Benchmarks</h1>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-4 w-fit py-4">
                <Button href="/algo-benchmarks/searching">Searching Algorithms</Button>
                <Button href="/algo-benchmarks/sorting">Sorting Algorithms</Button>
                <Button href="/algo-benchmarks/graph">Graph Algorithms</Button>
            </div>
        </div>
    )
}