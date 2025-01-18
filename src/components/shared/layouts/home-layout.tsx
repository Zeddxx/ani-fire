export default function HomeLayout({
  children,
  heading,
  italic,
}: {
  heading?: string;
  children: React.ReactNode;
  italic?: string;
}) {
  return (
    <>
      {heading && (
        <h2 className="text-2xl font-semibold capitalize text-secondary">
          {heading} <i>{italic}</i>
        </h2>
      )}
      <div className="">{children}</div>
    </>
  );
}
