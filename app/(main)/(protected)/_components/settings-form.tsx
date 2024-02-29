"use client";

import { settings } from "@/actions/settings";
import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { currentUser } from "@/lib/auth";
import { useUploadThing } from "@/lib/uploadthing";
import { SettingsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsForm = () => {
  const { update, data } = useSession()

  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);

  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof SettingsSchema>) {
    try {
      let uploadImageUrl = values.image;

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (isUploading) {
          return toast({
            title: "Uploading image...🫷",
            description:
              "Taking too much time? Contact the developer say him to make this work faster 🌸.",
          });
        }
        if (!uploadedImages) {
          return toast({
            variant: "destructive",
            title: "Upload failed! 💀",
            description:
              "Please contact the developer as he is lazy to fix this error i guess! 🥹",
            action: (
              <ToastAction asChild altText="Report Error">
                <a href="https://github.com/zeddxx" target="_blank">
                  Message Dev
                </a>
              </ToastAction>
            ),
          });
        }
  
        uploadImageUrl = uploadedImages[0].url;
      }
  
        settings({
          ...values,
          name: values.name,
          image: uploadImageUrl,
        }).then((data) => {
          update();
          if(data.error) {
            toast({
              title: "Error Updating Profile",
              description: "Eventually this error is occuring due to laziness of out developer. please contact him. 💀",
              action: <ToastAction asChild altText="Github">
                <a href="https://github.com/zeddxx" target="_blank">
                  Github
                </a>
              </ToastAction>
            })
          }
          if(data.success) {
            update();
            toast({
              title: "Profile updated successfully! 🎉",
              description: "Loved this project give this project a ⭐",
              action: <ToastAction asChild altText="Github">
                <a href="https://github.com/zeddxx" target="_blank">
                  Github
                </a>
              </ToastAction>
            })
          }
        })
    } catch (error) {
      throw error;
    }
  }
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: data?.user.name || "",
      image: data?.user.image || "",
      email: data?.user.email || "",
    },
  });
  return (
    <Card className="max-w-[420px] mx-auto w-full xs:border xs:border-muted border-none xs:bg-card bg-transparent">
      <CardHeader>
        <h1 className="text-3xl font-semibold">Update Account?</h1>
        <p className="text-sm text-muted-foreground">
          Please be respectfull what username you are choosing.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full text-center">
                    <FormControl>
                      <div className="relative w-full flex justify-center">
                        <FileUploader
                          isUploading={isUploading || isPending}
                          onFieldChange={field.onChange}
                          imageUrl={field.value || ""}
                          setFiles={setFiles}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isPending || isUploading}
                          className="pl-10 h-12"
                          placeholder="@zeddxx"
                          {...field}
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 leading-none pb-1">
                          @
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled
                          className="pl-10 h-12"
                          placeholder=""
                          {...field}
                        />
                        <span className="absolute text-muted-foreground left-4 top-1/2 -translate-y-1/2 leading-none pb-1">
                          @
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isPending || isUploading}
              type="submit"
              className="w-full"
            >
              Update account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default SettingsForm;
