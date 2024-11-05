import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-white">
      <Menu />
      <div className="w-[calc(100%-4rem)] min-h-screen bg-pattern z-0">
        <Header />
        {children}
      </div>
    </div>
  )
}