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
import {
  useDeleteUserComment,
  useGetAnimeComments,
  useGetCommentCount,
} from "@/lib/query-api";
import CommentForm from "./comment-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontal, VerifiedIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

const CommentSection = ({ id, anime }: { id: string; anime: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, status } = useSession();

  const [showSpoiler, setIsShowSpoiler] = useState<{[key: string]:boolean}>({})

  const { data: comments, isLoading } = useGetAnimeComments(id);
  const { data: counts } = useGetCommentCount(id);
  const { mutate: deleteComment } = useDeleteUserComment();

  const handleToggleSpoiler = (commentId: string) => {
    setIsShowSpoiler((prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    })))
  }

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
          <p className="text-sm text-muted-foreground">{counts} comments</p>
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

        <div className="my-2">
          <p className="text-xs"><strong>Note:</strong> if your comment contains spoilers please do type <span className="text-primary">/spoiler</span></p>
        </div>

        <CommentForm
          status={status}
          anime={anime}
          animeId={id}
          userId={data?.user.id!}
        />

        {isLoading && <p>is loading comments</p>}
        <div className="my-3 w-full">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                className={cn(
                  "flex py-4",
                  comments.length - 1 === index
                    ? "border-none"
                    : "border-b border-muted"
                )}
                key={comment.id}
              >
                <div className="flex items-start w-full gap-4">
                  <Avatar className="dark:bg-stone-800">
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src={comment.author.image} />
                  </Avatar>

                  <div className="w-full flex-1">
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
                    <div className="relative w-full">
                      <p
                        className={cn(
                          "text-muted-foreground my-2 w-full",
                          comment.isSpoiler && "select-none blur-sm",
                          showSpoiler[comment.id] && "blur-none select-text"
                        )}
                      >
                        {comment.content.replace("/spoiler", "")}
                      </p>
                      {comment.isSpoiler && (
                        <span onClick={() => handleToggleSpoiler(comment.id)} className="text-xs select-none px-2 py-1 cursor-pointer underline">
                          {showSpoiler[comment.id] ? "Hide spoiler" : "Show spoiler"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {comment.userId === data?.user.id && (
                        <DropdownMenuItem
                          onClick={() =>
                            deleteComment({
                              userId: data?.user.id!,
                              commentId: comment.id,
                            })
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem disabled>Upvote</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        <div className="w-full">
          {!!counts && counts > 5 && (
            <p className="text-center text-stone-500 text-sm underline">
              see more {Number(counts) - 5} comments
            </p>
          )}
          <p className="text-center text-stone-500 text-sm mt-5">
            Underconstruction ⚠️
          </p>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
export default CommentSection;
