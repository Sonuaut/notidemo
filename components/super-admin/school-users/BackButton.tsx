"use client";
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function BackButton() {
    return (
        <div>
            <Button variant="outline" size="sm" onClick={() => window.location.href = "/super-admin/schools"}>
                <ArrowLeft className="w-4 h-4" />
                Back to Schools
            </Button>
        </div>
    )
}
