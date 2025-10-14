// Types based on Prisma schema models

export interface Tool {
  id: string;
  name: string | null;
  description: string | null;
  category: string | null;
  price: number | null;
  link: string | null;
  demo: string | null;
  icon: string | null;
}

export interface OldTool {
  id: number;
  name: string;
  description: string | null;
  url: string | null;
  demo: string | null;
  icon: string | null;
  department: string[];
  active: boolean | null;
}

// Transformed types for UI components
export interface TransformedTool {
  id?: string;
  title: string;
  name?: string;
  description?: string;
  category: string;
  icon?: string;
  path?: string;
  link?: string;
  price?: number;
  status: string;
  demo?: string;
}

export interface TransformedOldTool {
  id: number;
  title: string;
  name: string;
  description?: string;
  path?: string;
  icon?: string;
  demo?: string;
  department: string[];
  active?: boolean;
}

