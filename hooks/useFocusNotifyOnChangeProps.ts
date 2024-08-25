import React from "react";
import { NotifyOnChangeProps } from "@tanstack/query-core";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Notifies the component when the focus changes.
 * @param notifyOnChangeProps The props to notify on change.
 * @returns The props to notify on change.
 */
export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps
) {
  const focusedRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, [])
  );

  return () => {
    if (!focusedRef.current) {
      return [];
    }

    if (typeof notifyOnChangeProps === "function") {
      return notifyOnChangeProps();
    }

    return notifyOnChangeProps;
  };
}
