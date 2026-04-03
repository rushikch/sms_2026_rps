import Link from 'next/link'
import { Users, DollarSign, BookOpen, BarChart3, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Welcome to Rainbow Public School
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Manage your school efficiently with our comprehensive management system
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
        {/* Student Management Card */}
        <Link href="/students">
          <div className="card card-hover p-8 group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg group-hover:shadow-colored-hover transition-all duration-300">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Student Management
                </h2>
                <p className="text-gray-600">
                  Add, view, and manage student information and records
                </p>
              </div>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Fee Management Card */}
        <Link href="/fees">
          <div className="card card-hover p-8 group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg group-hover:shadow-colored-hover transition-all duration-300">
                <DollarSign className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Fee Management
                </h2>
                <p className="text-gray-600">
                  Track payments, generate receipts, and manage fee records
                </p>
              </div>
              <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Finance Management Card */}
        <Link href="/finance">
          <div className="card card-hover p-8 group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg group-hover:shadow-colored-hover transition-all duration-300">
                <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Finance Management
                </h2>
                <p className="text-gray-600">
                  Track expenses, income, and financial transactions
                </p>
              </div>
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats/Features Section */}
      <div className="glass rounded-2xl p-8 max-w-4xl mx-auto animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Easy Management</h4>
            <p className="text-sm text-gray-600">Intuitive interface for quick access</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-3">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Detailed Reports</h4>
            <p className="text-sm text-gray-600">Generate comprehensive reports</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Secure Access</h4>
            <p className="text-sm text-gray-600">Role-based authentication system</p>
          </div>
        </div>
      </div>
    </div>
  )
}