import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

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
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setErrorOccurred(false);
        const uri = await RNImageManager.getLocalUri(cacheKey, source);
        setLocalUri(uri);
      } catch (error) {
        setErrorOccurred(true);
        if (__DEV__) {
          console.error('Error fetching image:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [cacheKey, source]);

  if (loading) {
    return placeHolderContent || null;
  }

  if (errorOccurred || !localUri) {
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
