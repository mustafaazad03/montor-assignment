import reportData from '../data/reports.json';
import Table from "@/components/ReportList/Table";
import Image from "next/image";

export default function Home() {
  const reports = reportData.reports;
  
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
      <Table entities={reports} />
    </div>
    </div>
  );
}
