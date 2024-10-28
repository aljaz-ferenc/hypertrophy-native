import {useMutation, useQuery} from "react-query";
import Endpoints from "@/api/endpoints";

type LoginData = {
    username: string,
    password: string
}

const fetchLogin = async (loginData: LoginData) => {
    const res = await fetch(Endpoints.login, {
        method:'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return  await res.json()
}

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: fetchLogin
    })
}
