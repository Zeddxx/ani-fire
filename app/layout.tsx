import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/query-provider'
import { cn } from '@/lib/utils'
import Provider from '@/providers/theme-provider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'AnimeFire | Watch anime without any ads!',
  description: 'Anifire is a anime streaming free website where you can watch any anime for free with-out any ads and popups.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "dark:bg-black antialiased")}>
        <QueryProvider>
          <Provider>
            {children}
          </Provider>
        </QueryProvider>
      </body>
    </html>
  )
}
