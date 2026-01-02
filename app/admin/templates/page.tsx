"use client"

import TemplateManagement from "@/components/admin/template-management"
import { AdminLayout } from "@/components/layout/admin-layout"

export default function TemplatesPage() {
  return (
    <AdminLayout type="admin">
      <div className="space-y-6">
        <TemplateManagement />
      </div>
    </AdminLayout>
  )
}