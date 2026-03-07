import { useState, useEffect } from 'react';

function useUserState(initialUser = null) {
    const [user, setUser] = useState(initialUser);
    
    useEffect(() => {
        // Logic to fetch user data and set user state
        const fetchUserData = async () => {
            // Placeholder for fetching user data
            const response = await fetch('/api/user');
            const userData = await response.json();
            setUser(userData);
        };
        fetchUserData();
    }, []);

    return [user, setUser];
}

export default useUserState;