'use client'

import React, { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const [per_page, setPerPage] = useState(searchParams.get('per_page') ?? '5');

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;
    setPerPage(newPerPage);
    router.push(`/?page=${page}&per_page=${newPerPage}`);
  };

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(25 / Number(per_page))}
      </div>

      {/* Select dropdown for changing rows per page */}
      <select
        value={per_page}
        onChange={handlePerPageChange}
        className='p-1 border border-gray-300 rounded'
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='25'>25</option>
      </select>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next page
      </button>
    </div>
  );
};

export default Pagination;
