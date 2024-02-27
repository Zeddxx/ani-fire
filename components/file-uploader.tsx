/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import type { FileWithPath } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  isUploading: boolean;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  isUploading
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center border flex h-32 w-32 bg-slate-50 dark:bg-neutral-800 cursor-pointer flex-col overflow-hidden rounded-full"
    >
      <input disabled={isUploading} {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col h-full justify-center items-center text-grey-500">
          <img
            src="/assets/icons/throw-away-anime.gif"
            className="h-14 w-14 object-contain"
            alt="file upload"
          />
          <h3 className="mt-2 text-xs">Drag photo here</h3>
        </div>
      )}
    </div>
  );
}