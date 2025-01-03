"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full p-4 flex flex-row gap-8 max-w-7xl mx-auto rounded-md ">

      <Link
        href="/"
        className={pathname === "/" ? "text-pink-500" : ""}
      >
        Home
      </Link>


      <Link
        href="/algo-benchmarks"
        className={pathname.startsWith("/algo-benchmarks") ? "text-pink-500" : ""}
      >
        Algorithm Benchmarks
      </Link>


      <Link
        href="/distributed-computing"
        className={pathname.startsWith("/distributed-computing") ? "text-pink-500" : ""}
      >
        Distributed Computing
      </Link>


      <Link
        href="/caching-patterns"
        className={pathname.startsWith("/caching-patterns") ? "text-pink-500" : ""}
      >
        Caching Patterns
      </Link>


      <Link
        href="/queue-systems"
        className={pathname.startsWith("/queue-systems") ? "text-pink-500" : ""}
      >
        Queue Systems
      </Link>


      <Link
        href="/database-patterns"
        className={pathname.startsWith("/database-patterns") ? "text-pink-500" : ""}
      >
        Database Patterns
      </Link>


      <Link
        href="/learning-resources"
        className={pathname.startsWith("/learning-resources") ? "text-pink-500" : ""}
      >
        Learning Resources
      </Link>

    </nav>
  );
}