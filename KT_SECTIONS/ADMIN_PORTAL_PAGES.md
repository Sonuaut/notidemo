# Admin Portal Pages - Detailed Flow Documentation

## Overview
The Admin Portal is designed for school administrators to manage their school's subscriptions, recharges, and users. All routes start with `/admin/` and are accessible only to users with the ADMIN role.

---

## 1. Dashboard Page (`/admin/dashboard`)

### Purpose
Main landing page for school administrators after login. Provides overview of school's current status and quick access to key features.

### What Users See
- **Credit Balance**: Current SMS and Email credits available
- **Quick Actions**: Buttons to access plans, recharge, and user management
- **Recent Activity**: List of recent transactions and activities
- **Statistics**: Usage metrics and school performance data

### Key Functionality
- **Plan Status Display**: Shows if school has active subscription
- **Credit Warnings**: Alerts when credits are running low

### User Workflow
1. User logs in and lands on dashboard
2. Reviews school status and credit balance
3. Sees any warnings or alerts
4. Uses quick action buttons to navigate to specific features


---

## 2. Plans Page (`/admin/plans`)

### Purpose
Allows school administrators to view, compare, and purchase subscription plans for their school.

### What Users See
- **Available Plans**: List of all subscription plans available
- **Current Plan**: Highlighted current active plan (if any)
- **Plan Details**: Features, pricing, and benefits of each plan
- **Billing Options**: Monthly vs Yearly pricing
- **Plan Comparison**: Side-by-side comparison of different plans

### Key Functionality
- **Plan Selection**: Click to select a plan
- **Plan Details Modal**: Detailed view of plan features
- **Billing Toggle**: Switch between monthly and yearly pricing
- **Purchase Flow**: Initiate plan purchase process

### User Workflow
1. User views available plans
2. Compares different plan options
3. Selects desired plan (monthly or yearly)
4. Reviews plan details and pricing
5. Initiates purchase process
6. Completes payment
7. Gets redirected to success page

---

## 3. Plans Success Page (`/admin/plans/success`)

### Purpose
Confirmation page shown after successful plan purchase. Displays purchase details and next steps.

### What Users See
- **Success Message**: Confirmation that plan was purchased
- **Plan Details**: Information about the purchased plan
- **Billing Information**: Amount paid, billing cycle, next payment date
- **Auto-Redirect**: Countdown to automatic redirect to dashboard
- **Action Buttons**: Options to go to dashboard or view plans

### Key Functionality
- **Purchase Confirmation**: Shows successful transaction
- **Plan Information**: Displays purchased plan details
- **Auto-Redirect**: Automatically redirects after 5 seconds
- **Navigation Options**: Manual navigation buttons

### User Workflow
1. User completes plan purchase
2. Gets redirected to success page
3. Reviews purchase details
4. Waits for auto-redirect or manually navigates
5. Returns to dashboard to see updated status

---

## 4. Plans Failure Page (`/admin/plans/failure`)

### Purpose
Error page shown when plan purchase fails. Provides error information and retry options.

### What Users See
- **Error Message**: Description of what went wrong
- **Error Details**: Technical details about the failure
- **Retry Options**: Buttons to try again or go back
- **Support Information**: Contact details for assistance

### Key Functionality
- **Error Display**: Shows what went wrong
- **Retry Mechanism**: Option to try purchase again
- **Support Access**: Easy access to help and support
- **Navigation**: Options to go back or try again

### User Workflow
1. Plan purchase fails
2. User sees error page
3. Reviews error message
4. Decides to retry or contact support
5. Either retries purchase or seeks help

---

## 5. Recharge Page (`/admin/recharge`)

### Purpose
Allows school administrators to purchase additional SMS and Email credits for their school.

### What Users See
- **Recharge Plans**: List of available recharge options
- **Credit Types**: Filter by Email, SMS, or Both
- **Current Balance**: Shows current credit balance
- **Plan Details**: Credit amounts and pricing for each plan
- **Purchase Options**: Buttons to select and purchase recharge

### Key Functionality
- **Type Filtering**: Filter recharge plans by credit type
- **Plan Selection**: Choose specific recharge plan
- **Balance Display**: Show current credit balance
- **Purchase Flow**: Initiate recharge purchase process

### User Workflow
1. User views available recharge plans
2. Filters by credit type (Email, SMS, Both)
3. Selects desired recharge plan
4. Reviews credit amount and pricing
5. Initiates purchase process
6. Completes payment
7. Gets redirected to success page

---

## 6. Recharge Success Page (`/admin/recharge/success`)

### Purpose
Confirmation page shown after successful recharge purchase. Displays recharge details and updated credit balance.

### What Users See
- **Success Message**: Confirmation that recharge was successful
- **Recharge Details**: Information about the purchased recharge
- **Credit Information**: New credit balance after recharge
- **Transaction Details**: Amount paid, transaction ID, date
- **Auto-Redirect**: Countdown to automatic redirect to dashboard

### Key Functionality
- **Recharge Confirmation**: Shows successful transaction
- **Credit Update**: Displays new credit balance
- **Transaction Info**: Shows payment and transaction details
- **Auto-Redirect**: Automatically redirects after 5 seconds

### User Workflow
1. User completes recharge purchase
2. Gets redirected to success page
3. Reviews recharge details and new balance
4. Waits for auto-redirect or manually navigates
5. Returns to dashboard to see updated credits

---

## 7. Recharge Failure Page (`/admin/recharge/failure`)

### Purpose
Error page shown when recharge purchase fails. Provides error information and retry options.

### What Users See
- **Error Message**: Description of what went wrong
- **Error Details**: Technical details about the failure
- **Retry Options**: Buttons to try again or go back
- **Support Information**: Contact details for assistance

### Key Functionality
- **Error Display**: Shows what went wrong
- **Retry Mechanism**: Option to try recharge again
- **Support Access**: Easy access to help and support
- **Navigation**: Options to go back or try again

### User Workflow
1. Recharge purchase fails
2. User sees error page
3. Reviews error message
4. Decides to retry or contact support
5. Either retries recharge or seeks help

---

## 8. Users Page (`/admin/users`)

### Purpose
Allows school administrators to manage users and teachers within their school.

### What Users See
- **User List**: List of all users in the school
- **User Details**: Name, email, role, status for each user
- **Teacher Management**: Specific section for teacher users
- **User Actions**: Options to edit, deactivate, or manage users
- **Add User**: Button to add new users to the school

### Key Functionality
- **User Management**: View and manage school users
- **Teacher Assignment**: Assign teachers to classes or subjects
- **Role Management**: Set user roles and permissions
- **User Status**: Activate or deactivate users
- **Add New Users**: Create new user accounts

### User Workflow
1. User views list of school users
2. Reviews user details and status
3. Manages teacher assignments
4. Updates user roles or permissions
5. Adds new users as needed
6. Monitors user activity and status

---

## 9. Profile Page (`/admin/profile`)

### Purpose
Allows school administrators to manage their personal profile and account settings.

### What Users See
- **Personal Information**: Name, email, phone, address
- **Account Settings**: Password change, notification preferences
- **School Information**: School details and admin role
- **Security Settings**: Two-factor authentication, login history
- **Preferences**: Language, timezone, display options

### Key Functionality
- **Profile Management**: Update personal information
- **Password Change**: Change account password
- **Notification Settings**: Configure email and SMS notifications
- **Security Options**: Manage account security settings
- **Preferences**: Set personal preferences

### User Workflow
1. User accesses profile page
2. Reviews current profile information
3. Updates personal details as needed
4. Changes password or security settings
5. Configures notification preferences
6. Saves changes and returns to dashboard

---

## Common Patterns Across Admin Portal

### Navigation
- **Sidebar Navigation**: Consistent sidebar with main menu items
- **Breadcrumbs**: Shows current page location
- **Quick Actions**: Fast access to common tasks
- **User Menu**: Profile and logout options

### Data Display
- **Cards**: Information displayed in card format
- **Tables**: Lists of data in table format
- **Status Indicators**: Visual indicators for status
- **Progress Bars**: Show completion or usage

### User Interactions
- **Modal Dialogs**: For detailed views and forms
- **Confirmation Dialogs**: For destructive actions
- **Loading States**: Show progress during operations
- **Success/Error Messages**: Feedback for user actions

### Responsive Design
- **Mobile Friendly**: Works on all device sizes
- **Touch Support**: Touch-friendly interface
- **Adaptive Layout**: Adjusts to screen size
- **Accessibility**: Screen reader and keyboard support
