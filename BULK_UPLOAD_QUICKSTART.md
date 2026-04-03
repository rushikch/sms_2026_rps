# Quick Start Guide - Bulk Student Upload

## Overview
This feature allows you to create multiple students and their associated fees in bulk using a CSV file. **Student IDs are automatically generated** - you don't need to create them manually.

---

## How to Use

### Step 1: Access Bulk Upload
1. Go to **Student Management** page
2. Click the **"Bulk Upload"** button (purple button with upload icon)
3. A modal will open with upload options

### Step 2: Prepare Your Data

#### Option A: Download Template (Recommended)
1. Click **"Download Template CSV"** button
2. This saves `student_bulk_upload_template.csv` to your computer
3. Open in Excel or Google Sheets
4. Fill in your student data

#### Option B: Create Your Own CSV
1. Use Excel or Google Sheets
2. Create columns with these exact headers:
   ```
   name, class, parent_name, phone, address, date_of_birth, date_of_joining, aadhar_number, initial_fee_amount, fees_date, other_details
   ```
3. Fill in your data
4. Save as CSV

### Step 3: Fill in Student Data

**Required fields:**
- `name` - Student's full name
- `class` - Class (must be: Nursery, LKG, UKG, Class 1-5)
- `parent_name` - Parent/Guardian name
- `phone` - 10-digit phone number (format: 9876543210)
- `address` - Complete address
- `date_of_birth` - Format: YYYY-MM-DD (e.g., 2018-05-15)
- `date_of_joining` - Format: YYYY-MM-DD (e.g., 2024-04-01)
- `aadhar_number` - 12-digit Aadhar number

**Optional fields:**
- `initial_fee_amount` - Fee amount (e.g., 5000, 2500.50) - leave empty if no fee
- `fees_date` - Fee payment date, Format: YYYY-MM-DD
- `other_details` - Any additional notes

### Step 4: Upload CSV File
1. Click on the upload area or **click to select file**
2. Choose your CSV file
3. Click **"Upload and Create Students"**

### Step 5: Review Results

The system will show:
- ✅ Number of students created
- ✅ Number of fees created  
- ✅ List of generated Student IDs
- ⚠️ Any errors with specific row numbers

---

## Student ID Format

### Automatic Generation ✨
You **do NOT** need to provide Student IDs - they're generated automatically!

### Format: `RPS{YEAR}{CLASS}{RANDOM}`
- **RPS** - School code
- **2026** - Current year
- **{CLASS}** - Class abbreviation:
  - Nursery → NUR
  - LKG → LKG
  - UKG → UKG
  - Class 1 → C01 (through Class 5 → C05)
- **{RANDOM}** - Random 3-digit number (001-999)

### Examples:
- `RPS2026C01042` (Class 1)
- `RPS2026C05789` (Class 5)
- `RPS2026NUR213` (Nursery)

---

## CSV File Example

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
John Doe,Class 1,Jane Doe,9876543210,"123 Main Street, City",2018-05-15,2024-04-01,123456789012,5000,2024-04-01,None
Maria Garcia,Class 2,Robert Garcia,9123456789,"456 Oak Avenue, City",2017-08-22,2024-04-01,234567890123,5000,2024-04-01,
Priya Singh,Nursery,Rajesh Singh,9876543211,"789 Pine Road, City",2021-02-10,2024-04-01,345678901234,,2024-04-01,Allergic to peanuts
```

---

## Common Issues & Solutions

### ❌ Issue: "Phone must be 10 digits"
**Solution:** Remove spaces, dashes, or special characters. Use format: `9876543210`

### ❌ Issue: "Invalid date format"
**Solution:** Use format `YYYY-MM-DD` (e.g., `2024-04-01`)

### ❌ Issue: "Class is required" or invalid class name
**Solution:** Use exact class names:
- Nursery
- LKG
- UKG
- Class 1
- Class 2
- Class 3
- Class 4
- Class 5

### ❌ Issue: "Some rows created, some failed"
**Solution:** The system shows which rows had errors. Fix those specific rows and upload again - valid rows are already created.

### ❌ Issue: Can't open CSV in Excel
**Solution:** 
1. Create a blank Excel file
2. Go to Data → From Text
3. Select your CSV file
4. Choose "Comma" as delimiter

---

## Excel to CSV Conversion

### Using Microsoft Excel:
1. Open your Excel file
2. File → Save As
3. Select: **CSV (Comma delimited) (*.csv)**
4. Save

### Using Google Sheets:
1. Open your Google Sheet
2. File → Download → **Comma-separated values (.csv)**

---

## What Happens When You Upload?

### Validation ✓
- Checks all required fields
- Validates date formats
- Validates phone numbers (10 digits)
- Ensures class names are correct

### Creation ✓
- Generates unique Student IDs for each record
- Creates student records in database
- Creates fee records if amounts provided
- Saves all in one transaction

### Success Response 📊
- Shows number of students created
- Shows number of fees created
- Lists all generated Student IDs
- Reports any errors with row numbers

---

## Tips for Success

✅ **DO:**
- Use exactly the column names shown (case-insensitive, but exact spelling)
- Test with 5-10 students first
- Format dates as YYYY-MM-DD
- Include phone numbers without spaces (10 digits only)
- Quote fields that contain commas
- Keep a backup of your CSV

❌ **DON'T:**
- Provide Student IDs manually - they're auto-generated
- Leave required fields empty
- Use different class name formats
- Use semicolons (`;`) as delimiter
- Use different date formats (MM/DD/YYYY, etc.)
- Upload duplicate data - check first

---

## File Specifications

- **File Type:** CSV (Comma-Separated Values) or Excel
- **Encoding:** UTF-8
- **Delimiter:** Comma (`,`)
- **Text Qualifier:** Double quotes (`"`) for fields with commas
- **Header Row:** Required (must match exactly)
- **Max File Size:** Usually limited by browser (typically 100MB+)

---

## Support

### Documentation Files:
- **BULK_UPLOAD_FORMAT.md** - Complete detailed format specification
- **student_bulk_upload_template.csv** - Sample template file

### For Help:
1. Check error messages - they're specific to the problem
2. Verify phone format (10 digits, no spaces)
3. Verify date format (YYYY-MM-DD)
4. Verify class names (exact match required)
5. Check that no required fields are empty

---

## Example Bulk Upload Scenarios

### Scenario 1: Create 50 Class 1 students with fees
```
- Prepare CSV with 50 rows
- Include initial_fee_amount (5000) and fees_date
- Upload single file
- Result: 50 students + 50 fees created with auto-generated IDs
```

### Scenario 2: Create mixed classes without initial fees
```
- Create students from Class 1, 2, 3, etc.
- Leave initial_fee_amount and fees_date empty
- Upload
- Result: Students created, no fee records
```

### Scenario 3: Multiple uploads, same class
```
- Upload first batch of Class 1 students (IDs: RPS2026C01***) 
- Upload second batch of Class 1 students (different random IDs)
- System prevents duplicate IDs automatically
```

---

## Questions?

The data format and validation are designed to be clear and helpful. Any errors reported will tell you exactly which row and what field had the problem.

**Enjoy bulk creating students! 🎉**
