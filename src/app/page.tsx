import Login from "@/components/auth/login/login";
import Background from "@/components/auth/layout/background";
import MultiColorBar from "@/components/ui/layout/multi-color-bar";
import FooterInfo from "@/components/layout/footer/footerInfo";

export default function Home() {
  return (
    <>
      <div className="flex gap-2 w-full h-full md:h-screen">
        <Login />
        <Background />
      </div>
      <MultiColorBar />
      <FooterInfo />
    </>
  );
}