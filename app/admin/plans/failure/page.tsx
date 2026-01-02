import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DC2626' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 p-8 text-center relative">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                <XCircle className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Payment Failed
              </h1>
              <p className="text-red-100 text-lg">
                There was an issue processing your payment
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 mb-6 border border-red-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payment Error</h3>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4 border border-white/50">
                <p className="text-red-700 font-medium text-center">
                  Please try again or contact support if the issue persists.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/admin/plans" className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#8D8EF5] to-[#6366F1] text-white hover:from-[#8D8EF5]/90 hover:to-[#6366F1]/90 h-12 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Back to Plans
              </Link>
              
              <Link href="javascript:history.back()" className="w-full flex items-center justify-center gap-3 h-12 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Link>

              <Link href="javascript:location.reload()" className="w-full flex items-center justify-center gap-3 h-12 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                <RefreshCw className="h-5 w-5" />
                Refresh Page
              </Link>
            </div>

            {/* Support Message */}
            <div className="mt-8 text-center">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  If you continue to experience issues, please contact support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-200/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-200/20 rounded-full blur-xl"></div>
      </div>
    </div>
  )
}
