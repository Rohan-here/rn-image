import RNFS from 'react-native-fs';

export const RNImageManager = {
  /**
   * Retrieves a local URI for the image identified by cacheKey.
   * Ensures the cache directory exists, checks if the image is cached,
   * and downloads it if necessary.
   * @param cacheKey Unique key for caching.
   * @param source Remote image URL.
   * @returns A promise that resolves to a local file URI or null on failure.
   */
  async getLocalUri(cacheKey: string, source: string): Promise<string | null> {
    // Define the cache directory and file path
    const cacheDir = `${RNFS.CachesDirectoryPath}/rn-image-manager`;
    const filePath = `${cacheDir}/${cacheKey}.png`; // Adjust extension as needed

    try {
      // Ensure the cache directory exists
      await RNFS.mkdir(cacheDir);

      // Check if the image is already cached
      const exists = await RNFS.exists(filePath);
      if (exists) {
        return `file://${filePath}`;
      }

      // Download the image if not cached
      return await RNImageManager.downloadImage(source, filePath);
    } catch (error) {
      console.error('Error in RNImageManager.getLocalUri:', error);
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
