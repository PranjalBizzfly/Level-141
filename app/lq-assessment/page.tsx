import { LqAssessment } from "@/components/lq/LqAssessment";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "LQ™ Assessment",
  description:
    "A concise assessment of how visible and credible your leadership is to the people who matter. Receive an LQ Score out of 100, your LQ Level and a personal report on what to strengthen first.",
  path: routes.lq,
});

export default function LqAssessmentPage() {
  return <LqAssessment />;
}
