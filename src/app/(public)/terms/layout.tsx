export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-stone-900">{children}</div>;
}
