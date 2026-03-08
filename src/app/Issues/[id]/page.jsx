import IssuePage from "./IssuePage";

export async function generateMetadata({ params }) {
  // This would ideally fetch from your database
  return {
    title: "Issue Details - CivicFix",
    description: "View detailed information about this civic issue",
  };
}

export default function IssueDetailPage() {
  return <IssuePage />;
}
