# Rainbow Public School Management System (SMS 2026)

A comprehensive School Management System built for Rainbow Public School to efficiently manage student records, fee collection, and administrative tasks.

## 📋 Project Overview

This is a modern, full-stack web application designed to streamline school administration. The system provides role-based access control for administrators, teachers, and staff to manage student information, track fee payments, and generate receipts.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.2.2
- **UI Components**: React 18 with custom components
- **Icons**: Lucide React

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Supabase Client & Server SDKs

### Additional Libraries
- **State Management**: React Hooks
- **Notifications**: React Hot Toast
- **Printing**: React-to-Print
- **Styling**: PostCSS with Autoprefixer

## ✨ Features

### Student Management
- ✅ Add, view, edit, and delete student records
- ✅ Custom student ID generation (RPS<YEAR><CLASS><Random3digitnumber>)
- ✅ Comprehensive student profiles with all details
- ✅ Class-based student organization
- ✅ Search and filter functionality
- ✅ Active/Inactive student status management
- ✅ Download student data as CSV (Super Admin only)

### Finance Management
- ✅ Track daily expenses, monthly bills, and adhoc expenses
- ✅ Record fee collections and other income
- ✅ Comprehensive financial transaction management
- ✅ Advanced filtering by type, category, and date range
- ✅ Financial summary with income, expenses, and net calculations
- ✅ Download financial data as CSV (Super Admin only)

### User Management & Security
- ✅ Role-based access control (Super Admin, Admin, User)
- ✅ Secure authentication with Supabase
- ✅ Create and manage user accounts
- ✅ Assign and edit user roles dynamically
- ✅ Delete/remove users from the system
- ✅ Super Admin only access to user management
- ✅ Protected routes and middleware

### UI/UX Features
- ✅ Responsive design for all devices
- ✅ Modern, professional interface
- ✅ Modal-based interactions
- ✅ Real-time notifications
- ✅ Print-friendly receipts

## � Role-Based Permissions

### Super Admin
- ✅ Full access to all features
- ✅ Add, edit, and delete students
- ✅ Add, edit, and delete fee payments
- ✅ Add, edit, and delete financial transactions
- ✅ Toggle student active/inactive status
- ✅ Download student, fee, and financial data as CSV
- ✅ Create, edit, and delete user accounts
- ✅ Manage user roles and permissions
- ✅ All administrative functions

### Admin
- ✅ Add new students
- ✅ Edit existing students
- ✅ Toggle student active/inactive status
- ✅ Add fee payments
- ✅ Add financial transactions (expenses only - no view, edit, or delete capabilities)
- ❌ Cannot delete students
- ❌ Cannot edit or delete fee payments
- ❌ Cannot edit or delete financial transactions
- ❌ Cannot manage users
- ❌ Cannot download data

### User
- ✅ View-only access to student, fee, and financial information
- ❌ Cannot modify any data
- ❌ Cannot manage users

## �📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Supabase** account and project

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sms_2026_rps
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

#### Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

#### Database Tables
Run the following SQL commands in your Supabase SQL Editor:

```sql
-- Students table
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT UNIQUE,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  date_of_birth DATE,
  date_of_joining DATE,
  other_details TEXT,
  aadhar_number TEXT,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fees table
CREATE TABLE fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  transaction_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial transactions table
CREATE TABLE financial_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('expense', 'collection')),
  category TEXT NOT NULL CHECK (category IN ('daily_expense', 'monthly_bill', 'adhoc_expense', 'fee_collection')),
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table
CREATE TABLE user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('superadmin', 'admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (adjust according to your needs)
CREATE POLICY "Allow authenticated users to read students" ON students
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to manage students" ON students
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('superadmin', 'admin')
    )
  );

CREATE POLICY "Allow authenticated users to read fees" ON fees
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to manage fees" ON fees
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('superadmin', 'admin')
    )
  );

CREATE POLICY "Allow authenticated users to read financial transactions" ON financial_transactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins to manage financial transactions" ON financial_transactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('superadmin', 'admin')
    )
  );

CREATE POLICY "Allow users to read their own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow superadmin to manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'superadmin'
    )
  );
```

#### Add Student ID Column (if not already present)
```sql
ALTER TABLE students ADD COLUMN IF NOT EXISTS student_id TEXT;
```

#### Add Active Status Column (for existing databases)
```sql
ALTER TABLE students ADD COLUMN active BOOLEAN DEFAULT true NOT NULL;
UPDATE students SET active = true WHERE active IS NULL;
COMMENT ON COLUMN students.active IS 'Indicates if the student is currently active/enrolled in the school';
```

### 5. User Setup
After setting up the database, create your first superadmin user:

1. Sign up through the application login page
2. Manually set the user role in Supabase:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('your-user-uuid', 'superadmin');
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📖 Usage Guide

### User Roles & Permissions

- **Super Admin**: Full access to all features including user management
- **Admin**: Can manage students and fees
- **User**: Limited access (view-only for most features)

### Student Management

1. **Adding Students**:
   - Navigate to the Students page
   - Click "Add Student"
   - Fill in all required information
   - System automatically generates unique Student ID

2. **Viewing Students**:
   - Use "All Students" view for complete list
   - Use "Students by Class" for organized view
   - Click "View" button for detailed student information

3. **Editing Students**:
   - Click "Edit" button in the actions column
   - Or click "Edit Student" from the View modal
   - Modify information and save

### Fee Management

1. **Recording Payments**:
   - Go to Students page
   - Click "Fees" button for any student
   - Click "Add Fee Payment"
   - Enter amount and date

2. **Viewing Fee History**:
   - Access through student's Fees modal
   - View all payments with transaction details

3. **Printing Receipts**:
   - Click "Print" button on any fee receipt
   - Automatically formatted for printing

## 📁 Project Structure

```
sms_2026_rps/
├── app/                          # Next.js App Router
│   ├── fees/                     # Fee management page
│   ├── login/                    # Authentication page
│   ├── students/                 # Student management page
│   ├── unauthorized/             # Access denied page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Dashboard/home page
├── components/                   # React components
│   ├── FeeManagement.tsx         # Fee management component
│   ├── Header.tsx                # Application header
│   ├── Receipt.tsx               # Receipt printing component
│   └── StudentList.tsx           # Student management component
├── hooks/                        # Custom React hooks
│   └── useRole.ts                # Role management hook
├── utils/                        # Utility functions
│   └── supabase/                 # Supabase configuration
│       ├── client.ts             # Client-side Supabase client
│       ├── server.ts             # Server-side Supabase client
│       └── utils/                # Additional utilities
├── middleware.ts                 # Next.js middleware for auth
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🔧 Development Notes

### Student ID Format
- Format: `RPS<YEAR><CLASS><Random3digitnumber>`
- Example: `RPS2026NUR001`, `RPS2026C05023`
- Class abbreviations:
  - NUR: Nursery
  - LKG: LKG
  - UKG: UKG
  - C01-C05: Class 1-5

### Authentication Flow
- Uses Supabase Auth for user management
- Protected routes via middleware
- Role-based access control

### Print Functionality
- Uses `react-to-print` for receipt printing
- Custom CSS for print media
- Optimized for standard receipt paper

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Rainbow Public School.

## 🆘 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for Rainbow Public School**