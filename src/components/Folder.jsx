function Folder({ explorerData }) {
  if (explorerData.isFolder) {
    return (
      <span>
        📁 {explorerData.name}
        <div>
          {explorerData.items.map((exp) => {
            return <Folder explorerData={exp} />;
          })}
        </div>
      </span>
    );
  } else {
    return <span>📃{explorerData.name}</span>;
  }
}

export default Folder;
