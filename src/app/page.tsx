import IconButton from "@/components/ReportList/IconButton";
import reportData from "../data/reports.json";
import Table from "@/components/ReportList/Table";
import Pagination from "@/components/utils/Pagination";

export default function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const reports = reportData.reports;
	const page = parseInt(
		Array.isArray(searchParams["page"]) ? "1" : searchParams["page"] || "1",
		10
	);
	const per_page = parseInt(
		Array.isArray(searchParams["per_page"])
			? "5"
			: searchParams["per_page"] || "10",
		10
	);

	// Calculate start, end and total indices based on pagination
	const start = (page - 1) * per_page;
	const end = Math.min(start + per_page, reports.length);
	const totalPages = Math.ceil(reports.length / per_page);

	const perPageReports = reports.slice(start, end);
	return (
		<div className="bg-background-primary h-screen w-screen flex justify-center items-center">
			<div className="h-3/4 sm:w-full lg:w-3/5 xl:w-2/4 bg-white rounded-xl">
				<div className="flex justify-between px-4 items-center p-4">
					<div className=""></div>
					<h1 className="font-semibold text-text-primary">
						Recently Generated Reports
					</h1>
					<div className="space-x-2 flex items-center">
						<IconButton icon="/report/filter-square.svg" alt="filter" />
						<IconButton icon="/report/close-square.svg" alt="close" />
					</div>
				</div>
				<Table entities={perPageReports} />
				<Pagination
					hasNextPage={reports.length > end}
					hasPrevPage={start > 0}
					lastPage={totalPages}
				/>
			</div>
		</div>
	);
}
