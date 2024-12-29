import Link from 'next/link'

export default function Button({ href, children }: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className="bg-white-400 border border-pink-600 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
        >
            {children}
        </Link>
    )
}