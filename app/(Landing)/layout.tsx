export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full bg-[#162711] overflow-auto">
    <div className="mx-auto max-w-screen-xl h-full w-full">
        {children}

    </div>
  </main>;
}
