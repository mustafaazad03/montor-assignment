import ReportList from "@/components/ReportList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-primary h-screen w-screen flex justify-center items-center">
      <ReportList />
    </div>
  );
}
