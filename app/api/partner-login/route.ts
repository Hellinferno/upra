import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        // Fetch user with service provider data
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                serviceProvider: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Check Role
        if (user.role !== 'PARTNER' && user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized: Not a partner account' }, { status: 403 });
        }

        // Successful login
        return NextResponse.json({
            message: 'Partner Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.serviceProvider?.fullName,
                role: user.role,
                status: user.serviceProvider?.verificationStatus
            }
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Partner Login Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
