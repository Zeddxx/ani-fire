export default function HomeLayout({
  children,
  heading,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {heading && (
        <h2 className="text-2xl font-semibold text-secondary">{heading}</h2>
      )}
      <div className="">{children}</div>
    </>
  );
}
