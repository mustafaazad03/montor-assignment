import reportData from '../data/reports.json';
import Table from "@/components/ReportList/Table";
import Pagination from '@/components/utils/Pagination';
import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const reports = reportData.reports;
  const page = parseInt(Array.isArray(searchParams['page']) ? '1' : searchParams['page'] || '1', 10); // Parse page as integer, default to 1
  const per_page = parseInt(Array.isArray(searchParams['per_page']) ? '5' : searchParams['per_page'] || '5', 10); // Parse per_page as integer, default to 5

  // Calculate start and end indices based on pagination
  const start = (page - 1) * per_page;
  const end = Math.min(start + per_page, reports.length);

  const perPageReports = reports.slice(start, end);
  return (
    <div className="bg-background-primary h-screen w-screen flex justify-center items-center">
      <div className='h-3/4 w-2/4 bg-white rounded-xl'>
      <div className="flex justify-between px-4 items-center p-4">
        <div className=""></div>
        <h1 className='font-semibold text-text-primary'>Recently Generated Reports</h1>
        <div className="space-x-2 flex items-center">
          <button>
          <Image src="/report/filter-square.svg" width={100} height={100} alt="filter" className='w-7 h-7' />
          </button>
          <button>
            <Image src="/report/close-square.svg" width={100} height={100} alt="close" className='w-7 h-7' />
          </button>
        </div>
      </div>
      <Table entities={perPageReports} />
      <Pagination hasNextPage={reports?.length > end} hasPrevPage={start > 0} />
    </div>
    </div>
  );
}
