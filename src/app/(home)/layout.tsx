export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-0 flex-1 w-full flex flex-col items-center justify-center gap-8">
      {children}
    </main>
  );
}
