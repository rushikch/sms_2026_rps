import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface StudentRow {
  name: string
  class: string
  parent_name: string
  phone: string
  address: string
  date_of_birth: string
  date_of_joining: string
  aadhar_number: string
  initial_fee_amount?: string | number
  fees_date?: string
  other_details?: string
}

interface BulkUploadResponse {
  success: boolean
  message: string
  data?: {
    created_students: number
    created_fees: number
    student_ids: string[]
    errors: Array<{ row: number; error: string }>
  }
  error?: string
}

const generateStudentId = (
  studentClass: string,
  existingIds: Set<string>,
  attemptCounter: number = 0
): string => {
  const year = '2026'
  const classAbbreviations: { [key: string]: string } = {
    'Nursery': 'NUR',
    'LKG': 'LKG',
    'UKG': 'UKG',
    'Class 1': 'C01',
    'Class 2': 'C02',
    'Class 3': 'C03',
    'Class 4': 'C04',
    'Class 5': 'C05'
  }

  const classAbbrev = classAbbreviations[studentClass] || 'UNK'

  let studentId = ''
  let counter = attemptCounter

  do {
    const randomNum = Math.floor(Math.random() * 999) + 1
    const paddedNum = randomNum.toString().padStart(3, '0')
    studentId = `RPS${year}${classAbbrev}${paddedNum}`
    counter++

    if (!existingIds.has(studentId)) {
      break
    }

    if (counter > 50) {
      const timestamp = Date.now().toString().slice(-3)
      studentId = `RPS${year}${classAbbrev}${paddedNum}${timestamp}`
      break
    }
  } while (true)

  return studentId
}

const parseCSV = (csvContent: string): StudentRow[] => {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0]
    .split(',')
    .map((h) => h.trim().toLowerCase().replace(/['"]/g, ''))
  
  const rows: StudentRow[] = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    // Handle CSV parsing with quoted values
    const values: string[] = []
    let currentValue = ''
    let insideQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"|"$/g, ''))
        currentValue = ''
      } else {
        currentValue += char
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ''))

    const row: StudentRow = {
      name: values[headers.indexOf('name')] || '',
      class: values[headers.indexOf('class')] || '',
      parent_name: values[headers.indexOf('parent_name')] || '',
      phone: values[headers.indexOf('phone')] || '',
      address: values[headers.indexOf('address')] || '',
      date_of_birth: values[headers.indexOf('date_of_birth')] || '',
      date_of_joining: values[headers.indexOf('date_of_joining')] || '',
      aadhar_number: values[headers.indexOf('aadhar_number')] || '',
      initial_fee_amount: values[headers.indexOf('initial_fee_amount')] || '',
      fees_date: values[headers.indexOf('fees_date')] || '',
      other_details: values[headers.indexOf('other_details')] || ''
    }

    rows.push(row)
  }

  return rows
}

const validateRow = (row: StudentRow, rowIndex: number): string[] => {
  const errors: string[] = []

  if (!row.name || row.name.trim() === '')
    errors.push('Name is required')
  if (!row.class || row.class.trim() === '')
    errors.push('Class is required')
  if (!row.parent_name || row.parent_name.trim() === '')
    errors.push('Parent name is required')
  if (!row.phone || row.phone.trim() === '')
    errors.push('Phone is required')
  if (!row.date_of_joining || row.date_of_joining.trim() === '')
    errors.push('Date of joining is required')
  if (!row.date_of_birth || row.date_of_birth.trim() === '')
    errors.push('Date of birth is required')

  // Validate phone format (10 digits)
  if (row.phone && !/^\d{10}$/.test(row.phone.replace(/\D/g, ''))) {
    errors.push('Phone must be 10 digits')
  }

  // Validate dates
  if (row.date_of_birth && isNaN(Date.parse(row.date_of_birth))) {
    errors.push('Invalid date of birth format')
  }
  if (row.date_of_joining && isNaN(Date.parse(row.date_of_joining))) {
    errors.push('Invalid date of joining format')
  }

  return errors
}

export async function POST(request: NextRequest): Promise<NextResponse<BulkUploadResponse>> {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided', error: 'No file provided' },
        { status: 400 }
      )
    }

    const content = await file.text()
    const rows = parseCSV(content)

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No data rows found in the file', error: 'No data rows found in the file' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Fetch existing student IDs
    const { data: existingStudents, error: fetchError } = await supabase
      .from('students')
      .select('student_id')

    if (fetchError) {
      return NextResponse.json(
        { success: false, message: 'Failed to fetch existing students', error: 'Failed to fetch existing students' },
        { status: 500 }
      )
    }

    const existingIds = new Set((existingStudents || []).map((s) => s.student_id))
    const errors: Array<{ row: number; error: string }> = []
    const studentsToCreate: any[] = []
    const feesToCreate: any[] = []
    const studentIdMap: Map<number, string> = new Map()

    // Validate all rows first
    for (let i = 0; i < rows.length; i++) {
      const validationErrors = validateRow(rows[i], i + 2)
      if (validationErrors.length > 0) {
        errors.push({
          row: i + 2,
          error: validationErrors.join('; ')
        })
        continue
      }

      const studentId = generateStudentId(rows[i].class, existingIds, i)
      existingIds.add(studentId)
      studentIdMap.set(i, studentId)

      const studentData = {
        student_id: studentId,
        name: rows[i].name,
        class: rows[i].class,
        parent_name: rows[i].parent_name,
        phone: rows[i].phone,
        address: rows[i].address,
        date_of_birth: rows[i].date_of_birth,
        date_of_joining: rows[i].date_of_joining,
        aadhar_number: rows[i].aadhar_number || null,
        other_details: rows[i].other_details || null,
        active: true
      }

      studentsToCreate.push(studentData)

      // Prepare fees if amount is provided
      if (
        rows[i].initial_fee_amount &&
        rows[i].initial_fee_amount !== '' &&
        !isNaN(Number(rows[i].initial_fee_amount))
      ) {
        feesToCreate.push({
          rowIndex: i,
          studentId: studentId,
          amount: Number(rows[i].initial_fee_amount),
          date: rows[i].fees_date || new Date().toISOString().split('T')[0],
          transaction_id: crypto.randomUUID()
        })
      }
    }

    // Create students
    const { data: createdStudents, error: createError } = await supabase
      .from('students')
      .insert(studentsToCreate)
      .select('id, student_id')

    if (createError) {
      return NextResponse.json(
        { success: false, message: `Failed to create students: ${createError.message}`, error: `Failed to create students: ${createError.message}` },
        { status: 500 }
      )
    }

    // Create fees
    let feesCreated = 0
    if (feesToCreate.length > 0 && createdStudents) {
      // Map student_ids to database IDs
      const studentIdToDbId = new Map(
        createdStudents.map((s) => [s.student_id, s.id])
      )

      const feesDataWithDbIds = feesToCreate.map((fee) => ({
        student_id: studentIdToDbId.get(fee.studentId),
        amount: fee.amount,
        date: fee.date,
        transaction_id: fee.transaction_id
      }))

      const { error: feesError, count } = await supabase
        .from('fees')
        .insert(feesDataWithDbIds)

      if (!feesError) {
        feesCreated = count || 0
      } else {
        errors.push({
          row: 0,
          error: `Some fees failed to create: ${feesError.message}`
        })
      }
    }

    const studentIds = createdStudents?.map((s) => s.student_id) || []

    if (errors.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: `Successfully created ${studentIds.length} students and ${feesCreated} fee records`,
          data: {
            created_students: studentIds.length,
            created_fees: feesCreated,
            student_ids: studentIds,
            errors: []
          }
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          success: true,
          message: `Created ${studentIds.length} students with ${errors.length} errors`,
          data: {
            created_students: studentIds.length,
            created_fees: feesCreated,
            student_ids: studentIds,
            errors: errors
          }
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Bulk upload error:', error)
    return NextResponse.json(
      {
        success: false,
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    )
  }
}
