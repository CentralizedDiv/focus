import { useEffect, useState } from 'react';

function isClient() {
  return typeof window === "object";
}
function isAPISupported(api: any) {
  return api in window;
}
const errorMessage =
  "matchMedia is not supported, this could happen both because window.matchMedia is not supported by" +
  " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
const useMediaQuery = (mediaQuery: string) => {
  if (!isClient || !isAPISupported("matchMedia")) {
    if (process.env.NODE_ENV !== "test") {
      // eslint-disable-next-line no-console
      console.warn(errorMessage);
    }
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isVerified, setIsVerified] = useState(!!window.matchMedia(mediaQuery).matches);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

    mediaQueryList.addListener(documentChangeHandler);

    documentChangeHandler();
    return () => {
      mediaQueryList.removeListener(documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};

export default useMediaQuery;
