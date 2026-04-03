# Bulk Student Import - Data Format Guide

## Overview
This guide explains the exact format and fields required for bulk importing students and their fees using CSV format.

---

## Column Requirements

### Required Fields (Must be provided)
1. **name** - Student's full name
   - Type: Text
   - Example: `John Doe`, `Maria Garcia`
   - Constraints: Cannot be empty

2. **class** - Student's class/grade
   - Type: Text (must match exactly)
   - Allowed values: 
     - `Nursery`
     - `LKG`
     - `UKG`
     - `Class 1`
     - `Class 2`
     - `Class 3`
     - `Class 4`
     - `Class 5`
   - Example: `Class 1`
   - Constraints: Cannot be empty

3. **parent_name** - Parent/Guardian's full name
   - Type: Text
   - Example: `Jane Doe`
   - Constraints: Cannot be empty

4. **phone** - Parent's contact number
   - Type: Numeric (10 digits)
   - Example: `9876543210`
   - Constraints: Must be exactly 10 digits, no spaces or special characters
   - Cannot be empty

5. **address** - Residential address
   - Type: Text
   - Example: `123 Main Street, City, State 123456`
   - Constraints: Cannot be empty

6. **date_of_birth** - Student's date of birth
   - Type: Date (YYYY-MM-DD format)
   - Example: `2018-05-15`
   - Constraints: Must be valid date, cannot be empty

7. **date_of_joining** - Date student joined school
   - Type: Date (YYYY-MM-DD format)
   - Example: `2024-04-01`
   - Constraints: Must be valid date, cannot be empty

8. **aadhar_number** - Aadhar/ID number
   - Type: Numeric (12 digits)
   - Example: `123456789012`
   - Constraints: Should be 12 digits if provided

### Optional Fields (Can be left empty)
9. **initial_fee_amount** - Initial fee amount to be paid
   - Type: Numeric (decimal)
   - Example: `5000`, `2500.50`
   - Constraints: If provided, must be a valid number
   - Leave empty if no initial fee

10. **fees_date** - Date of fee payment
    - Type: Date (YYYY-MM-DD format)
    - Example: `2024-04-01`
    - Constraints: If `initial_fee_amount` is provided, this should be provided too
    - Defaults to current date if not provided

11. **other_details** - Additional information
    - Type: Text
    - Example: `Special dietary needs`, `Sports participant`
    - Constraints: None, can be any text or left empty

---

## Student ID Generation

**Important:** Student IDs are **automatically generated** - you do NOT need to provide them.

### Student ID Format
```
RPS{YEAR}{CLASS}{RANDOM}
```

**Example IDs:**
- `RPS2026C01042` (Class 1, Random: 042)
- `RPS2026C05789` (Class 5, Random: 789)
- `RPS2026NUR213` (Nursery, Random: 213)
- `RPS2026LKG501` (LKG, Random: 501)

**Generation Rules:**
- Each class gets a 3-letter abbreviation:
  - Nursery → NUR
  - LKG → LKG
  - UKG → UKG
  - Class 1 → C01 through Class 5 → C05
- A random 3-digit number (001-999) is appended
- System automatically checks for duplicates and regenerates if needed

---

## CSV Format Specifications

### File Format
- **Type:** Plain text CSV (Comma-Separated Values)
- **Encoding:** UTF-8
- **File Extension:** `.csv`
- **Delimiter:** Comma (`,`)
- **Text Qualifier:** Double quotes (`"`) for fields containing commas or special characters

### Header Row (First Row)
Must include column headers in exact order:

```
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
```

### Example CSV File

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
John Doe,Class 1,Jane Doe,9876543210,"123 Main Street, City, State",2018-05-15,2024-04-01,123456789012,5000,2024-04-01,None
Maria Garcia,Class 2,Robert Garcia,9123456789,"456 Oak Avenue, City, State",2017-08-22,2024-04-01,234567890123,5000,2024-04-01,
Priya Singh,Nursery,Rajesh Singh,9876543211,"789 Pine Road, City, State",2021-02-10,2024-04-01,345678901234,,2024-04-01,Allergic to peanuts
Ahmed Khan,UKG,Fatima Khan,9765432109,"321 Elm Street, City, State",2019-12-05,2024-04-01,456789012345,5000,2024-04-01,
```

---

## Excel to CSV Conversion

If you have data in Excel format, follow these steps:

### Using Microsoft Excel:
1. Open your Excel file
2. Go to **File → Save As**
3. Select file format: **CSV (Comma delimited) (*.csv)**
4. Click **Save**

### Using Google Sheets:
1. Open your Google Sheet
2. Go to **File → Download → Comma-separated values (.csv)**

---

## Validation Rules

The system will validate each row and report errors. Here's what gets validated:

| Field | Validation | Error Message |
|-------|-----------|---|
| name | Not empty | Name is required |
| class | Not empty, must be exact match | Class is required |
| parent_name | Not empty | Parent name is required |
| phone | Not empty, exactly 10 digits | Phone is required / Phone must be 10 digits |
| address | Not empty | Address is required |
| date_of_birth | Valid date format | Invalid date of birth format |
| date_of_joining | Valid date format | Invalid date of joining format |
| initial_fee_amount | Must be numeric if provided | Invalid number |
| student_id | Auto-generated, no duplicates | Automatic validation |

---

## Error Handling

### What Happens If There Are Errors?
- **Valid rows** are still created even if some rows have errors
- **Invalid rows** are skipped and reported
- You get a detailed error report showing:
  - Which row had the error
  - What the specific error was

### Example Error Report:
```
Row 5: Phone must be 10 digits
Row 8: Invalid date of birth format
Row 12: Class is required
```

---

## Sample Bulk Upload Scenarios

### Scenario 1: Bulk Student Creation with Fees
**Goal:** Create 50 students for Class 1 with initial fee of ₹5000 each

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
Student1,Class 1,Parent1,1234567890,"Address1, City",2018-01-15,2024-04-01,111111111111,5000,2024-04-01,
Student2,Class 1,Parent2,1234567891,"Address2, City",2018-02-20,2024-04-01,111111111112,5000,2024-04-01,
...
```

### Scenario 2: Multiple Classes, Mixed Fees
**Goal:** Create students from multiple classes, some with fees, some without

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
Raj Kumar,Class 3,Suresh Kumar,9123456789,"Address, City",2016-05-10,2024-04-01,123456789012,5000,2024-04-01,
Priya Sharma,Class 4,Prakash Sharma,9234567890,"Address, City",2015-06-15,2024-04-01,234567890123,,2024-04-01,
Arjun Patel,Class 5,Amit Patel,9345678901,"Address, City",2014-07-20,2024-04-01,345678901234,5500,2024-04-01,Special needs
```

### Scenario 3: Minimal Data (No Fees)
**Goal:** Just create student records without fees

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
Vikram Singh,Nursery,Rajendra Singh,9876543210,"Address, City",2021-03-12,2024-04-01,123456789012,,
Neha Gupta,LKG,Anirban Gupta,9876543211,"Address, City",2020-04-18,2024-04-01,234567890123,,
```

---

## Tips for Success

✅ **DO:**
- Use exactly the column names shown in the header
- Format dates as YYYY-MM-DD (e.g., 2024-04-01)
- Include 10-digit phone numbers without spaces
- Quote fields that contain commas or special characters
- Test with a small batch first (5-10 students)
- Keep a backup of your original file

❌ **DON'T:**
- Leave required fields empty
- Use different class names (must be exact match)
- Include spaces or special characters in phone numbers
- Use different date formats (MM/DD/YYYY, DD-MM-YYYY, etc.)
- Use semicolons (`;`) as delimiter instead of commas
- Create student IDs manually - let the system generate them

---

## Support

If you encounter issues:
1. Check the error message for the specific row and field
2. Correct that row in your CSV
3. Re-upload the file
4. Some students may have been created - upload only the remaining/corrected ones

---

**Question:** Do you need any clarification on the data format?
