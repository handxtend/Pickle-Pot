
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Pickle Pot',
  description: 'Community pots for pickleball events'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
          <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-extrabold text-xl text-navy">🥒 Pickle Pot</Link>
            <div className="text-sm text-gray-600">PWA • Mobile-friendly</div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-gray-500 text-sm">© {new Date().getFullYear()} Pickle Pot</footer>
      </body>
    </html>
  )
}
