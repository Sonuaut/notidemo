"use client"

import { TemplateVariablesList } from "./template-variables-list"
import { templateVariables } from "@/types/template-variables"

interface TemplateVariablesTabProps {
  type: "staff" | "parent"
}

export function TemplateVariablesTab({ type }: TemplateVariablesTabProps) {
  const data = templateVariables[type]

  return (
    <div className="space-y-6">
      {/* Instructions Section */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{data.title}</h3>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </div>

      {/* Variables Section */}
      <div className="space-y-2">
        <h4 className="font-medium">Allowed Keywords:</h4>
        <TemplateVariablesList variables={data.variables} />
      </div>

      {/* Example Section */}
      <div className="space-y-2">
        <h4 className="font-medium">{data.example.title}</h4>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap font-mono">
            {data.example.content}
          </pre>
        </div>
      </div>
    </div>
  )
} 