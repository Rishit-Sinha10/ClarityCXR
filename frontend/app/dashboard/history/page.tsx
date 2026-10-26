import type { Metadata } from "next";
import Link from "next/link";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { StudyTable } from "@/components/dashboard/study-table";

export const metadata: Metadata = {
  title: "Study History",
  description:
    "Browse illustrative chest X-ray studies in the ClarityCXR demo workspace.",
};

export default function StudyHistoryPage() {
  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <PageHeader
        eyebrow="Workspace / Study History"
        title="Study History"
        description="A complete view of the fictional studies in this demo. Use the workspace search to filter by Study ID or patient name."
        action={
          <Button asChild className="h-10 px-4 text-xs">
            <Link href="/dashboard/upload">
              <Upload className="size-4" aria-hidden />
              Upload New Scan
            </Link>
          </Button>
        }
      />

      <div className="mt-5">
        <StudyTable
          title="All Studies"
          description="Six illustrative studies spanning completed, processing, and pending states."
          showViewAll={false}
        />
      </div>
    </div>
  );
}
