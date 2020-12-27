import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Modal } from '../components/Modal'
import { DeleteModal } from '../components/DeleteModal'
import { CreateContact } from '../components/CreateContact'
import { Search } from '../components/Search'
import { ContactList } from '../components/ContactList'
import { Pagination } from '../components/Pagination'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const Contacts = () => {
    const {userId} = useContext(AuthContext)
    const {request} = useHttp()
    const message = useMessage()
    const [contacts, setContacts] = useState([])
    const [info, setInfo] = useState({
        id: '', name: '', contactInfo: ''
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [contactsPerPage] = useState(10)

    const getContacts = useCallback(async (searchValue) => {
        let url = 'contacts?userId=' + userId
        if (searchValue) url += `&q=${searchValue}`

        try {
            const res = await request(url)
            setContacts(res)
        } catch (e) {
            message(e);
        }
    }, [userId, request, message])

    useEffect(() => {
        getContacts()
    }, [getContacts])

    const editInfo = (stateId, stateName, stateContactInfo) => {
        setInfo({ id: stateId, name: stateName, contactInfo: stateContactInfo })
    }

    const indexOfLastContact = currentPage * contactsPerPage
    const indexOfFirstContact = indexOfLastContact - contactsPerPage
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <div className="forms">
                <CreateContact refreshContactList={getContacts} />
                <Search getContacts={getContacts} />
            </div>
            <ContactList 
                contacts={currentContacts} 
                editInfo={editInfo} 
            />
            <Pagination totalContacts={contacts.length} contactsPerPage={contactsPerPage} paginate={paginate}/>
            <Modal 
                info={info} 
                refreshContactList={getContacts}
            />
            <DeleteModal 
                contactId={info.id} 
                contactName={info.name}
                refreshContactList={getContacts}
            />
        </div>
    )
}