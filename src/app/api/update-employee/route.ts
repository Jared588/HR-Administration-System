import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedEmployee = await Prisma.employee.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
  }
}
