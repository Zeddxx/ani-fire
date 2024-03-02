'use client'

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import MaxWidthContainer from "../container/max-width-container"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const CommentSection = () => {
const router = useRouter()
const searchParams = useSearchParams()

const onSelectFilter = (filter: string) => {
    let newUrl = ''
    if(filter && filter !== 'All') {
        newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'filter',
            value: filter
        })
    }else {
        newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['filter']
        })
    }
    router.push(newUrl, { scroll: false })
  }
  return (
    <MaxWidthContainer className="px-4 bg-neutral-950 py-4">
        <div className="">
            <div className="flex justify-between items-center">
                <h2 className="text-xl">Comments</h2>
                <p className="text-sm text-muted-foreground">0 comments yet!</p>
            </div>

            <div className="w-full my-2 flex gap-2">
                <Select onValueChange={(value: string) => onSelectFilter(value)}>
                    <SelectTrigger>
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

            <div className="my-4 text-center">
                Underconstruction ⚠️
            </div>
        </div>
    </MaxWidthContainer>
  )
}
export default CommentSection