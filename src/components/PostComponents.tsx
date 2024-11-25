import Image from "next/image";

const PostComponents = {
  img: ({
    src = "",
    className,
    height,
    width,
    alt = "",
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className={className}>
      <Image
        layout="responsive"
        src={src}
        height={typeof height === 'string' ? parseInt(height, 10) : height}
        width={typeof width === 'string' ? parseInt(width, 10) : width}
        alt={alt}
      />
    </div>
  ),
};

export default PostComponents;
