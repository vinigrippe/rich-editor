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
  let { range } = getSelection();

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
    if (elementOnFocus && elementOnFocus.nodeName !== "SPAN") {
      let char = event.key;
      let newInsertion = handleCreateInsertion({
        content: char,
      });
      range?.insertNode(newInsertion);
    } else {
      const span = elementOnFocus as HTMLSpanElement;
      const { type, author } = span.dataset;

      console.log(span);
    }
  } else if (!isKeyCodeValid(event.which, keycodes.arrows)) {
    event.preventDefault();
  }
};
