import { Subscription } from "@/lib/admin/subscription"

export interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  country: string
  zipcode: string
  website?: string | null
  phone: string
  email: string
  status: "active" | "inactive"
  created_at?: string
  admin_id?: number
  subscription: any
}

export interface User {
  id: number
  name: string
  email: string
  role: "user" | "moderator" | "admin" | "super_admin" | "teacher"
  status: "active" | "inactive"
  joinDate?: string
  avatar?: string
  schoolName?: string
  phone?: string
  profile_img_url?:string
}


export interface Plan {
  id: number
  planType: string
  planName: string
  monthlyPrice: number
  userRole: string
  status: Status
  description?: string
  features?: string[]
  created_at?: string
  updated_at?: string
}

export enum Status{
  ACTIVE="active",
  INACTIVE="inactive"
}
export interface PlanFeatures {
  id?: number;
  sms_limit: string;
  sms_limit_detail: string;
  email_limit: string;
  email_limit_detail: string;
  preloaded_templates: string;
  preloaded_templates_detail?: string;
  custom_templates?: string;
  custom_templates_detail?: string;
  user_limit?: string;
  user_limit_detail?: string;
  realtime_alerts?: boolean;
  realtime_alerts_detail?: string;
  multi_contact_send?: boolean;
  multi_contact_send_detail?: string;
  dual_send_sms_email?: boolean;
  dual_send_sms_email_detail?: string;
  dual_mode?: boolean;
  dual_mode_detail?: string;
  inapp_upgrade_available?: boolean;
  inapp_upgrade_available_detail?: string;
  downloadable_history?: boolean;
  downloadable_history_detail?: string;
  message_translation?: boolean;
  message_translation_detail?: string;
  email_support?: boolean;
  email_support_detail?: string;
  priority_email_support?: boolean;
  priority_email_support_detail?: string;
  user_analytics?: boolean;
  user_analytics_detail?: string;
  push_notifications?: boolean;
  push_notifications_detail?: string;
  engagement_reports?: boolean;
  engagement_reports_detail?: string;
  is_active?: boolean;
  is_monthly?: boolean;
}

export interface PlanResponse {
  id: number;
  title: string;
  monthly_amount: number;
  yearly_amount: number;
  role_type_plan: RoleTypePlan;
  stripeId_monthly?: string;
  stripeId_yearly?: string;
  is_active: boolean;
  plan_features: PlanFeatures[];
  created_at: string;
  updated_at: string;
}

export enum RoleTypePlan{
  ORGANIZATION="Organization",
  INDIVIDUAL="Individual"
}
export interface PaginationInfo {
  total: number
  limit: number
  offset: number
  total_pages: number
  next: string | null
  previous: string | null
}

export interface PlansResponse {
  plans: PlanResponse[]
  pagination: PaginationInfo
}

export enum paginationLimit{
  LIMIT_5=5,
  LIMIT_10=10,
  LIMIT_20=20,
  LIMIT_50=50
}


export enum IRole{
ADMIN="admin",
SUPER_ADMIN="super-admin"
}

export enum ICookiesKey{
  AUTHTOKEN="auth_token",
  ROLE="role",
  EXPRIY="token_expiry",
  USER="user",
  PLAN="plan",
  SUBSCRIPTION="subscription"
}

export enum FormMode{
  CREATE="create",
  UPDATE="update"
}



export const DEFAULT_PAGE = 1;
export const DEFAULT_ROWS_PER_PAGE = 10;

export enum PlanLimitType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface PlanLimits {
  email_limit: number;
  sms_limit: number;
  template_limit: number;
  user_limit: number;
}

export interface PlanFormData {
  planName: string;
  roleType: RoleTypePlan;
  monthlyPrice: string;
  yearlyPrice: string;
  stripeIdMonthly: string;
  stripeIdYearly: string;
  planStatus: boolean;
  monthlyLimits: PlanLimits;
  yearlyLimits: PlanLimits;
}

export interface CreatePlanPayload {
  title: string;
  monthly_amount: number;
  yearly_amount: number;
  role_type_plan: RoleTypePlan;
  monthly_limits: PlanLimits;
  yearly_limits: PlanLimits;
}

export interface UpdatePlanPayload extends CreatePlanPayload {
  plan_id: number;
  stripeId_monthly?: string;
  stripeId_yearly?: string;
  plan_status?: boolean;
}

// Recharge Types
export enum RechargeType {
  EMAIL = "Email",
  SMS = "SMS",
BOTH = "EmailAndSMS"
}

export interface RechargeResponse {
  id: number;
  title: string;
  email_limit: number;
  sms_limit: number;
  email_detail: string;
  sms_detail: string;
  type: RechargeType;
  recharge_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RechargesResponse {
  recharges: RechargeResponse[];
  pagination: PaginationInfo;
}

export interface CreateRechargePayload {
  title: string;
  email_limit: number;
  sms_limit: number;
  email_detail: string;
  sms_detail: string;
  type: RechargeType;
  recharge_price: number;
}

export interface UpdateRechargePayload {
  id: number;
  title: string;
  email_limit: number;
  sms_limit: number;
  email_detail: string;
  sms_detail: string;
  type: RechargeType;
  recharge_price: number;
  is_active?: boolean;
}


export interface Template {
  id: number;
  name: string;
  type: string;
  subject: string;
  content: string;
  template_color: string;
  createdDate: string;
  is_custom: boolean;
  is_active?: boolean;
}