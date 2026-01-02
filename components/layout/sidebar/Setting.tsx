import CommonButton from '@/components/common/Button'
import { Label } from '@/components/common/Label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaGear } from 'react-icons/fa6'

export default function Setting({settingsPath}:{settingsPath:string}) {
  const router =useRouter()
  function handleRoute (){
    router.push(`${settingsPath}`)
  }
  return (
    <CommonButton variant={"outline"} onClick={handleRoute} className="flex items-center gap-2 text-gray-600 hover:text-white  bg-white  hover:bg-gray-200 cursor-pointer ">
    <FaGear size={18} className='w-5 h-5 text-gray-700 cursor-pointer  ' />
    <Label className='text-gray-700 cursor-pointer '>Setting</Label>
    </CommonButton>
  )
}
