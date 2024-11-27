import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [keyword] = useQueryState("keyword", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [query, setQuery] = useState<string>(keyword ?? "");

  const handleSearch = () => {
    router.push(`/search?keyword=${query}`);
  };

  return (
    <Input
      onChange={({ target: { value } }) => setQuery(value)}
      onKeyDown={({ key }) => {
        if (key === "Enter") {
          handleSearch();
        }
      }}
      value={query}
      placeholder="Search Anime..."
    />
  );
}
