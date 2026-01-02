import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AutoRedirect from '@/components/common/AutoRedirect'

export default async function FailurePage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const params = await searchParams;
  const schoolId = params.schoolId as string | undefined;
  const error = params.error as string | undefined;

  // Construct redirect URL with schoolId if available
  const redirectUrl = schoolId ? `/super-admin/school-users?schoolId=${schoolId}` : '/super-admin/schools';

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-4">
          <div className="mx-auto h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-sm text-gray-600">
            {error ? `Error: ${error}` : 'Your payment could not be processed. Please try again or contact support if the problem persists.'}
          </p>
          <AutoRedirect to={redirectUrl} seconds={5} />
          {schoolId && (
            <div className="mt-4 text-left bg-white border rounded-lg p-4 space-y-1">
              <div className="flex justify-between text-sm"><span className="text-gray-500">School ID</span><span className="font-medium">{schoolId}</span></div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-md mx-auto px-4 pb-8 space-y-2">
        <Button asChild className="w-full h-10">
          <Link href={redirectUrl}>
            {schoolId ? 'Go to School Users' : 'Go to Dashboard'}
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full h-10">
          <Link href="/super-admin/schools">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}
