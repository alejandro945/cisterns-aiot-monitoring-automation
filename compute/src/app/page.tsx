import LeftPanel from "@/presentation/containers/auth/server/LeftPanel";
import RightPanel from "@/presentation/containers/auth/server/RightPanel";

export default function Home() {
  return (
    <main>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left Panel */}
        <LeftPanel />
        {/* Right Panel */}
        <RightPanel />
      </div>
    </main>
  );
}
