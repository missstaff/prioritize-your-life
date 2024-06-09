import React from "react";
import { NotifyOnChangeProps } from "@tanstack/query-core";
import { useFocusEffect } from "@react-navigation/native";


/**
 * Hook that returns a function that can be used to notify the parent component
 * when the component is focused and the props have changed.
 *
 * This is useful when you want to notify the parent component when the props
 * have changed, but only when the component is focused.
 *
 * @param notifyOnChangeProps - The props to notify the parent component about
 * when they change. Can be a function that returns the props to notify about.
 */
export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps,
) {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, []),
  )

  return () => {
    if (!focusedRef.current) {
      return []
    }

    if (typeof notifyOnChangeProps === "function") {
      return notifyOnChangeProps()
    }

    return notifyOnChangeProps
  }
}
