'use client'
import React, { useState } from 'react'
import { SheetClose } from '@/components/ui/sheet'
import OptInForm from './OptInForm';

export default function SheetCloseComponent() {
    const [open, setOpen] = useState(false);

  return (
    <SheetClose onClick={(e)=>{
        e.stopPropagation();
        setOpen(true);
      }}>
        <OptInForm trigger={open}  />
    </SheetClose>
  )
}
