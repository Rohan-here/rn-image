import { ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

interface BaseProps {
  cacheKey: string;
  source: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}

interface LoadingProps extends BaseProps {
  loading: true;
  placeHolderContent: React.ReactNode;
  fallback?: never;
  fallbackContent?: never;
}

interface NonLoadingProps extends BaseProps {
  loading?: false;
  placeHolderContent?: never;
}

interface FallbackProps extends BaseProps {
  fallback: true;
  fallbackContent: React.ReactNode;
  loading?: false;
  placeHolderContent?: never;
}

interface NoFallbackProps extends BaseProps {
  fallback?: false;
  fallbackContent?: never;
}

export type RNInterfaceProps =
  | LoadingProps
  | (NonLoadingProps & (FallbackProps | NoFallbackProps));
