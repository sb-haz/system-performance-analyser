import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl mb-8 text-white">System Performance Analyser</h1>

      <div className="flex flex-col gap-4">
        {/* top layer grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* left col */}
          <div className="flex flex-col gap-4 w-fit">
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

          {/* right col */}
          <div className="border border-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-pink-500">Platform Cost</h2>
              <p className="text-sm text-gray-400">Last updated: 1 hour ago</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-white mb-4">
              <div>
                <p className="font-medium">Frontend</p>
                <p className="text-sm">Vercel Hobby Plan</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Algorithm Benchmarks</p>
                <p className="text-sm">Lambda + Fargate</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Distributed Computing</p>
                <p className="text-sm">ECS + Load Balancer</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Caching Patterns</p>
                <p className="text-sm">ElastiCache + Lambda</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Queue Systems</p>
                <p className="text-sm">SQS + Lambda</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Database Patterns</p>
                <p className="text-sm">RDS + DynamoDB</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Learning Resources</p>
                <p className="text-sm">S3 + CloudFront</p>
                <p>£0.00</p>
              </div>
              <div>
                <p className="font-medium">Monitoring</p>
                <p className="text-sm">CloudWatch</p>
                <p>£0.00</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-white">
                <p className="font-medium">Last 30 days cost</p>
                <p className="font-medium">£0.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* second box */}
        <div className="border border-white p-4 rounded-lg mt-6">
          <h2 className="mb-4 text-xl font-bold text-pink-500">Platform Architecture</h2>
          <div className="bg-gray-800 p-8 rounded text-center text-gray-400 h-[80vh] flex items-center justify-center">
            Architecture Diagram
          </div>
        </div>
      </div>
    </div>
  )
}