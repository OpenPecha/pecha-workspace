import { useLoaderData } from "react-router";
import { db } from "~/lib/prisma";

export const loader = async () => {
    const tools = await db.tools.findMany();
    return { tools };

 }

