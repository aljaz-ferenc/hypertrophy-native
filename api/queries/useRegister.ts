import {useMutation} from "react-query";
import Endpoints from "@/api/endpoints";

type RegisterData = {
    username: string,
    password: string,
    passwordConfirm: string
}

const fetchRegister = async (registerData: RegisterData) => {
    const res = await fetch(Endpoints.register, {
        method:'POST',
        body: JSON.stringify(registerData),
        headers: {
            'Content-Type':'application/json'
        }
    })
    return res.json()

}

export const useRegister = () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: fetchRegister
    })
}