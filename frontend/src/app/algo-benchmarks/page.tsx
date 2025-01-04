import Link from 'next/link'

export default function AlgoBenchmarks() {
    return (
        <div>
            {/* Heading */}
            <div>
                <h1 className="text-3xl text-white">Algorithm Benchmarks</h1>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-4 w-fit py-4">
                <Link href="/algo-benchmarks/searching">
                    <button className="pink-button">Searching</button>
                </Link>

                <Link href="/algo-benchmarks/sorting">
                    <button className="pink-button">Sorting</button>
                </Link>

                <Link href="/algo-benchmarks/path-finding">
                    <button className="pink-button">Path Finding</button>
                </Link>
            </div>
        </div>
    )
}