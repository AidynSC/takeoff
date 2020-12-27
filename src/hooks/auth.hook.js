import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)

    const login = useCallback((id, name) => {
        setUserId(id)
        setUserName(name)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, userName: name
        }))
    }, [])

    const logout = useCallback(() => {
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.userId && data.userName) {
            login(data.userId, data.userName)
        }
    }, [login])

    return { login, logout, userId, userName }
}