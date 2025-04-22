

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

