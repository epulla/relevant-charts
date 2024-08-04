export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-0 flex-1 w-full mt-12">
      {children}
    </main>
  );
}
