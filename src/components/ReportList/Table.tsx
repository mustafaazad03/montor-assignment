import React from "react";
import Image from "next/image";

// interface for the table
interface TableEntities {
	entities: {
		date: string;
		name: string;
		fileUrl: string;
	}[];
}

const Table = ({ entities }: TableEntities) => {
	return (
		// creating the table having colums like date, report name & download
		<div className="h-4/5 overflow-y-auto overflow-x-hidden scrollbar border-b border-text-secondary/20">
			<table className="w-full">
				<thead className="p-1">
					<tr className="bg-gray-primary font-medium text-sm text-text-secondary">
						<th className="pr-12 pl-6 py-1 text-left font-medium">Date</th>
						<th className="px-6 pr-10 py-1 text-left font-medium">
							Report Name
						</th>
						<th className="px-6 py-1 text-center font-medium">Download</th>
					</tr>
				</thead>
				<tbody>
					{/* data comes from the report json */}
					{entities?.map((report, index) => (
						<tr key={index} className="text-text-primary">
							<td className="pl-6 p-3">
								<div className="">
									{new Date(report.date)
										.toLocaleDateString()
										.split("/")
										.join(".")}
								</div>
								<div className="text-sm font-normal text-text-secondary">
									{new Date(report.date)
										.toLocaleTimeString()
										.split(":")
										.slice(0, 2)
										.join(":") +
										" " +
										new Date(report.date).toLocaleTimeString().split(" ")[1]}
								</div>
							</td>
							<td className="p-3 pl-6">
								{report.name.length > 55
									? report.name.slice(0, 30) + "..." + report.name.slice(-15)
									: report.name}
							</td>
							<td className="p-3">
								<a
									href={report?.fileUrl}
									download={report?.fileUrl}
									target="_blank"
									rel="noreferrer"
								>
									<Image
										src="/report/document-download.svg"
										width={100}
										height={100}
										alt="download"
										className="w-8 h-8 mx-auto"
									/>
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
