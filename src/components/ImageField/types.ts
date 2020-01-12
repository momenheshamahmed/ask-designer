export interface Props {
  value: string | File | null;
  error: string | undefined;
  setValue: (value: string | File) => void;
}

export interface ImageData {
  url: string;
}