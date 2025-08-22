import { redirect } from "react-router";

export const loader = async () => {
    return redirect("/auth/logout");
}


export default function Logout() {
    return null;
}