export const AddionalInfo = ({
  title,
  desc,
}: {
  title: string;
  desc: string | string[];
}) => (
  <div className="flex flex-wrap items-center gap-1 text-[13px] capitalize">
    <p className="font-semibold">{title}:</p>
    {typeof desc === "object" ? (
      desc.map((producer, idx) => (
        <p className="text-muted-foreground" key={idx}>
          {producer}{" "}
        </p>
      ))
    ) : (
      <p className="text-muted-foreground">{desc}</p>
    )}
  </div>
);
