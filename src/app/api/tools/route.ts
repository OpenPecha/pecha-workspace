import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET() {
  try {
    const tools = await db.tools.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        link: true,
        demo: true,
        icon: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const transformedTools = tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      price: tool.price,
      link: tool.link,
      demo: tool.demo,
      icon: tool.icon,
    }));

    const response = {
      success: true,
      data: transformedTools,
      count: transformedTools.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

