import React, { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const CreateContact = props => {
    const {userId} = useContext(AuthContext)
    const {request} = useHttp()
    const message = useMessage()

    const [newContact, setNewContact] = useState({
        name: '', contactInfo: ''
    })

    const changeHandler = event => {
        setNewContact({ ...newContact, [event.target.name]: event.target.value })
    }

    const createContact = useCallback(async () => {
        const { name, contactInfo } = newContact

        if (!name) return message('Введите имя контакта')
        if (!contactInfo) return message('Введите информацию о контакте')

        try {
            const body = {
                name, contactInfo, userId
            }
            await request('contacts', 'POST', body)
            message('Контакт создан')
            setNewContact({ name: '', contactInfo: '' })
            props.refreshContactList()
        } catch (e) {
            message(e)
        }
    }, [userId, newContact, request, message, props])

    return (
        <div className="createForm">
            <div className="formTitle">
                Новый контакт
            </div>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Имя" 
                    name="name" 
                    value={newContact.name} 
                    aria-label="Example text with button addon" 
                    aria-describedby="button-addon1" 
                    onChange={changeHandler}
                />
            </div>

            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Контактная информация" 
                    name="contactInfo" 
                    value={newContact.contactInfo} 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2" 
                    onChange={changeHandler}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={createContact}>Создать</button>
            </div>
        </div>
    )
}