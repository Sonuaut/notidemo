# Notifly Admin Panel - Knowledge Transfer Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Roles & Access Control](#2-user-roles--access-control)
3. [Admin Portal Pages](#3-admin-portal-pages)
4. [Super Admin Portal Pages](#4-super-admin-portal-pages)
5. [Authentication Flow](#5-authentication-flow)
6. [Page Functionality & Workflows](#6-page-functionality--workflows)
7. [Navigation Structure](#7-navigation-structure)
8. [Common Features Across Portals](#8-common-features-across-portals)

---

## 1. Project Overview

### What is Notifly Admin Panel?
A multi-role admin panel for managing school communications, subscriptions, and user management. The system has two main user types with different access levels and functionalities.

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: Cookie-based with JWT tokens

### Project Structure
```
notifly-admin-panel/
├── app/
│   ├── admin/             # Admin portal (School administrators)
│   ├── super-admin/       # Super admin portal (System administrators)
│   └── api/               # API routes
├── components/
│   ├── admin/            # Admin-specific components
│   ├── super-admin/      # Super admin-specific components
│   └── common/           # Shared components
├── actions/              # Server actions
├── lib/                  # API calls and utilities
└── types/                # TypeScript definitions
```

---

## 2. User Roles & Access Control

### User Roles

#### 1. ADMIN
- **Who**: School administrators
- **Access**: `/admin/*` routes only
- **Purpose**: Manage their school's subscriptions, recharges, and users
- **Scope**: Limited to their specific school

#### 2. SUPER_ADMIN
- **Who**: System administrators
- **Access**: `/super-admin/*` routes only
- **Purpose**: Manage all schools, create plans, manage system-wide settings
- **Scope**: Full system access

### Role-Based Routing
- **Admin Portal**: All routes start with `/admin/`
- **Super Admin Portal**: All routes start with `/super-admin/`
- **Authentication**: Each portal has separate login pages
- **Redirects**: Users are automatically redirected based on their role

---

## 3. Admin Portal Pages

### Route: `/admin/dashboard`
**Purpose**: Main dashboard for school administrators
**What it shows**:
- School overview and statistics
- Current subscription status
- Recent activities
- Quick action buttons for plans and recharge

**Key Features**:
- Subscription status display
- Quick access to plans and recharge
- School information summary
- Credit limit warnings

### Route: `/admin/plans`
**Purpose**: Manage school's subscription plans
**What it shows**:
- Available subscription plans
- Current active plan details
- Plan comparison and selection
- Billing information

**Key Features**:
- Plan selection dialog
- Monthly/Yearly toggle
- Plan details and pricing
- Subscription management

### Route: `/admin/plans/success`
**Purpose**: Confirmation page after plan purchase
**What it shows**:
- Success message with plan details
- Subscription information
- Auto-redirect to dashboard
- Receipt information

### Route: `/admin/plans/failure`
**Purpose**: Error page for failed plan purchases
**What it shows**:
- Error message
- Retry options
- Support contact information

### Route: `/admin/recharge`
**Purpose**: Manage SMS and Email credits
**What it shows**:
- Available recharge plans
- Credit balance information
- Recharge history
- Payment options

**Key Features**:
- Recharge plan selection
- Credit type filtering (Email, SMS, Both)
- Payment processing
- Credit balance tracking

### Route: `/admin/recharge/success`
**Purpose**: Confirmation page after recharge
**What it shows**:
- Success message with recharge details
- Credit information added
- Auto-redirect to dashboard
- Transaction details

### Route: `/admin/recharge/failure`
**Purpose**: Error page for failed recharges
**What it shows**:
- Error message
- Retry options
- Support information

### Route: `/admin/users`
**Purpose**: Manage school users and teachers
**What it shows**:
- List of school users
- Teacher management
- User roles and permissions
- User activity

### Route: `/admin/profile`
**Purpose**: Manage admin's personal profile
**What it shows**:
- Personal information
- Account settings
- Password change
- Notification preferences

---

## 4. Super Admin Portal Pages

### Route: `/super-admin/dashboard`
**Purpose**: Main dashboard for system administrators
**What it shows**:
- System-wide statistics
- All schools overview
- Recent activities across all schools
- Quick access to management features

**Key Features**:
- School statistics
- System health monitoring
- Quick action buttons
- Activity feed

### Route: `/super-admin/schools`
**Purpose**: Manage all schools in the system
**What it shows**:
- List of all schools
- School details and status
- School admin information
- School statistics

**Key Features**:
- School creation and editing
- School status management
- Admin assignment
- School performance metrics

### Route: `/super-admin/school-users`
**Purpose**: Manage users for specific schools
**What it shows**:
- School selection
- Users for selected school
- Teacher management
- User roles and permissions

**Key Features**:
- School-specific user management
- Teacher assignment
- Role management
- User activity tracking

### Route: `/super-admin/plans`
**Purpose**: Create and manage subscription plans
**What it shows**:
- All available plans
- Plan creation and editing
- Plan pricing and features
- Plan status management

**Key Features**:
- Plan creation wizard
- Feature management
- Pricing configuration
- Plan activation/deactivation

### Route: `/super-admin/plans/success`
**Purpose**: Confirmation page after plan creation/update
**What it shows**:
- Success message
- Plan details
- Auto-redirect to plans page

### Route: `/super-admin/recharge`
**Purpose**: Create and manage recharge plans
**What it shows**:
- All recharge plans
- Plan creation and editing
- Credit type management
- Pricing configuration

**Key Features**:
- Recharge plan creation
- Credit type configuration (Email, SMS, Both)
- Pricing management
- Plan status control

### Route: `/super-admin/recharge/success`
**Purpose**: Confirmation page after recharge plan creation
**What it shows**:
- Success message
- Recharge plan details
- Auto-redirect to recharge page

### Route: `/super-admin/teachers`
**Purpose**: Manage all teachers across schools
**What it shows**:
- List of all teachers
- Teacher details and school assignment
- Teacher activity and performance
- Teacher management tools

### Route: `/super-admin/admins`
**Purpose**: Manage school administrators
**What it shows**:
- List of all school admins
- Admin details and school assignment
- Admin permissions and access
- Admin activity monitoring

### Route: `/super-admin/templates`
**Purpose**: Manage communication templates
**What it shows**:
- Email and SMS templates
- Template creation and editing
- Template categories and types
- Template usage statistics

---

## 5. Authentication Flow

### Login Process
1. **User visits login page** (`/admin/login` or `/super-admin/login`)
2. **Enters credentials** (email and password)
3. **System validates credentials** against API
4. **Role is determined** (admin or super_admin)
5. **User is redirected** to appropriate dashboard
6. **Session is maintained** using cookies

### Logout Process
1. **User clicks logout** button
2. **Cookies are cleared** from browser
3. **User is redirected** to login page
4. **Session is terminated** on server

### Session Management
- **Authentication token** stored in HTTP-only cookies
- **Role information** stored in cookies
- **User ID** stored in cookies
- **Automatic redirects** based on role

---

## 6. Page Functionality & Workflows

### Plan Management Workflow

#### For Admin Portal:
1. **View Plans** → Admin sees available plans
2. **Select Plan** → Admin chooses monthly/yearly plan
3. **Payment** → Admin completes payment
4. **Success** → Plan is activated, credits are added
5. **Dashboard** → Admin sees updated subscription status

#### For Super Admin Portal:
1. **Create Plan** → Super admin creates new plan
2. **Configure Features** → Set plan features and pricing
3. **Activate Plan** → Make plan available to schools
4. **Monitor Usage** → Track plan adoption across schools

### Recharge Management Workflow

#### For Admin Portal:
1. **View Recharge Plans** → Admin sees available recharge options
2. **Filter by Type** → Choose Email, SMS, or Both
3. **Select Plan** → Choose specific recharge plan
4. **Payment** → Complete payment for credits
5. **Success** → Credits are added to school account

#### For Super Admin Portal:
1. **Create Recharge Plan** → Super admin creates new recharge option
2. **Set Credit Limits** → Configure email/SMS credit amounts
3. **Set Pricing** → Configure recharge pricing
4. **Activate Plan** → Make recharge available to schools

### School Management Workflow (Super Admin Only):
1. **View Schools** → See all schools in system
2. **Create School** → Add new school to system
3. **Assign Admin** → Assign school administrator
4. **Monitor Activity** → Track school usage and performance
5. **Manage Users** → Handle school users and teachers

---

## 7. Navigation Structure

### Admin Portal Navigation
```
/admin/dashboard
├── Plans Management
│   ├── /admin/plans
│   ├── /admin/plans/success
│   └── /admin/plans/failure
├── Recharge Management
│   ├── /admin/recharge
│   ├── /admin/recharge/success
│   └── /admin/recharge/failure
├── User Management
│   └── /admin/users
└── Profile
    └── /admin/profile
```

### Super Admin Portal Navigation
```
/super-admin/dashboard
├── School Management
│   ├── /super-admin/schools
│   └── /super-admin/school-users
├── Plan Management
│   ├── /super-admin/plans
│   ├── /super-admin/plans/success
│   └── /super-admin/plans/failure
├── Recharge Management
│   ├── /super-admin/recharge
│   ├── /super-admin/recharge/success
│   └── /super-admin/recharge/failure
├── User Management
│   ├── /super-admin/teachers
│   └── /super-admin/admins
└── Content Management
    └── /super-admin/templates
```

---

## 8. Common Features Across Portals

### Success Pages
- **Purpose**: Confirm successful operations
- **Features**: 
  - Success message with details
  - Auto-redirect after 5 seconds
  - Action buttons for navigation
  - Transaction/receipt information

### Failure Pages
- **Purpose**: Handle failed operations
- **Features**:
  - Error message display
  - Retry options
  - Support contact information
  - Navigation back to previous page

### Dialog Components
- **Plans Dialog**: Select and purchase plans
- **Recharge Dialog**: Select and purchase recharge plans
- **User Dialog**: Manage user information
- **Confirmation Dialog**: Confirm destructive actions

### Data Display Patterns
- **Cards**: Display plan/recharge information
- **Tables**: List users, schools, transactions
- **Charts**: Show statistics and analytics
- **Status Indicators**: Show active/inactive states

### Loading States
- **Page Loading**: Full page loading spinners
- **Component Loading**: Individual component loading
- **Button Loading**: Loading states for actions
- **Skeleton Loading**: Placeholder content while loading

### Error Handling
- **API Errors**: Display API error messages
- **Network Errors**: Handle connection issues
- **Validation Errors**: Show form validation errors
- **Permission Errors**: Handle unauthorized access

---

*This documentation provides a clear understanding of the application's structure, user roles, and page functionalities without diving into code details.*
