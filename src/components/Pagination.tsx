import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="pagination flex items-center space-x-2 mt-4">
            <button
                className={` ${currentPage ===1 ? 'bg-sky-300 cursor-default' :'bg-sky-600 cursor-pointer'} text-white p-1 rounded-full`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>

            </button>

            <div className='text-[14px] flex space-x-1              '>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={currentPage === index + 1 ? 'bg-sky-600 py-[1px] px-[7px] text-white rounded-full' : ''}
                >
                    {index + 1}
                </button>
            ))}
            </div>

            <button
                className={` ${currentPage === totalPages ? 'bg-sky-300 cursor-default' :'bg-sky-600 cursor-pointer'} text-white p-1 rounded-full`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>

            </button>
        </div>
    );
};

export default Pagination;
