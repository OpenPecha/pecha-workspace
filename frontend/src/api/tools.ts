export const getHeaders=(token?:string| undefined)=>{
    const access_token=localStorage.getItem("access_token")??token;
    return {
        'Authorization': `Bearer ${access_token}`
    }
}

export interface Tool {
    id?: string;
    name: string;
    description?: string;
    category?: string;
    price?: number;
    image?: string;
    link?: string;
    demo?: string;
    icon?: string;
}

export const getTools = async () => {    
    const url=import.meta.env.VITE_BACKEND_URL!;
    const data=await fetch(`${url}/api/tools`, {
        headers:  getHeaders()
    })
    return data.json();
}

export const addTool = async (tool: Tool) => {
    const url=import.meta.env.VITE_BACKEND_URL!;
    const response = await fetch(`${url}/api/tools`, {
        method: 'POST',
        headers: {
            ...getHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tool)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? 'Failed to add tool');
    }
    
    return response.json();
}

export const updateTool = async (id: string, tool: Partial<Tool>) => {
    const url=import.meta.env.VITE_BACKEND_URL!;
    const response = await fetch(`${url}/api/tools/${id}`, {
        method: 'PATCH',
        headers: {
            ...getHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tool)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? 'Failed to update tool');
    }
    
    return response.json();
}

export const deleteTool = async (id: string) => {
    const url=import.meta.env.VITE_BACKEND_URL!;
    const response = await fetch(`${url}/api/tools/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? 'Failed to delete tool');
    }
    
    return response.json();
}
