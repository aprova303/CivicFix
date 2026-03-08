import Banner from "@/components/home/Banner";
import WhyCivicFix from "@/components/home/WhyCivicFix";
import GetInvolved from "@/components/home/GetInvolved";
import Impact from "@/components/home/Impact";
import RecentIssues from "@/components/home/RecentIssues";

export default function Home() {
  return (
    <>
      <div>
        <section>
          <Banner />
          <WhyCivicFix />
          <RecentIssues />
          <GetInvolved />
          <Impact />
        </section>
      </div>
    </>
  );
}
