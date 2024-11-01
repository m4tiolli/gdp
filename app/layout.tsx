import localFont from 'next/font/local'
import { Providers } from "./providers";
import './globals.css'

const manrope = localFont({
  src: [
    {
      path: './fonts/Manrope-ExtraLight.ttf',
      weight: '200',
      style: 'normal'
    },
    {
      path: './fonts/Manrope-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/Manrope-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/Manrope-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/Manrope-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/Manrope-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/Manrope-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
  ]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" >
      <body className={manrope.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}