import { getElementAtCaret, getSelection } from "./selection";
import { authorId, handleCreateInsertion } from "./utils";

const keycodes = {
  letters: [65, 90],
  numbers: [48, 57],
  numpad: [96, 111],
  arrows: [33, 40],
  punctuation: [186, 192],
  brackets: [219, 223],
};

function isKeyCodeValid(value: number, range: number[]): boolean {
  const [min, max] = range;
  return min <= value && value <= max;
}

export const handleOnKeyDown = (
  event: KeyboardEvent,
  editorElement: HTMLElement
) => {
  const elementOnFocus = getElementAtCaret();
  let { selection, range } = getSelection();

  if (
    isKeyCodeValid(event.which, keycodes.letters) ||
    isKeyCodeValid(event.which, keycodes.numbers) ||
    isKeyCodeValid(event.which, keycodes.punctuation) ||
    isKeyCodeValid(event.which, keycodes.brackets) ||
    isKeyCodeValid(event.which, keycodes.numbers) ||
    event.code === "Delete" ||
    event.code === "Backspace" ||
    event.code === "Space"
  ) {
    if (elementOnFocus?.nodeName !== "SPAN") {
      if (event.code === "Backspace") {
        event.preventDefault();

        if (selection && range) {
          if (range.startOffset !== 0) {
            const charRange = range.cloneRange();
            charRange.setStart(range.startContainer, range.startOffset - 1);
            const char = charRange.toString();

            charRange.deleteContents();
            let newInsertion = handleCreateInsertion({
              content: char,
              type: "delete",
              editable: false,
            });
            range?.insertNode(newInsertion);

            selection.removeAllRanges();
            selection.addRange(range);
            range.setEndAfter(newInsertion);
          }
        }
      } else if (event.code === "Delete") {
        event.preventDefault();
        //do same as backspace but to the right (delete key) instead of left (backspace key)
      } else {
        let char = event.key;
        let newInsertion = handleCreateInsertion({
          content: char,
          type: "insert",
          editable: true,
        });
        range?.insertNode(newInsertion);
      }
    } else {
      const span = elementOnFocus as HTMLElement;
      const { type, author } = span.dataset;
    }
  } else if (!isKeyCodeValid(event.which, keycodes.arrows)) {
    event.preventDefault();
  }
};
