'use client'
import { Label } from '@/components/common/Label'
import React from 'react'

export default function SchoolContactWidget({schoolData}:{schoolData:any}) {
    // console.log("schooldata :",schoolData)
  return (
   <div className=''>
    <Label size={"sm"} className='block'>{schoolData?.phone}</Label>
    <Label size={"sm"} className='w-full truncate pr-10'>{schoolData?.email}</Label>
   </div>
  )
}
