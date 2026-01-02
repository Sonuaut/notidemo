# Super Admin Portal Pages - Detailed Flow Documentation

## Overview
The Super Admin Portal is designed for system administrators to manage all schools, create plans, manage users, and oversee the entire system. All routes start with `/super-admin/` and are accessible only to users with the SUPER_ADMIN role.

---

## 1. Dashboard Page (`/super-admin/dashboard`)

### Purpose
Main landing page for system administrators after login. Provides system-wide overview and quick access to all management features.

### What Users See
- **System Statistics**: Total schools, users, plans, transactions
- **School Overview**: List of all schools with key metrics
- **Recent Activity**: System-wide activity feed
- **Quick Actions**: Buttons to access all management features
- **Performance Metrics**: System health and usage statistics
- **Alert Center**: System alerts and notifications

### Key Functionality
- **System Monitoring**: Overview of entire system status
- **Quick Navigation**: Direct access to all management features
- **Activity Tracking**: Monitor all system activities
- **Alert Management**: Handle system alerts and issues

### User Workflow
1. User logs in and lands on dashboard
2. Reviews system statistics and health
3. Checks recent activity and alerts
4. Uses quick action buttons to navigate to specific features
5. Monitors system performance and usage

---

## 2. Schools Page (`/super-admin/schools`)

### Purpose
Allows super admins to manage all schools in the system, create new schools, and assign administrators.

### What Users See
- **Schools List**: All schools in the system with key information
- **School Details**: Name, address, admin, status, statistics
- **School Actions**: Edit, view details, manage users, deactivate
- **Add School**: Button to create new schools
- **Search/Filter**: Find specific schools quickly
- **School Statistics**: Usage and performance metrics

### Key Functionality
- **School Management**: View and manage all schools
- **School Creation**: Add new schools to the system
- **Admin Assignment**: Assign administrators to schools
- **School Status**: Activate or deactivate schools
- **Performance Tracking**: Monitor school usage and performance

### User Workflow
1. User views list of all schools
2. Reviews school details and status
3. Creates new schools as needed
4. Assigns administrators to schools
5. Monitors school performance and usage
6. Manages school status and settings

---

## 3. School Users Page (`/super-admin/school-users`)

### Purpose
Allows super admins to manage users for specific schools, including teachers and school administrators.

### What Users See
- **School Selection**: Dropdown to select specific school
- **User List**: All users for selected school
- **User Details**: Name, email, role, status, activity
- **User Actions**: Edit, deactivate, change roles
- **Add User**: Button to add new users to school
- **Bulk Actions**: Manage multiple users at once

### Key Functionality
- **School-Specific Management**: Focus on one school at a time
- **User Management**: Add, edit, and manage school users
- **Role Assignment**: Set user roles and permissions
- **Bulk Operations**: Manage multiple users simultaneously
- **Activity Monitoring**: Track user activity and status

### User Workflow
1. User selects a school from dropdown
2. Views all users for that school
3. Manages individual users (edit, deactivate, change roles)
4. Adds new users to the school
5. Performs bulk operations on multiple users
6. Monitors user activity and performance

---

## 4. Plans Page (`/super-admin/plans`)

### Purpose
Allows super admins to create, edit, and manage subscription plans that are available to schools.

### What Users See
- **Plans List**: All subscription plans in the system
- **Plan Details**: Features, pricing, status, usage statistics
- **Plan Actions**: Edit, duplicate, activate/deactivate, delete
- **Add Plan**: Button to create new plans
- **Plan Features**: Manage plan features and benefits
- **Pricing Management**: Set monthly and yearly pricing

### Key Functionality
- **Plan Creation**: Create new subscription plans
- **Feature Management**: Define plan features and benefits
- **Pricing Control**: Set and manage plan pricing
- **Plan Status**: Activate or deactivate plans
- **Usage Tracking**: Monitor plan adoption and usage

### User Workflow
1. User views all available plans
2. Creates new plans with specific features
3. Sets pricing for monthly and yearly cycles
4. Manages plan features and benefits
5. Activates or deactivates plans
6. Monitors plan usage across schools

---

## 5. Plans Success Page (`/super-admin/plans/success`)

### Purpose
Confirmation page shown after successful plan creation or update. Displays plan details and next steps.

### What Users See
- **Success Message**: Confirmation that plan was created/updated
- **Plan Details**: Information about the created/updated plan
- **Feature Summary**: List of plan features and benefits
- **Pricing Information**: Monthly and yearly pricing
- **Auto-Redirect**: Countdown to automatic redirect to plans page
- **Action Buttons**: Options to go to plans or create another

### Key Functionality
- **Creation Confirmation**: Shows successful plan creation
- **Plan Information**: Displays created plan details
- **Feature Overview**: Shows plan features and benefits
- **Auto-Redirect**: Automatically redirects after 5 seconds

### User Workflow
1. User creates or updates a plan
2. Gets redirected to success page
3. Reviews plan details and features
4. Waits for auto-redirect or manually navigates
5. Returns to plans page to see updated list

---

## 6. Recharge Page (`/super-admin/recharge`)

### Purpose
Allows super admins to create and manage recharge plans for SMS and Email credits.

### What Users See
- **Recharge Plans List**: All recharge plans in the system
- **Plan Details**: Credit amounts, pricing, type, status
- **Plan Actions**: Edit, duplicate, activate/deactivate, delete
- **Add Plan**: Button to create new recharge plans
- **Credit Types**: Manage Email, SMS, and combined plans
- **Usage Statistics**: Track recharge plan usage

### Key Functionality
- **Recharge Plan Creation**: Create new recharge options
- **Credit Configuration**: Set email and SMS credit amounts
- **Pricing Management**: Set recharge plan pricing
- **Type Management**: Manage different credit types
- **Usage Tracking**: Monitor recharge plan adoption

### User Workflow
1. User views all recharge plans
2. Creates new recharge plans with specific credit amounts
3. Sets pricing for different credit types
4. Manages plan features and benefits
5. Activates or deactivates plans
6. Monitors recharge plan usage across schools

---

## 7. Recharge Success Page (`/super-admin/recharge/success`)

### Purpose
Confirmation page shown after successful recharge plan creation. Displays plan details and next steps.

### What Users See
- **Success Message**: Confirmation that recharge plan was created
- **Plan Details**: Information about the created recharge plan
- **Credit Information**: Email and SMS credit amounts
- **Pricing Details**: Recharge plan pricing
- **Auto-Redirect**: Countdown to automatic redirect to recharge page

### Key Functionality
- **Creation Confirmation**: Shows successful recharge plan creation
- **Plan Information**: Displays created recharge plan details
- **Credit Overview**: Shows credit amounts and types
- **Auto-Redirect**: Automatically redirects after 5 seconds

### User Workflow
1. User creates a recharge plan
2. Gets redirected to success page
3. Reviews recharge plan details
4. Waits for auto-redirect or manually navigates
5. Returns to recharge page to see updated list

---

## 8. Teachers Page (`/super-admin/teachers`)

### Purpose
Allows super admins to manage all teachers across all schools in the system.

### What Users See
- **Teachers List**: All teachers in the system
- **Teacher Details**: Name, email, school, status, activity
- **School Assignment**: Which school each teacher belongs to
- **Teacher Actions**: Edit, deactivate, reassign school
- **Search/Filter**: Find teachers by name, school, or status
- **Bulk Actions**: Manage multiple teachers at once

### Key Functionality
- **Teacher Management**: View and manage all teachers
- **School Assignment**: Assign teachers to schools
- **Status Management**: Activate or deactivate teachers
- **Bulk Operations**: Manage multiple teachers simultaneously
- **Activity Monitoring**: Track teacher activity and performance

### User Workflow
1. User views list of all teachers
2. Reviews teacher details and school assignments
3. Searches or filters teachers as needed
4. Manages individual teachers (edit, deactivate, reassign)
5. Performs bulk operations on multiple teachers
6. Monitors teacher activity and performance

---

## 9. Admins Page (`/super-admin/admins`)

### Purpose
Allows super admins to manage all school administrators in the system.

### What Users See
- **Admins List**: All school administrators in the system
- **Admin Details**: Name, email, school, status, permissions
- **School Assignment**: Which school each admin manages
- **Admin Actions**: Edit, deactivate, reassign school, change permissions
- **Search/Filter**: Find admins by name, school, or status
- **Permission Management**: Set admin permissions and access levels

### Key Functionality
- **Admin Management**: View and manage all school administrators
- **School Assignment**: Assign admins to schools
- **Permission Control**: Set admin permissions and access levels
- **Status Management**: Activate or deactivate admins
- **Activity Monitoring**: Track admin activity and performance

### User Workflow
1. User views list of all school administrators
2. Reviews admin details and school assignments
3. Manages admin permissions and access levels
4. Assigns or reassigns admins to schools
5. Monitors admin activity and performance
6. Handles admin status and permissions

---

## 10. Templates Page (`/super-admin/templates`)

### Purpose
Allows super admins to manage communication templates for emails and SMS messages.

### What Users See
- **Templates List**: All communication templates in the system
- **Template Details**: Name, type, content, usage statistics
- **Template Actions**: Edit, duplicate, activate/deactivate, delete
- **Add Template**: Button to create new templates
- **Template Categories**: Organize templates by type or purpose
- **Usage Analytics**: Track template usage across schools

### Key Functionality
- **Template Creation**: Create new communication templates
- **Content Management**: Edit template content and formatting
- **Category Organization**: Organize templates by type or purpose
- **Usage Tracking**: Monitor template usage across schools
- **Template Status**: Activate or deactivate templates

### User Workflow
1. User views all communication templates
2. Creates new templates for different purposes
3. Edits existing template content and formatting
4. Organizes templates by categories
5. Monitors template usage and performance
6. Manages template status and availability

---

## Common Patterns Across Super Admin Portal

### Navigation
- **Comprehensive Menu**: Access to all management features
- **Breadcrumbs**: Shows current page location in hierarchy
- **Quick Actions**: Fast access to common tasks
- **System Status**: Always visible system health indicators

### Data Management
- **Bulk Operations**: Manage multiple items simultaneously
- **Advanced Filtering**: Complex search and filter options
- **Export/Import**: Data export and import capabilities
- **Audit Trails**: Track all changes and activities

### System Monitoring
- **Real-time Statistics**: Live system metrics
- **Alert Management**: Handle system alerts and issues
- **Performance Tracking**: Monitor system performance
- **Usage Analytics**: Track feature usage and adoption

### User Management
- **Role-based Access**: Different permission levels
- **Activity Monitoring**: Track user activities
- **Bulk User Operations**: Manage multiple users
- **Permission Management**: Fine-grained access control

### Content Management
- **Template System**: Manage communication templates
- **Content Organization**: Categorize and organize content
- **Usage Analytics**: Track content usage
- **Version Control**: Manage content versions

### Reporting & Analytics
- **System Reports**: Comprehensive system reports
- **Usage Analytics**: Track feature usage
- **Performance Metrics**: Monitor system performance
- **Custom Dashboards**: Configurable dashboard views
