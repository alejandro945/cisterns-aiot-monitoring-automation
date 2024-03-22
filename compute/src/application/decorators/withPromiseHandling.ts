
/**
 * Decorator function that handles promise errors and loading state
 * @param func async function to decorate
 * Pending Global message automatic
 */
export function withPromiseHandling(
  Func: Function,
  setIsLoading: (isLoading: boolean) => void,
  setIsError: (isError: boolean) => void,
  notificationHandler: (description: string, title?: string,) => void,
  notifyOnSuccess = true,
  succesMessage = 'Action completed successfully.',
) {
  return async (...args: any[]) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const result = await Func(...args);
      setIsLoading(false);
      if (notifyOnSuccess) notificationHandler('success', succesMessage);
      return result;
    } catch (error) {
      setIsError(true);
      notificationHandler('error', (error as Error).message ?? 'An error has occurred.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
}
