export function getCaretPosition(element: HTMLElement): number | null {
  let caretOffset = 0;
  const { range } = getSelection();

  if (range) {
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }

  return caretOffset;
}

export function getElementAtCaret(): Node | null {
  const { selection } = getSelection();
  const parentElement = selection?.anchorNode?.parentElement;

  if (!parentElement) return null;
  return parentElement;
}

export const getSelection = () => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);

  return { selection, range };
};
