export const authorId = 1;

export const createRandomId = () => {
  const date = new Date();
  const dateParse = Date.parse(date.toString());
  const randomNumber = Math.random().toString(36).substr(2);

  return String(randomNumber + dateParse);
};

export const handleCreateInsertion = ({
  content,
  type,
  editable,
}: {
  content: string;
  type: "insert" | "delete";
  editable: boolean;
}) => {
  const id = createRandomId();
  const span = document.createElement("span");
  span.setAttribute("data-id", id);
  span.setAttribute("data-type", type);
  span.setAttribute("data-author", authorId.toString());
  span.setAttribute("data-time", new Date().toISOString());
  span.setAttribute("contentEditable", editable ? "true" : "false");

  span.innerHTML = content;

  return span;
};
