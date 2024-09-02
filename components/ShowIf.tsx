const ShowIf = ({
  condition,
  render,
  renderElse = null,
}: {
  condition: boolean | undefined;
  render: React.ReactNode;
  renderElse?: React.ReactNode | null;
}) => {
  if (condition) {
    return <>{render}</>;
  }
  if (renderElse) {
    return <>{renderElse}</>;
  }
  return null;
};

export default ShowIf;
