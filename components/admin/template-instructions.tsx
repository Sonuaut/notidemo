"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { HelpCircle } from "lucide-react"
import { TemplateVariablesTab } from "./template-variables-tab"

export function TemplateInstructions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HelpCircle className="h-4 w-4 mr-2" />
          Template Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Template Creation Guide</DialogTitle>
          <DialogDescription>
            Learn how to use variables and create effective templates
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="staff" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff">Staff Templates</TabsTrigger>
            <TabsTrigger value="parent">Parent Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="staff" className="space-y-4">
            <TemplateVariablesTab type="staff" />
          </TabsContent>
          
          <TabsContent value="parent" className="space-y-4">
            <TemplateVariablesTab type="parent" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 