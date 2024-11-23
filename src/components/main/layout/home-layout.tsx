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
        <h2 className="text-3xl font-semibold text-primary">{heading}</h2>
      )}
      <div className="">{children}</div>
    </>
  );
}
