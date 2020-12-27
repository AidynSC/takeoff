import React, { useCallback } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'


export const DeleteModal = props => {
    const {request} = useHttp()
    const message = useMessage()

    const deleteContact = useCallback(async () => {
        try {
            await request('contacts/' + props.contactId, 'DELETE')
            message('Контакт удален')
            props.refreshContactList()
        } catch (e) {
            message(e);
        }
    }, [request, props, message]) 

    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Удаление контакта - <b>{props.contactName}</b></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Вы уверены?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                        <button type="button" className="btn btn-primary" onClick={deleteContact} data-bs-dismiss="modal">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}