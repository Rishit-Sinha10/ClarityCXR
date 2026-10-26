import type { Metadata } from "next";
import Link from "next/link";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { ReportsList } from "./reports-list";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Illustrative chest X-ray reports in the ClarityCXR demonstration workspace.",
};

export default function ReportsPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <PageHeader
        eyebrow="Workspace / Reports"
        title="Reports"
        description="Draft report content for the fictional studies in this demo. Every report is clearly marked as illustrative and is not clinically validated."
        action={
          <Button
            asChild
            variant="outline"
            className="h-10 border-hairline bg-card px-3 text-xs"
          >
            <Link href="/dashboard/history">
              <History className="size-4" aria-hidden />
              Study history
            </Link>
          </Button>
        }
      />

      <div className="mt-5">
        <ReportsList />
      </div>
    </div>
  );
}
