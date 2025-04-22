import { getHeaders } from "./tools";

export interface User {
    id: string;
    email: string;
    name?: string;
    picture?: string;
    role?: string;
    isAdmin: boolean;
}

export const create_user = async (token: string) => {    
    const url=import.meta.env.VITE_BACKEND_URL!;
    const data=await fetch(`${url}/api/user/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data.json();
}

export interface PaginatedUsers {
    items: User[];
    total: number;
    page: number;
    page_size: number;
    pages: number;
}

export const getUsers = async ({
    search = '',
    page = 1,
    pageSize = 10
}: {
    search?: string;
    page?: number;
    pageSize?: number;
}) => {
    const url = import.meta.env.VITE_BACKEND_URL!;
    const queryParams = new URLSearchParams();
    
    if (search) queryParams.append('search', search);
    if (page) queryParams.append('page', page.toString());
    if (pageSize) queryParams.append('page_size', pageSize.toString());
    
    const response = await fetch(`${url}/api/user?${queryParams.toString()}`, {
        headers: getHeaders()
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? 'Failed to fetch users');
    }
    
    return response.json() as Promise<PaginatedUsers>;
}

export const updateUserAdmin = async (userId: string, isAdmin: boolean) => {
    const url=import.meta.env.VITE_BACKEND_URL!;
    const response = await fetch(`${url}/api/user/${userId}/admin`, {
        method: 'PATCH',
        headers: {
            ...getHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAdmin })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? 'Failed to update user admin status');
    }
    
    return response.json();
}
