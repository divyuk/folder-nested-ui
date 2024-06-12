function useTraverseTrees() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      // unshift adds in front of the array
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });

      return tree;
    }
    // if its not root and DFS
    let latestNode = [];
    latestNode = tree.items.map((obj) =>
      insertNode(obj, folderId, item, isFolder)
    );
    return { ...tree, items: latestNode };
  }

  const deleteNode = (tree, id) => {
    if (tree.id === id) {
      return null; // Return null to indicate the node should be deleted
    }

    // If the current node has children, process them
    if (tree.items && tree.items.length > 0) {
      // Filter out the node that needs to be deleted
      const filteredItems = tree.items
        .map((item) => deleteNode(item, id)) // Recursively process children
        .filter((item) => item !== null); // Remove any nulls which indicate deleted nodes
      return { ...tree, items: filteredItems };
    }

    return tree;
  };

  const editNode = (tree, id, newName) => {
    // Base case: if the current node is the one to be edited
    if (tree.id === id) {
      return { ...tree, name: newName };
    }

    // If the current node has children, recursively process them
    if (tree.items && tree.items.length > 0) {
      const updatedItems = tree.items.map((item) =>
        editNode(item, id, newName)
      );
      return { ...tree, items: updatedItems };
    }

    // If no children and the current node is not the one to be edited, return it unchanged
    return tree;
  };

  return { insertNode, deleteNode, editNode };
}

export default useTraverseTrees;
