'use client'

import { CommentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { useCreateComment } from "@/lib/query-api";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CommentProps = {
  animeId: string;
  userId: string;
  anime: string
  status: "authenticated" | "unauthenticated" | "loading"
}

const CommentForm = ({ animeId, userId, anime, status }: CommentProps) => {
  const pathname = usePathname()
  const callbackUrl = encodeURIComponent(pathname)
  const { mutate: createPost } = useCreateComment(animeId);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
      isSpoiler: false,
      userId,
      animeId,
    },
  });

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    const checkForSpoiler = values.content.split(" ").some(word => word === "/spoiler")
    startTransition(() => {
      createPost({
        ...values,
        isSpoiler: checkForSpoiler
      })
      form.reset()
    })
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex sm:flex-row flex-col items-start gap-3 w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="flex-1 w-full" placeholder={`Comment about ${anime}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {status === "authenticated"
          ? (
          <button type="submit" className={cn(buttonVariants({ className: "sm:w-44 w-full" }))}>
            Submit
          </button>
          ) : (
            <Link href={`/auth/login?callbackUrl=${callbackUrl}`} className={cn(buttonVariants({ className: "sm:w-44 w-full" }))}>
              Submit
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};
export default CommentForm;
