
export const getHeaders=(token?:string| undefined)=>{
    const access_token=localStorage.getItem("access_token")??token;
    return {
        'Authorization': `Bearer ${access_token}`
    }
}



export const getTools = async () => {    
    const url=import.meta.env.VITE_BACKEND_URL!;
    const data=await fetch(`${url}/api/tools`, {
        headers:  getHeaders()
    })
    return data.json();
}

