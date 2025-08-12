export interface Tool {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  icon?: string;
  link?: string;
  demo?: string;
}

export const getTools = async (): Promise<Tool[]> => {
  try {
    const response = await fetch("/api/tools");
    if (!response.ok) {
      throw new Error("Failed to fetch tools");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
};
