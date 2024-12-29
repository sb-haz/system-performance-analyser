import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full p-4 flex flex-row gap-8 max-w-7xl mx-auto border border-white">
      <Link href="/">Home</Link>
      <Link href="/algo-benchmarks">Algorithm Benchmarks</Link>
      <Link href="/distributed-computing">Distributed Computing</Link>
      <Link href="/caching-patterns">Caching Patterns</Link>
      <Link href="/queue-systems">Queue Systems</Link>
      <Link href="/</nav>database-patterns">Database Patterns</Link>
      <Link href="/learning-resources">Learning Resources</Link>
    </nav>
  );
}
