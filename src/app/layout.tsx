import ReactQueryProviders from "../providers/ReactQueryProviders";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
