/**
 * A component that conditionally renders content based on a given condition.
 * @param {boolean} props.condition - The condition to evaluate.
 * @param {React.ReactNode} props.render - The content to render if the condition is true.
 * @param {React.ReactNode | null} [props.renderElse=null] - The content to render if the condition is false.
 * @returns {React.ReactNode | null} The rendered content based on the condition.
 */
export default function ShowIf({
  condition,
  render,
  renderElse = null,
}: {
  condition: boolean;
  render: React.ReactNode;
  renderElse?: React.ReactNode | null;
}): React.ReactNode | null {
  if (condition) {
    return <>{render}</>;
  }
  if (renderElse) {
    return <>{renderElse}</>;
  }
  return null;
}
