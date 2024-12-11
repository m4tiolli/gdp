import Header from "@/components/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="px-6 py-4 lg:px-32 lg:py-12">
        {children}
      </main>
    </>
  )
}