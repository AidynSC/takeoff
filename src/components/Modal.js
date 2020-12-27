import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const Modal = props => {
    const {request} = useHttp()
    const message = useMessage()
    const [info, setInfo] = useState({
        name: '', contactInfo: ''
    })
    const [form, setForm] = useState({
        name: '', contactInfo: ''
    })

    useEffect(() => {
        setInfo({
            name: props.info.name,
            contactInfo: props.info.contactInfo
        })
    }, [props])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const updateContact = useCallback(async () => {
        try {
            const isFormEmpty = Object.values(form).reduce((a, b) => a + b) === ''
            if (isFormEmpty) return message('Введите новые значения контакта')

            const body = Object.assign({}, info)
            for (let key in body) {
                if (body[key] !== form[key] && form[key] !== '') body[key] = form[key]
            }

            await request('contacts/' + props.info.id, 'PATCH', body)
            message('Контакт изменен')
            setForm({ name: '', contactInfo: '' })
            props.refreshContactList()
        } catch (e) {
            message(e);
        }
    }, [request, props, info, form, message])

    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">Измените информацию о контакте</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label className="col-form-label">Имя:</label>
                        <input type="text" className="form-control" name="name" value={form.name} placeholder={info.name} onChange={changeHandler}/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Контактные данные:</label>
                        <input type="text" className="form-control" name="contactInfo" value={form.contactInfo} placeholder={info.contactInfo} onChange={changeHandler}/>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                    <button type="button" className="btn btn-primary" onClick={updateContact} data-bs-dismiss="modal">Изменить</button>
                </div>
                </div>
            </div>
        </div>
    )
}