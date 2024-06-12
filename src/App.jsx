import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTrees from "./hooks/useTraverseTrees";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, editNode } = useTraverseTrees();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (id) => {
    const finalTree = deleteNode(explorerData, id);
    setExplorerData(finalTree);
  };

  const handleEditNode = (id, newName) => {
    const finalTree = editNode(explorerData, id, newName);
    setExplorerData(finalTree);
  };
  return (
    <div>
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleEditNode={handleEditNode}
        explorerData={explorerData}
      />
    </div>
  );
}

export default App;
