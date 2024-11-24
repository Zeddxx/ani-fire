import Image, { ImageProps } from "next/image";
import * as React from "react";

interface CustomImageProps extends ImageProps {}

const CustomImage = React.forwardRef<HTMLImageElement, CustomImageProps>(
  ({ ...props }, ref) => {
    return (
      <Image
        ref={ref}
        draggable={false}
        onError={(e) => {
          e.currentTarget.src = "/assets/images/placeholder.jpg";
          e.currentTarget.srcset = "/assets/images/placeholder.jpg";
        }}
        {...props}
      />
    );
  },
);

CustomImage.displayName = "CustomImage";

export { CustomImage };
