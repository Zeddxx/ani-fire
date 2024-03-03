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
import { Button } from "../ui/button";
import { useCreateComment } from "@/lib/query-api";
import { useTransition } from "react";

type CommentProps = {
  animeId: string;
  userId: string;
  anime: string
}

const CommentForm = ({ animeId, userId, anime }: CommentProps) => {
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
    startTransition(() => {
      createPost(values)
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
          <Button disabled={isPending} type="submit" className="sm:w-44 w-full">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
export default CommentForm;
