import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rainbow Public School Management System</h1>
      <nav className="mb-4">
        <Link href="/students" className="mr-4 text-blue-500">Student Management</Link>
        <Link href="/fees" className="text-blue-500">Fee Management</Link>
      </nav>
      <p>Welcome! Select a section above.</p>
    </div>
  )
}