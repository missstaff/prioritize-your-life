import React from "react";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Refresh the screen when it is focused
 * @param refetch - The refetch function
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
