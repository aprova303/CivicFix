import Banner from "@/components/home/Banner";
import WhyCivicFix from "@/components/home/WhyCivicFix";
import GetInvolved from "@/components/home/GetInvolved";
import Impact from "@/components/home/Impact";
import SessionRedirect from "@/components/home/SessionRedirect";

export default function Home() {
  return (
    <>
      <SessionRedirect />
      <div>
        <section>
          <Banner />
          <WhyCivicFix />
          <GetInvolved />
          <Impact />
        </section>
      </div>
    </>
  );
}
