import React from 'react';
import { Image, ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

interface RNInterfaceProps {
  source: string;
  style?: StyleProp<ImageStyle>;
  placeHolderContent: React.ReactNode;
  loading?: boolean;
  resizeMode?: ImageResizeMode;
}

const RNImage: React.FC<RNInterfaceProps> = ({
  source,
  placeHolderContent,
  style,
  resizeMode = 'contain',
  loading = false,
  ...props
}) => {
  if (loading) return placeHolderContent;

  return (
    <Image
      {...props}
      source={{
        uri: source,
      }}
      resizeMode={resizeMode}
      style={style}
    />
  );
};

export default RNImage;
