import React from 'react'

export const Pagination = props => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalContacts / props.contactsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="nav-pagination">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => props.paginate(number)} href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}