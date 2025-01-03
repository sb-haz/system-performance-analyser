import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div>

      {/* heading */}
      <div>
        <h1 className="text-3xl text-white">System Performance Analyser</h1>
      </div>

      {/* content */}
      <div className="flex flex-col gap-4 w-fit py-4">
        <Button href="/algo-benchmarks">Algorithm Benchmarks</Button>
        <Button href="/distributed-computing">Distributed Computing</Button>
        <Button href="/caching-patterns">Caching Patterns</Button>
        <Button href="/queue-systems">Queue Systems</Button>
        <Button href="/database-patterns">Database Patterns</Button>
        <Button href="/algo-benchmarks">Learning Resources</Button>
      </div>
      
    </div>
  );
}
