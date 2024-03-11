"use client";

import MaxWidthContainer from "@/components/container/max-width-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetUserCommentsCount } from "@/lib/query-api";
import { MessageCircle, User2Icon, Verified } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const { data, status } = useSession();
  const { data: comments, isLoading } = useGetUserCommentsCount(data?.user.id!);

  if (status === "loading") {
    return (
      <div className="h-[calc(100lvh-120px)] w-full flex items-center justify-center">
        <span>
          <FaSpinner className="animate-spin h-6 w-6 text-primary" />
        </span>
      </div>
    );
  }

  return (
    <MaxWidthContainer>
      <div className="px-4">
        {/* Banner and User picture */}
        <div className="w-full h-auto relative">
          <div className="h-52 w-full bg-muted grid place-items-center">
            <p className="text-muted-foreground text-sm">
              for user banner! underdevelopment
            </p>
          </div>
          <Avatar className="h-40 w-40 border-4 bg-muted dark:border-black border-white absolute -bottom-20 left-4">
            <AvatarImage src={data?.user.image || ""} />
            <AvatarFallback>
              <User2Icon />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full mt-24 sm:px-6">
          <div className="flex">
            <h1 className="text-xl capitalize">{data?.user.name}</h1>
            <span className="ml-2">
              <Verified className="text-primary h-5 w-5" />
            </span>
          </div>

          {/* User comments counts: how much this user have commented! */}
          <div className="mt-4 border-t border-muted pt-4">
            <h2 className="text-2xl font-medium">Activity</h2>
            {/* <div className="grid grid-cols-2">
              <Button className="rounded-none bg-primary hover:bg-primary/90 hover:text-white text-white border-b border-muted" variant="ghost">
                  <MessageCircle className="h-5 w-5" />
                  <p className="ml-2">
                    <span className="hidden sm:inline">Total comments:</span> {comments?.length}
                  </p>
              </Button>

              <Button className="rounded-none border-b border-muted" variant="ghost">
                  <p className="text-muted-foreground ml-2">
                    <span className="">Currently Watching</span>
                  </p>
              </Button>
            </div> */}
            <div className="flex mt-6 p-4 rounded-lg bg-muted/50 shadow-sm shadow-muted-foreground/50 flex-col items-center w-full">
              <h2 className="text-7xl font-normal text-primary">{comments?.length}</h2>
              <p>Comments</p>
            </div>

            <div className="h-52 flex items-center justify-center text-muted-foreground">
              <p>Underconstruction</p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
export default Dashboard;
