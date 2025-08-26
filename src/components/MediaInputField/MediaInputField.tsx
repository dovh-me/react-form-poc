/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, type ChangeEvent } from "react";
import type { InputFieldProps } from "../types";
import { MediaPreview } from "./MediaPreview";
import { hookstate, type State } from "@hookstate/core";
import { UploadingPreview } from "./UploadingPreview";

export type MediaItem = {
  key: string;
  url: string;
};

type UploadState = {
  status: "error" | "pending" | "success";
  progress: number;
};

export type MediaUpload = {
  file: File;
  mediaItem: MediaItem;
  uploadProgress: State<UploadState>;
};

interface MediaInputFieldProps extends InputFieldProps<MediaItem[]> {
  mediaType?: "image" | "video";
  multiple?: boolean;
  autoUpload?: boolean;
  onUpload?: (file: File, uploadState: State<UploadState>) => void;
}

export const MediaInputField = (props: MediaInputFieldProps) => {
  const { multiple = true, autoUpload = true, label, onChange, onUpload, value } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [mediaUploadQueue, setMediaUploadQueue] = useState<MediaUpload[]>([]);
  const filteredValue =
    value?.filter?.((item) =>
      mediaUploadQueue.some((uploadingItem) => uploadingItem.mediaItem === item)
    ) ?? [];

  const handleSelectClick = (e: any) => {
    e.preventDefault();
    inputRef?.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = [...(e?.target?.files ?? [])];
    if (!multiple) {
      value = [...value]?.splice(0, 1);
    }

    const newUploads = [] as MediaUpload[];
    const mediaItemsArray = value.map((file) => {
      const mediaItem = { key: `${Date.now()}`, url: URL.createObjectURL(file) } as MediaItem;
      newUploads.push({
        mediaItem,
        file,
        uploadProgress: hookstate({
          status: "pending",
          progress: 0,
        }),
      } as MediaUpload);

      return mediaItem;
    });

    const proxyEvent = { target: { value: mediaItemsArray } };
    onChange?.(proxyEvent);
    setMediaUploadQueue((mediaQueue) => [...mediaQueue, ...newUploads]);

    // Currently there's no way to cancel an upload
    if (autoUpload) {
      newUploads.map((upload) => {
        onUpload?.(upload.file, upload.uploadProgress);
      });
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}
    >
      {label && <span style={{ fontSize: "0.8rem" }}>{label}</span>}
      <button onClick={handleSelectClick} style={{ padding: "12px 14px", border: "none" }}>
        Select
      </button>

      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        multiple={multiple}
        onChange={handleChange}
        onSelect={handleChange}
      />

      {filteredValue?.map((item) => {
        return <MediaPreview mediaItem={item} />;
      })}

      {mediaUploadQueue.map((mediaItem) => {
        return <UploadingPreview mediaUploadItem={mediaItem} />;
      })}
    </div>
  );
};
