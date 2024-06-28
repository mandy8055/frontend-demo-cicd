type ImageType = {
  src: string;
  fallback: string;
  type?: string;
  alt?: string;
};

export const Image = ({
  src,
  fallback,
  type = 'image/webp',
  alt,
  ...delegated
}: ImageType) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} alt={alt} {...delegated} />
    </picture>
  );
};
