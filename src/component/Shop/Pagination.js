import React from 'react';

function Pagination(props) {
    const item = [];
    for (let i = 0; i < props.amountPage; i++) {
        item.push(
            <li className="page-item" key={i + 1}>
                <button className="page-link" onClick={() => props.onPageChange(i + 1)}>
                    {i + 1}
                </button>
            </li>
        );
    }
    return (
        <nav aria-label="Page navigation example" style={{ marginTop: '50px' }}>
            <ul className="pagination justify-content-center" style={{ marginLeft: '70%' }}>
                <li className="page-item">
                    <button className="page-link" onClick={() => props.onPreviousPage()}>
                        &laquo;
                    </button>
                </li>
                {item}
                <li className="page-item">
                    <button className="page-link" onClick={() => props.onNextPage()}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
