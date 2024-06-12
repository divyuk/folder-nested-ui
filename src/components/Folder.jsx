import { useState } from "react";
import "./../styles.css";

function Folder({
  handleInsertNode,
  handleDeleteNode,
  handleEditNode,
  explorerData,
}) {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(explorerData.name);

  const handlePropagation = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
    setShow(true);
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const deleteFolder = (e, id) => {
    e.stopPropagation();
    handleDeleteNode(id);
  };

  const startEditing = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const handleEdit = (e) => {
    if (e.keyCode === 13 && newName.trim()) {
      handleEditNode(explorerData.id, newName);
      setEditMode(false);
    }
  };

  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setShow(!show)}>
          📁{" "}
          {editMode ? (
            <div className="inputContainer">
              <input
                className="input"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleEdit}
                onBlur={() => setEditMode(false)}
                autoFocus
              />
            </div>
          ) : (
            explorerData.name
          )}
          <div>
            <button onClick={(e) => handlePropagation(e, true)}>
              Folder +
            </button>
            <button onClick={(e) => handlePropagation(e, false)}>File +</button>
            <button onClick={(e) => deleteFolder(e, explorerData.id)}>
              Del
            </button>
            <button onClick={startEditing}>Edit</button>
          </div>
        </div>

        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "📃"}</span>
            <input
              className="input"
              type="text"
              onKeyDown={addFolder}
              autoFocus
              onBlur={() => setShowInput({ ...showInput, visible: false })}
            />
          </div>
        )}

        <div style={{ display: show ? "block" : "none", paddingLeft: 25 }}>
          {explorerData.items.map((exp) => (
            <Folder
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleEditNode={handleEditNode}
              explorerData={exp}
              key={exp.id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <span className="file">
        {editMode ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleEdit}
            onBlur={() => setEditMode(false)}
            autoFocus
          />
        ) : (
          `📃 ${explorerData.name}`
        )}
        <button onClick={(e) => deleteFolder(e, explorerData.id)}>x</button>
        <button onClick={startEditing}>✏</button>
      </span>
    );
  }
}

export default Folder;
