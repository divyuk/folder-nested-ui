import { useState } from "react";
import "./../styles.css";

function Folder({ handleInsertNode, explorerData }) {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handlePropogation = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
    setShow(true);
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setShow(!show)}>
          📁 {explorerData.name}
          <div>
            <button onClick={(e) => handlePropogation(e, true)}>
              Folder +
            </button>
            <button onClick={(e) => handlePropogation(e, false)}>File +</button>
          </div>
        </div>

        <div>
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
        </div>

        <div style={{ display: show ? "block" : "none", paddingLeft: 25 }}>
          {explorerData.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorerData={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📃{explorerData.name}</span>;
  }
}

export default Folder;
