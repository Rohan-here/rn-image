import RNFS from 'react-native-fs';

export const RNImageManager = {
  /**
   * Retrieves a local URI for the image identified by cacheKey.
   * If the image is not already cached, it downloads it.
   * @param cacheKey Unique key for caching.
   * @param source Remote image URL.
   * @returns A promise that resolves to a local file URI or null on failure.
   */
  async getLocalUri(cacheKey: string, source: string): Promise<string | null> {
    const filePath = `${RNFS.CachesDirectoryPath}/rn-image-manager/${cacheKey}.png`; // adjust extension as needed
    try {
      const exists = await RNFS.exists(filePath);
      if (exists) {
        return `file://${filePath}`;
      }
      return await RNImageManager.downloadImage(source, filePath);
    } catch (error) {
      console.error('Error in getLocalUri:', error);
      return null;
    }
  },

  /**
   * Downloads the image from a remote URL and saves it to the specified file path.
   * @param source Remote image URL.
   * @param filePath Local file path where the image will be saved.
   * @returns A promise that resolves to the local file URI if successful, or null otherwise.
   */
  async downloadImage(
    source: string,
    filePath: string
  ): Promise<string | null> {
    try {
      const downloadResult = await RNFS.downloadFile({
        fromUrl: source,
        toFile: filePath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        return `file://${filePath}`;
      } else {
        console.error(
          `Download failed with status code: ${downloadResult.statusCode}`
        );
        return null;
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  },
};
