import Image, { ImageProps } from "next/image";
import { BLUR_DATA_URLS } from "@/utils/imageBlur";

type BlurType = 'default' | 'dark' | 'profile' | 'project' | 'avatar';

interface CustomImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  blurType?: BlurType;
  enableBlur?: boolean;
  alt: string; // Make alt required for accessibility
}

const CustomImage: React.FC<CustomImageProps> = ({
  blurType = 'default',
  enableBlur = true,
  alt,
  ...props
}) => {
  const blurProps = enableBlur
    ? {
        placeholder: 'blur' as const,
        blurDataURL: BLUR_DATA_URLS[blurType],
      }
    : {};

  return <Image alt={alt} {...props} {...blurProps} />;
};

export default CustomImage;
