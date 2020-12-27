import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request} = useHttp()
    const [form, setForm] = useState({
        name: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        if (!form.name || !form.password) return message('Заполните поля')

        try {
            const isExist = await request('users?name=' + form.name)
            if (isExist.length) return message('Пользователь уже существует')

            const data = await request('users', 'POST', {...form})
            message('Пользователь успешно зарегистрирован!')
            auth.login(data.id, data.name)
        } catch (e) {
            message(e);
        }
    }

    const loginHandler = async () => {
        if (!form.name || !form.password) return message('Заполните поля')

        try {
            const data = await request('users?name=' + form.name)
            if (!data.length) return message('Такой пользователь не зарегистрирован')
            if (data[0].password !== form.password) return message('Пароль введен неправильно')
            
            auth.login(data[0].id, data[0].name)
        } catch (e) {
            message(e);
        }
    }

    return (
        <div className="container">
            <div className="input-group mb-3">
                <input type="text" name="name" value={form.name} onChange={changeHandler} className="form-control" placeholder="Username" />
            </div>

            <div className="input-group mb-3">
                <input type="password" name="password" value={form.password} onChange={changeHandler} className="form-control" placeholder="Password" />
            </div>
            <button className="btn btn-outline-success" type="submit" onClick={loginHandler}>Log in</button>
            <button className="btn btn-outline-success" type="submit" onClick={registerHandler}>Register</button>
        </div>
    )
}