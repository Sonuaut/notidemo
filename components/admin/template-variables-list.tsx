"use client"

import { TemplateVariable } from "@/types/template-variables"

interface TemplateVariablesListProps {
  variables: TemplateVariable[]
}

export function TemplateVariablesList({ variables }: TemplateVariablesListProps) {
  return (
    <div className=" h-full grid gap-2 mt-2">
      {variables.map((variable, index) => (
        <div key={index} className="flex items-center gap-2 ">
          <code className="bg-muted px-2 py-1 rounded text-sm">
            {variable.name}
          </code>
          <span className="text-sm ">{variable.description}</span>
        </div>
      ))}
    </div>
  )
} 