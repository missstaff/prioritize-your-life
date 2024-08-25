import React from "react";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Refreshes the screen when the screen is focused.
 * @template T - The type of the data.
 * @param {Function} refetch - The function to refetch the data.
 */
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}
