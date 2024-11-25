import Image from "next/image";

const PostComponents = {
  img: ({
    src = "",
    className,
    height,
    width,
    alt = "",
    blurDataURL = "",
  }: React.ImgHTMLAttributes<HTMLImageElement> & {blurDataURL?: string}) => (
    <Image
      layout="responsive"
      src={src}
      height={typeof height === 'string' ? parseInt(height, 10) : height}
      width={typeof width === 'string' ? parseInt(width, 10) : width}
      alt={alt}
      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 70vw, 700px"
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className={className}
    />
  ),
};

export default PostComponents;
