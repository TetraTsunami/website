import Image from "next/image";

const PostComponents = {
  img: ({
    src = "",
    className,
    height,
    width,
    alt = "",
    blurDataURL = "",
    processed = false,
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    blurDataURL?: string;
    processed?: boolean;
  }) => {
    if (processed)
      return (
        <Image
          src={src}
          height={typeof height === "string" ? parseInt(height, 10) : height}
          width={typeof width === "string" ? parseInt(width, 10) : width}
          alt={alt}
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 70vw, 700px"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          className={className}
        />
      );
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        height={height}
        width={width}
        alt={alt}
        className={className}
      />
    );
  },
};

export default PostComponents;
