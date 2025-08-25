import type { MediaItem } from "./MediaInputField";

type MediaPreviewProps = {
  mediaItem: MediaItem;
  onDelete?: (mediaItem: MediaItem) => void;
};
export const MediaPreview = (props: MediaPreviewProps) => {
  const { mediaItem } = props;

  return (
    <>
      <div className="media-preview-container">
        <button className="delete-btn">Delete</button>
        <img width={100} height={100} src={mediaItem.url ?? "something"} />
      </div>
    </>
  );
};
