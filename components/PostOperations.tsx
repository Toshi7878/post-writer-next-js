"use client";
import { Post } from "@prisma/client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Icon } from "./icon";
import Link from "next/link";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

async function deletePost(postId: string) {
  try {
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Faild");
    }

    return true;
  } catch (err) {
    toast({
      title: "問題が発生しました。",
      description: "記事の削除ができませんでした。もう一度お試しください。",
    });
  }
}

const PostOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAleart] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon.ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link className="w-full" href={`/editor/${post.id}`}>
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus:text-destructive"
            onClick={() => setShowDeleteAleart(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAleart}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当にこの記事を削除しますか?</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消しができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteLoading(true);
                const deleted = await deletePost(post.id);

                if (deleted) {
                  setShowDeleteAleart(false);
                  setIsDeleteLoading(false);
                  router.refresh();
                }
              }}
              className="border border-red-600 bg-tansparent-600  text-red-600 focus:ring-red-600 hover:bg-red-600 hover:text-white"
            >
              {isDeleteLoading ? <Icon.spinner /> : <Icon.trash />}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostOperations;
