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

  return { insertNode };
}

export default useTraverseTrees;
