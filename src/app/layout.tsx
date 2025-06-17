import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Duane's website",
  description: "This is Duane's corner of the internet.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚲</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen w-full flex items-center justify-center">
          <div className="flex flex-col justify-center h-full w-full max-w-[700px] p-3 gap-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
