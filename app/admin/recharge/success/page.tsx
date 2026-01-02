import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import {  fetchRechargeBySessionId, fetchRechargeBySessionIdforSuperAdmin } from '@/lib/admin/subscription'
import AutoRedirect from '@/components/common/AutoRedirect'

export default async function RechargeSuccessPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const sessionId = params.session_id as string | undefined;
  let rechargeData = null;
  let error = null;
  if (sessionId) {
    const result = await fetchRechargeBySessionId(sessionId);
    if (result.success) {
      console.log("result", result.data);
      rechargeData = result.data
    } else {
      error = "Failed to fetch recharge details";
    }
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("rechargeData", rechargeData);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative">
     
      <div className="relative max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center relative">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Recharge Successful!
              </h1>
              <p className="text-green-100 text-lg">
                Your credits have been added to your account
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="text-center mb-6">
              {/* <AutoRedirect to="/admin/dashboard" seconds={5} /> */}
            </div>

            {rechargeData && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Recharge Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                    <span className="font-semibold text-gray-700">Plan</span>
                    <span className="font-bold text-gray-900">{rechargeData.recharge_plans?.title || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                    <span className="font-semibold text-gray-700">Type</span>
                    <span className="font-bold text-gray-900">{rechargeData.recharge_plans?.type || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                    <span className="font-semibold text-gray-700">Amount</span>
                    <span className="font-bold text-green-600 text-xl">${rechargeData.recharge_amount || 0}</span>
                  </div>
                  
                  {rechargeData.recharge_plans?.email_limit > 0 && (
                    <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                      <span className="font-semibold text-gray-700">Email Credits</span>
                      <span className="font-bold text-blue-600">{rechargeData.recharge_plans.email_limit}</span>
                    </div>
                  )}
                  
                  {rechargeData.recharge_plans?.sms_limit > 0 && (
                    <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                      <span className="font-semibold text-gray-700">SMS Credits</span>
                      <span className="font-bold text-purple-600">{rechargeData.recharge_plans.sms_limit}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                    <span className="font-semibold text-gray-700">Status</span>
                    <span className={`font-bold ${rechargeData.recharge_status ? 'text-green-600' : 'text-red-600'}`}>
                      {rechargeData.recharge_status ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 bg-white/60 rounded-xl border border-white/50">
                    <span className="font-semibold text-gray-700">Recharged On</span>
                    <span className="font-bold text-gray-900">
                      {new Date(rechargeData.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/admin/dashboard" className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#8D8EF5] to-[#6366F1] text-white hover:from-[#8D8EF5]/90 hover:to-[#6366F1]/90 h-12 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Go to Dashboard
              </Link>
              
              <Link href="/admin/recharge" className="w-full flex items-center justify-center gap-3 h-12 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                <ArrowLeft className="h-5 w-5" />
                Back to Recharge
              </Link>
            </div>

            {/* Success Message */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Credits added successfully</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl"></div>
      </div>
    </div>
  )
}


