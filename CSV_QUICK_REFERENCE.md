# CSV Format Quick Reference Card

## 📋 Column Headers (Copy & Paste)

```
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
```

---

## 📊 Data Format by Column

| Column | Type | Required | Format | Example | Notes |
|--------|------|----------|--------|---------|-------|
| **name** | Text | YES | Any text | John Doe | Student's full name |
| **class** | Text | YES | Exact match | Class 1 | Must be: Nursery, LKG, UKG, Class 1-5 |
| **parent_name** | Text | YES | Any text | Jane Doe | Parent/Guardian name |
| **phone** | Numeric | YES | 10 digits | 9876543210 | No spaces, dashes, or special chars |
| **address** | Text | YES | Any text | 123 Main St, City | Complete residential address |
| **date_of_birth** | Date | YES | YYYY-MM-DD | 2018-05-15 | Student's birth date |
| **date_of_joining** | Date | YES | YYYY-MM-DD | 2024-04-01 | Date student joined school |
| **aadhar_number** | Numeric | YES | 12 digits | 123456789012 | Aadhar/ID number |
| **initial_fee_amount** | Decimal | NO | Numeric | 5000 or 5000.50 | Leave empty if no fee |
| **fees_date** | Date | NO | YYYY-MM-DD | 2024-04-01 | Leave empty if no fee |
| **other_details** | Text | NO | Any text | Allergies noted | Leave empty if none |

---

## ✅ Class Names (Exact Match Required)

```
Nursery
LKG
UKG
Class 1
Class 2
Class 3
Class 4
Class 5
```

---

## 🆔 Generated Student ID Examples

| Class | Format | Example |
|-------|--------|---------|
| Nursery | RPS2026NUR### | RPS2026NUR001 |
| LKG | RPS2026LKG### | RPS2026LKG042 |
| UKG | RPS2026UKG### | RPS2026UKG789 |
| Class 1 | RPS2026C01### | RPS2026C01234 |
| Class 2 | RPS2026C02### | RPS2026C02567 |
| Class 3 | RPS2026C03### | RPS2026C03890 |
| Class 4 | RPS2026C04### | RPS2026C04001 |
| Class 5 | RPS2026C05### | RPS2026C05999 |

**#** = Random 3-digit number (001-999)
**You do NOT provide this - it's auto-generated!**

---

## 📝 Simple CSV Example (3 Students)

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
Rajesh Kumar,Class 1,Suresh Kumar,9123456789,"123 Main Road, Mumbai",2018-05-10,2024-04-01,123456789012,5000,2024-04-01,
Priya Sharma,Class 2,Prakash Sharma,9234567890,"456 Oak Street, Delhi",2017-06-15,2024-04-01,234567890123,,2024-04-01,Allergic to dairy
Arjun Singh,Nursery,Rajendra Singh,9345678901,"789 Park Avenue, Pune",2021-07-20,2024-04-01,345678901234,5000,2024-04-01,
```

---

## ⚠️ Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct | Reason |
|---------|-----------|--------|
| 9876 543 210 | 9876543210 | No spaces in phone |
| 98765-43210 | 9876543210 | No dashes in phone |
| 05-15-2018 | 2018-05-15 | Date must be YYYY-MM-DD |
| 2018/05/15 | 2018-05-15 | Use dashes, not slashes |
| class 1 | Class 1 | Exact case match |
| CLASS 1 | Class 1 | Exact match required |
| Nursery School | Nursery | No extra words |
| RPS2026C01001 | Leave blank | Don't provide ID - auto-generated |
| 123 456 789 012 | 123456789012 | No spaces in Aadhar |

---

## 🔢 Phone Number Format

**Required: Exactly 10 digits, no spaces or special characters**

| Input | Result |
|-------|--------|
| 9876543210 | ✅ Accepted |
| 9876 543210 | ❌ Rejected - has space |
| 987-654-3210 | ❌ Rejected - has dashes |
| 98765-43210 | ❌ Rejected - has dash |
| (+91) 9876543210 | ❌ Rejected - has symbols |
| 9876543210 |  ✅ Accepted |

---

## 📅 Date Format

**Required: YYYY-MM-DD (Year-Month-Day)**

| Input | Result |
|-------|--------|
| 2018-05-15 | ✅ Accepted |
| 2018/05/15 | ❌ Rejected |
| 05-15-2018 | ❌ Rejected |
| 15/05/2018 | ❌ Rejected |
| May 15, 2018 | ❌ Rejected |
| 2018-5-15 | ❌ Rejected (need zero-padded) |

---

## 💰 Fee Amount Format

**Optional: Numbers with or without decimals**

| Input | Result | Fee Created |
|-------|--------|------------|
| 5000 | ✅ Accepted | ₹5000.00 |
| 5000.50 | ✅ Accepted | ₹5000.50 |
| 5,000 | ❌ Rejected | No (remove comma) |
| ₹5000 | ❌ Rejected | No (remove symbol) |
| (empty) | ✅ Accepted | No fee record |

---

## 🚀 Quick Upload Steps

1. **Prepare**: Fill CSV with student data
2. **Save**: Save as `.csv` file in Excel or Sheets
3. **Upload**: Click "Bulk Upload" → Select file
4. **Verify**: Check generated Student IDs
5. **Done**: Students and fees are created!

---

## 🎯 Validation - What Gets Checked

### Required Fields Check ✓
- All required columns must have values
- Cannot be empty or whitespace only

### Phone Validation ✓
- Must be exactly 10 digits
- No spaces, dashes, or + signs
- Numbers only

### Date Validation ✓
- Format must be YYYY-MM-DD
- Date must be valid (not Feb 30, etc.)
- Year/Month/Day must be logical

### Class Validation ✓
- Must be exact match from list
- Case-sensitive
- No typos accepted

### Numeric Validation ✓
- Fee amounts must be valid numbers
- Aadhar must be 12 digits
- Phone must be 10 digits

---

## 💾 How to Save CSV

### From Excel:
1. File → Save As
2. Format: **CSV (Comma delimited) (*.csv)**
3. Save button

### From Google Sheets:
1. File → Download
2. Select: **Comma-separated values (.csv)**

### From LibreOffice/OpenOffice:
1. File → Save As
2. Format: **CSV (.csv)**
3. Use comma as delimiter

---

## 📊 Upload Results - What You'll See

```
✅ Upload Successful!

Students Created: 50
Fees Created: 48

Generated Student IDs:
  RPS2026C01042
  RPS2026C01089
  RPS2026C01234
  RPS2026C01567
  ... (all 50 IDs)

Errors: 2
  Row 15: Phone must be 10 digits
  Row 38: Class is required
```

---

## ❓ FAQ - Quick Answers

**Q: Do I provide Student ID?**
A: No! They're auto-generated. Leave that column out.

**Q: What if upload fails?**
A: Fix the errors in the CSV and re-upload. Already-created students won't be duplicated.

**Q: Can I upload same student twice?**
A: Yes, but they'll get different Student IDs. Remove duplicates from CSV first.

**Q: What if phone has country code?**
A: Remove it. Use only 10 digits (e.g., 9876543210, not +919876543210).

**Q: Can I edit Student ID later?**
A: No, they're locked. Create new student if needed. But no need to edit—IDs are permanent and correct.

**Q: How many can I upload at once?**
A: No limit. Tested with 100+. Usually 1-2 seconds per 10 students.

---

## 🔐 What Happens Behind-the-Scenes

1. **Parse**: System reads your CSV file
2. **Validate**: Checks each row's data
3. **Generate**: Creates unique Student IDs automatically
4. **Create**: Inserts students into database
5. **Create Fees**: Adds fee records if amounts provided
6. **Report**: Shows you results and any errors
7. **Fresh**: You automatically see new students in the list

---

## 📋 Template (Copy & Use)

```csv
name,class,parent_name,phone,address,date_of_birth,date_of_joining,aadhar_number,initial_fee_amount,fees_date,other_details
Student Name,Class 1,Parent Name,9876543210,"123 Address, City",2018-05-15,2024-04-01,123456789012,5000,2024-04-01,Notes here
```

Just duplicate the second row and fill in your data!

---

## ✨ You're Ready!

Everything you need:
- ✅ Format specification
- ✅ Examples
- ✅ Valid values
- ✅ Common errors
- ✅ Quick reference

**Upload confidently - Student IDs will be perfect!** 🎉
