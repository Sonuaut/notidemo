import PageHeader  from '@/components/common/PageHeader'
import React from 'react'
import SearchFilter from './SearchFilter'

export default function SchoolHeader() {
    return (
        <div className='w-full flex justify-between items-center  px-6 h-16 bg border-b border-gray-200 '>
            <PageHeader label='Schools'  />
            <SearchFilter />
        </div>

    )
}
