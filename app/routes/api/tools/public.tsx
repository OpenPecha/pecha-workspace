import { db } from "~/lib/prisma";

export const loader = async () => {
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
    return response

 }

