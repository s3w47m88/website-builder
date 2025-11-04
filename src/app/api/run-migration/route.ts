import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Only allow on localhost
    const host = request.headers.get('host') || '';
    if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
      return NextResponse.json(
        { success: false, error: 'This endpoint is only available on localhost' },
        { status: 403 }
      );
    }

    const { migrationFile } = await request.json();

    if (!migrationFile) {
      return NextResponse.json(
        { success: false, error: 'Migration file name is required' },
        { status: 400 }
      );
    }

    const supabaseSecret = process.env.SUPABASE_SECRET_KEY!;
    const projectId = process.env.SUPABASE_PROJECT_ID!;

    if (!supabaseSecret || !projectId) {
      return NextResponse.json(
        { success: false, error: 'Missing Supabase credentials' },
        { status: 500 }
      );
    }

    // Connection string using pooler (URL-encode the password)
    const encodedPassword = encodeURIComponent(supabaseSecret);
    const connectionString = `postgresql://postgres.${projectId}:${encodedPassword}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

    const client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    // Read migration file
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', migrationFile);
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Execute migration
    await client.query(sql);
    await client.end();

    return NextResponse.json({
      success: true,
      message: 'Migration executed successfully'
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
