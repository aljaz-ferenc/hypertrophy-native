import {useMutation, useQuery} from 'react-query'
import {NewUserData} from "@/screens/WelcomeScreen";

const fetchUser = async (user: NewUserData) => {
    const res = await fetch('http://localhost:3000/api/createUser', {
        method: 'POST',
        body: JSON.stringify(user)
    })
    return await res.json()
}

export default () => {
    return useMutation({
        mutationKey: ['user'],
        mutationFn: (userData: NewUserData) => fetchUser(userData)
    })
}
