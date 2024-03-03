"use client";

import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import MaxWidthContainer from "../container/max-width-container";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { useGetAnimeComments, useGetCommentCount } from "@/lib/query-api";
import CommentForm from "./comment-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontal, VerifiedIcon } from "lucide-react";

const CommentSection = ({ id, anime }: { id: string, anime: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useSession();
  const { data: comments, isLoading } = useGetAnimeComments(id);
  const { data: counts } = useGetCommentCount(id)

  const onSelectFilter = (filter: string) => {
    let newUrl = "";
    if (filter && filter !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <MaxWidthContainer className="px-4 dark:bg-neutral-950 mt-6 bg-slate-50 py-4">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Comments</h2>
          <p className="text-sm text-muted-foreground">
            {counts} comments
          </p>
        </div>

        <div className="w-full my-2 flex gap-2">
          <Select onValueChange={(value: string) => onSelectFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CommentForm anime={anime} animeId={id} userId={data?.user.id!} />

        {isLoading && <p>is loading comments</p>}
        <div className="my-3">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div className={cn("flex justify-between py-4", comments.length - 1 === index ? 'border-none' : 'border-b border-muted')} key={comment.id}>
                <div className="flex items-start gap-4">
                  <Avatar className="dark:bg-stone-800">
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src={comment.author.image} />
                  </Avatar>

                  <div className="">
                    <div className="flex items-center">
                      <h5 className="text-sm underline">
                        {comment.author.name}
                      </h5>
                      {comment.author.role === "ADMIN" && (
                        <span>
                          <VerifiedIcon className="h-4 w-4 text-primary ml-3" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 leading-none">
                      {comment.author.email}
                    </p>
                    <p className="text-muted-foreground my-2">
                      {comment.content}
                    </p>
                  </div>
                </div>

                <span>
                  <MoreHorizontal className="h-5 w-5" />
                </span>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        <div className="w-full">
          <p className="text-center text-stone-500 text-sm underline">see more {Number(counts) - 5} comments</p>
          <p className="text-center text-stone-500 text-sm mt-5">Underconstruction ⚠️</p>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
export default CommentSection;
