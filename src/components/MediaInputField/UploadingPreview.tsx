import { useHookstate } from "@hookstate/core";
import type { MediaUpload } from "./MediaInputField";
import "./UploadingPreview.styles.css";

type UploadingPreview = {
  mediaUploadItem: MediaUpload;
};

export const UploadingPreview = (props: UploadingPreview) => {
  const { mediaUploadItem } = props;
  const { mediaItem, uploadProgress } = mediaUploadItem;

  const scopedUploadProgress = useHookstate(uploadProgress);

  return (
    <>
      <div className="media-preview-container">
        <div className="uploading-overlay">
          <span className="progressbar" style={{ border: "2px solid grey" }}>
            <span
              className="progress"
              style={{ width: `${scopedUploadProgress.progress.get() * 100}%` }}
            ></span>
          </span>
        </div>
        <img
          width={100}
          height={100}
          src={mediaItem.url ?? "something"}
          style={{ objectFit: "cover" }}
        />
      </div>
    </>
  );
};
