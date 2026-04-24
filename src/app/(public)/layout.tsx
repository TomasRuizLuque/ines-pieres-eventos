import Header from '@/components/Header'
import FloatingContact from '@/components/FloatingContact'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <FloatingContact />
    </>
  )
}
