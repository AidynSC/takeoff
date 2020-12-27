import React, { useEffect, useState } from 'react'

export const ContactList = props => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        setContacts(props.contacts)
    }, [props])

    return (
        <div>
            {!contacts.length ? 
                <div className="alert alert-success" role="alert">
                    Контактов пока нет
                </div>
            : <table className="table table-success table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Контактная информация</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, i) => {
                        return (
                            <tr 
                                key={contact.id} 
                                onClick={() => props.editInfo(contact.id, contact.name, contact.contactInfo)} 
                                data-bs-toggle="modal" 
                                data-bs-target="#editModal"
                            >
                                <th scope="row">{i + 1}</th>
                                <td>{contact.name}</td>
                                <td>{contact.contactInfo}</td>
                                <td>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">Удалить</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>}
        </div>
    )
}