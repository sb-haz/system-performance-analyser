import Link from 'next/link'

export default function Home() {
  return (
    <div>

      {/* heading */}
      <div>
        <h1 className="text-3xl text-white">System Performance Analyser</h1>
      </div>

      {/* content */}
      <div className="flex flex-col gap-4 w-fit py-4">
        <Link href="/algo-benchmarks">
          <button className="pink-button">Algorithm Benchmarks</button>
        </Link>

        <Link href="/distributed-computing">
          <button className="pink-button">Distributed Computing</button>
        </Link>

        <Link href="/caching-patterns">
          <button className="pink-button">Caching Patterns</button>
        </Link>

        <Link href="/queue-systems">
          <button className="pink-button">Queue Systems</button>
        </Link>

        <Link href="/database-patterns">
          <button className="pink-button">Database Patterns</button>
        </Link>

        <Link href="/algo-benchmarks">
          <button className="pink-button">Learning Resources</button>
        </Link>
      </div>

    </div>
  );
}
