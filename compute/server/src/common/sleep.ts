/**
 * Common function with the responsibility of sleeping for a given amount of time.
 * @param timeout - Time to sleep in milliseconds
 * @returns Promise<void>
 */
export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};
