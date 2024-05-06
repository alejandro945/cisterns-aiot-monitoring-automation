import LeftPanel from "@/presentation/containers/auth/server/LeftPanel";
import RightPanel from "@/presentation/containers/auth/server/RightPanel";

export default function Root() {
  return (
    <main>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <LeftPanel />
        <RightPanel />
      </div>
    </main>
  );
}
