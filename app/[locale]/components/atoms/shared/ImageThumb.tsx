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
        <Image src={imageSrc} alt={altText} fill />
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
