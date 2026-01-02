"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

interface FeatureData {
  smsLimit: number;
  emailLimit: number;
  userLimit: number;
  templateLimit: number;
}

interface FeatureDialogProps {
  onAdd: (feature: FeatureData) => void;
}

export default function FeatureDialog({ onAdd }: FeatureDialogProps) {
  const [featureData, setFeatureData] = useState<FeatureData>({
    smsLimit: 0,
    emailLimit: 0,
    userLimit: 0,
    templateLimit: 0,
  });

  const handleInputChange = (field: keyof FeatureData, value: number) => {
    setFeatureData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(featureData);
    // Reset form
    setFeatureData({
      smsLimit: 0,
      emailLimit: 0,
      userLimit: 0,
      templateLimit: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* SMS Limit */}
        <div className="space-y-2">
          <Label htmlFor="smsLimit">SMS Limit</Label>
          <Input
            id="smsLimit"
            type="number"
            min="0"
            value={featureData.smsLimit}
            onChange={(e) => handleInputChange('smsLimit', parseInt(e.target.value) || 0)}
            placeholder="25"
            required
          />
          <p className="text-xs text-muted-foreground">
            User can send {featureData.smsLimit || 0} SMS per month
          </p>
        </div>

        {/* Email Limit */}
        <div className="space-y-2">
          <Label htmlFor="emailLimit">Email Limit</Label>
          <Input
            id="emailLimit"
            type="number"
            min="0"
            value={featureData.emailLimit}
            onChange={(e) => handleInputChange('emailLimit', parseInt(e.target.value) || 0)}
            placeholder="25"
            required
          />
          <p className="text-xs text-muted-foreground">
            User can send {featureData.emailLimit || 0} emails per month
          </p>
        </div>

        {/* User Limit */}
        <div className="space-y-2">
          <Label htmlFor="userLimit">User Limit</Label>
          <Input
            id="userLimit"
            type="number"
            min="0"
            value={featureData.userLimit}
            onChange={(e) => handleInputChange('userLimit', parseInt(e.target.value) || 0)}
            placeholder="10"
            required
          />
          <p className="text-xs text-muted-foreground">
            User can add up to {featureData.userLimit || 0} users
          </p>
        </div>

        {/* Template Limit */}
        <div className="space-y-2">
          <Label htmlFor="templateLimit">Template Limit</Label>
          <Input
            id="templateLimit"
            type="number"
            min="0"
            value={featureData.templateLimit}
            onChange={(e) => handleInputChange('templateLimit', parseInt(e.target.value) || 0)}
            placeholder="5"
            required
          />
          <p className="text-xs text-muted-foreground">
            User can create up to {featureData.templateLimit || 0} templates
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Add Feature</Button>
      </DialogFooter>
    </form>
  );
} 