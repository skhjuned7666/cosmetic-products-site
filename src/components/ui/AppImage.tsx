import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/basePath";

function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src === "string" && src.startsWith("/")) {
    return withBasePath(src);
  }
  return src;
}

export default function AppImage({ src, ...props }: ImageProps) {
  return <Image src={resolveSrc(src)} {...props} />;
}
