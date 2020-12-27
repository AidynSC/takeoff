import React, {useState, useCallback} from 'react'

export const Search = props => {
    const [searchText, setSearchText] = useState('')

    const searchTextHandler = event => {
        setSearchText(event.target.value)
    }

    const getFilteredContacts = useCallback(() => {
        props.getContacts(searchText)
    }, [props, searchText])

    const clearFilter = useCallback(() => {
        setSearchText('')
        props.getContacts()
    }, [props])

    return (
        <div className="searchForm">
            <div className="formTitle">
                Поиск
            </div>
            <input className="form-control me-2" type="search" name="search" value={searchText} onChange={searchTextHandler} placeholder="Имя или информация" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit" onClick={getFilteredContacts}>Искать</button>
            <button className="btn btn-outline-success" type="submit" onClick={clearFilter}>Очистить фильтр</button>
        </div>
    )
}