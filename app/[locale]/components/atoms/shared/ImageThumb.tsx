import Image from 'next/image';

interface ImageThumbProps {
  selected: boolean;
  index: number;
  onClick: () => void;
  imageSrc: string;
  altText: string;
}

const ImageThumb = ({
  selected,
  onClick,
  imageSrc,
  altText,
}: ImageThumbProps) => {
  return (
    <div
      className={`min-w-35 flex-[0_0_23%] cursor-pointer overflow-hidden rounded-lg ${
        selected ? 'border-title border-opacity-75 border' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        {imageSrc ? (
          <Image src={imageSrc} alt={altText} fill />
        ) : (
          <div className="bg-muted flex h-full w-full items-center justify-center">
            <div className="bg-muted-foreground/30 h-8 w-8 rounded" />
          </div>
        )}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 hover:opacity-0 ${
            selected ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};

export default ImageThumb;
