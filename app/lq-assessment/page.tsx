import { LqAssessment } from "@/components/lq/LqAssessment";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "LQ™ Assessment",
  description:
    "Take the free LQ™ Assessment: ten questions on how visible and credible your leadership is. We email your LQ Score, LQ Level and a personal report.",
  path: routes.lq,
});

export default function LqAssessmentPage() {
  return <LqAssessment />;
}
