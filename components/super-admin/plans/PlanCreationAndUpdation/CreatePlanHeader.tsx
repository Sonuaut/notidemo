import PageHeader from '@/components/common/PageHeader'
import React from 'react'

export default function CreatePlanHeader() {
  return (
    <section className="flex justify-between items-center h-16 px-9 border-b border-gray-200"> 
        <PageHeader label="Create Plan" />
    </section>
  )
}
