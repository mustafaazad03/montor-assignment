'use client'

import React, { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  lastPage: number;
}

const Pagination: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  lastPage,
}) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const per_page = Number(searchParams.get('per_page') || '10');
  const totalPages = lastPage || 5;
  const [buttonIndex, setButtonIndex] = useState(page - (page % per_page));
  const getButtonClass = (i: number) => `w-8 h-8 rounded-lg text-sm ${i === page ? 'bg-orange-primary cursor-not-allowed text-white' : 'bg-white border border-text-secondary/20 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 disabled:hover:bg-gray-300 disabled:hover:text-gray-500 disabled:hover:cursor-not-allowed disabled:hover:opacity-50 disabled:hover:rounded'}`;

  const handlePageChange = (newPage: number) => {
    router.replace(`/?page=${newPage}&per_page=${per_page}`);
  };

  const handlePerPageChange = (change: number) => {
    setShowDropdown(!showDropdown);
    if (change === per_page) return;
    router.replace(`/?page=${page}&per_page=${change}`);
    };
    
    const handleNextSet = () => {
      const nextPage = Math.min(buttonIndex + 5, totalPages);
      setButtonIndex(nextPage);
      if (nextPage <= totalPages) {
        handlePageChange(nextPage);
      }
    };
  
    const handlePrevSet = () => {
      const prevPage = Math.max(buttonIndex - 5, 1);
      setButtonIndex(prevPage);
      handlePageChange(prevPage);
    };

    const renderPageButtons = () => {
      const buttons = [];
      const startPage = page%per_page === 0 ? page - 4 : page - (page%per_page) + 1;
      const endPage = startPage + 4;
      
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={getButtonClass(i)}
            onClick={() => handlePageChange(i)}
            disabled={i === page || i > totalPages}
          >
            {i}
          </button>
        );
      }

      return buttons;
  };

  return (
    <div className='flex gap-6 items-center h-[10%] my-1 justify-center'>
      <div className="flex gap-2 items-center">
      <button
        className='flex space-x-1 items-center text-text-secondary p-1'
        disabled={!hasPrevPage || page === 1 || buttonIndex === 0}
        onClick={handlePrevSet}
        aria-label="Go to previous page"
      >
        <Image src="/report/prev.svg" width={100} height={100} alt="prev" className='w-9 h-9' />
        <span className='text-sm font-medium'>Prev</span>
      </button>

      <div className='flex gap-2 items-center'>{renderPageButtons()}</div>

      <button
        className='flex space-x-1 items-center text-text-secondary p-1'
        disabled={!hasNextPage || buttonIndex + 5 >= totalPages}
        onClick={handleNextSet}
        aria-label="Go to next page"
      >
        <span className='text-sm font-medium'>Next</span>
        <Image src="/report/next.svg" width={100} height={100} alt="next" className='w-9 h-9' />
      </button>
      </div>
      <div className="flex justify-between items-center">
        <span className='text-sm text-text-secondary'>Rows per page</span>
        <div className="flex-none p-2">
        <button onClick={() => setShowDropdown(!showDropdown)} className="flex justify-between w-fit gap-2 items-center  p-2 border border-text-secondary/20 rounded-lg text-sm text-text-primary">
          {per_page}
          <Image src={`/report/${showDropdown ? 'up-arrow.svg' : 'down-arrow.svg'}`} width={100} height={100} alt={`${showDropdown ? 'up' : 'down'}-arrow`} className='w-2 h-2' />
        </button>
        <div className={`${showDropdown ? 'block' : 'hidden'} w-fit mt-1 bg-white rounded-lg shadow-xl absolute`}>
        {[10, 15, 20].map(perPageOption => (
          <button key={perPageOption} className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100 cursor-pointer" onClick={() => handlePerPageChange(perPageOption)}>
            {perPageOption}
          </button>
        ))}
        </div>
    </div>
      </div>
    </div>
  );
};

export default Pagination;
