import React from 'react';
import { Image } from 'react-native';
import { RNInterfaceProps } from './types/image';

const RNImage: React.FC<RNInterfaceProps> = ({
  cacheKey,
  source,
  placeHolderContent,
  fallbackContent,
  style,
  resizeMode = 'contain',
  loading = false,
  fallback = false,
  ...props
}) => {
  if (loading) return placeHolderContent;
  if (fallback) return fallbackContent;

  return (
    <Image
      key={cacheKey}
      {...props}
      source={{ uri: source }}
      resizeMode={resizeMode}
      style={style}
    />
  );
};

export default RNImage;
