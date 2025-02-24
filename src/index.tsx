import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';

import { RNInterfaceProps } from './types/image';
import { RNImageManager } from './util/imageManager';

const RNImage: React.FC<RNInterfaceProps> = ({
  cacheKey,
  source,
  placeHolderContent,
  fallbackContent,
  style,
  resizeMode = 'contain',
  ...props
}) => {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      const uri = await RNImageManager.getLocalUri(cacheKey, source);
      setLocalUri(uri);
      setLoading(false);
    };

    fetchImage();
  }, [cacheKey, source]);

  if (loading) {
    return placeHolderContent || <ActivityIndicator />;
  }

  if (!localUri) {
    return fallbackContent || null;
  }

  return (
    <Image
      {...props}
      source={{ uri: localUri }}
      resizeMode={resizeMode}
      style={style}
    />
  );
};

export default RNImage;
