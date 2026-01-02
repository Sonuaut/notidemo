"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Feature {
  id: string;
  smsLimit: number;
  emailLimit: number;
  userLimit: number;
  templateLimit: number;
}

interface FeatureListProps {
  features: Feature[];
  onRemove: (featureId: string) => void;
  onAddFeature: () => void;
}

export default function FeatureList({ features, onRemove, onAddFeature }: FeatureListProps) {
  if (features.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
        <div className="space-y-2">
          <p className="text-muted-foreground">No features added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {features.map((feature) => (
        <Card key={feature.id} className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">SMS Limit</p>
                    <p className="text-sm">User can send {feature.smsLimit} SMS per month</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email Limit</p>
                    <p className="text-sm">User can send {feature.emailLimit} emails per month</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">User Limit</p>
                    <p className="text-sm">User can add up to {feature.userLimit} users</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Template Limit</p>
                    <p className="text-sm">User can create up to {feature.templateLimit} templates</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(feature.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 