import {useQuery} from 'react-query';
import {User} from "@/types";

const BASE_URL = 'http://localhost:3000/api'

const fetchUser = async (userId: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const user = await res.json();
    return user;
};

export default (userId: string) => {
    return useQuery({
        queryKey: ['user', {userId}],
        queryFn: () => fetchUser(userId),
    });
};
