import React from "react";

/**
 * A component that renders a child component if a condition is met.
 * @param condition The condition to check.
 * @param render The component to render if the condition is met.
 * @param renderElse The component to render if the condition is not met.
 */
export default function ShowIf({
  condition,
  render,
  renderElse,
}: {
  condition: boolean;
  render: React.ReactNode;
  renderElse: React.ReactNode | null;
}) {
  if (condition) {
    return <>{render}</>;
  }
  if (renderElse) {
    return <>{renderElse}</>;
  }
  return null;
}
