import fs from "node:fs";
import path from "node:path";
import ReportContent, { type ReportFileKey } from "./report-content";

const reportFileKeys: ReportFileKey[] = [
  "wave",
  "mountain",
  "moon",
  "mirror",
  "fire",
  "garden",
  "star",
  "forest"
];

function readReports(): Record<ReportFileKey, string | null> {
  const reportsDir = path.join(process.cwd(), "reports");

  return reportFileKeys.reduce(
    (reports, key) => {
      const filePath = path.join(reportsDir, `${key}.md`);

      try {
        reports[key] = fs.readFileSync(filePath, "utf8");
      } catch {
        reports[key] = null;
      }

      return reports;
    },
    {} as Record<ReportFileKey, string | null>
  );
}

export default function ReportPlaceholderPage() {
  return <ReportContent reports={readReports()} />;
}
