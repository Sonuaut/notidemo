"use server";

import { makeTemplateActionApiRequest } from "@/lib/common/api-utils";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Sanitization function to remove scripts and emojis
function sanitizeTemplateData(data: any) {
  const sanitized = { ...data };
  
  // Sanitize subject and content fields
  if (sanitized.subject) {
    sanitized.subject = sanitized.subject
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis
      .replace(/[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FAB0}-\u{1FABF}]|[\u{1FAC0}-\u{1FAFF}]|[\u{1FAD0}-\u{1FAFF}]|[\u{1FAE0}-\u{1FAFF}]|[\u{1FAF0}-\u{1FAFF}]/gu, ''); // Remove more emojis
  }
  
  if (sanitized.template_subject) {
    sanitized.template_subject = sanitized.template_subject
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis
      .replace(/[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FAB0}-\u{1FABF}]|[\u{1FAC0}-\u{1FAFF}]|[\u{1FAD0}-\u{1FAFF}]|[\u{1FAE0}-\u{1FAFF}]|[\u{1FAF0}-\u{1FAFF}]/gu, ''); // Remove more emojis
  }
  
  if (sanitized.content) {
    sanitized.content = sanitized.content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers - allow emojis in content
  }
  
  if (sanitized.name) {
    sanitized.name = sanitized.name
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis
      .replace(/[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FAB0}-\u{1FABF}]|[\u{1FAC0}-\u{1FAFF}]|[\u{1FAD0}-\u{1FAFF}]|[\u{1FAE0}-\u{1FAFF}]|[\u{1FAF0}-\u{1FAFF}]/gu, ''); // Remove more emojis
  }
  
  return sanitized;
}

interface CreateTemplatePayload {
  name: string;
  content: string;
  type: string;
  template_subject: string;
  template_color: string;
  is_custom: boolean;
  is_active: boolean;
}

interface UpdateTemplatePayload {
  name: string;
  content: string;
  type: string;
  subject: string;
  template_color: string;
  is_custom: boolean;
  is_active: boolean;
}

export async function createTemplateAction(data: CreateTemplatePayload) {
  // Sanitize the data before sending to API
  const sanitizedData = sanitizeTemplateData({
    ...data,
  });
  const result = await makeTemplateActionApiRequest(`${API_URL}/api/v1/templates/`, "POST", sanitizedData);
  
  if (result.success) {
    revalidatePath("/super-admin/templates"); 
    console.log("Template created successfully:", result.data);
  }
  
  return result;
}

export async function updateTemplateAction(data: { template_id: number } & UpdateTemplatePayload) {

  const { template_id, ...templateData } = data;
  
  // For updates, always set is_custom and is_active to true
  const updateData = {
    ...templateData,
  };
  
  // Sanitize the data before sending to API
  const sanitizedData = sanitizeTemplateData(updateData);
  
  const result = await makeTemplateActionApiRequest(
    `${API_URL}/api/v1/templates/?template_id=${template_id}`, 
    "PATCH", 
    sanitizedData
  );
  
  if (result.success) {
    console.log("Template updated successfully:", result.data);
  }
  revalidatePath("/super-admin/templates");
  
  return result;
}

export async function deleteTemplateAction(templateId: number) {
  console.log("Deleting template id:", templateId);
  const result = await makeTemplateActionApiRequest(
    `${API_URL}/api/v1/templates/?template_id=${templateId}`, 
    "DELETE"
  );
  
  if (result.success) {
    revalidatePath("/super-admin/templates");
    console.log("Template deleted successfully");
  }
  
  return result;
}

export async function updateTemplateFieldAction(
  templateId: number, 
  fieldData: Partial<{ is_custom: boolean; is_active: boolean }>
) {
  console.log("Updating template field with data:", { templateId, fieldData });
  
  const result = await makeTemplateActionApiRequest(
    `${API_URL}/api/v1/templates/?template_id=${templateId}`, 
    "PATCH", 
    fieldData
  );
  console.log("result :",result)
  if (result.success) {
    revalidatePath("/super-admin/templates");
    console.log("Template field updated successfully:", result.data);
  }
  
  return result;
} 