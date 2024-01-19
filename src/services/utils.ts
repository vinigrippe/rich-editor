export const authorId = 1;

export const createRandomId = () => {
  const date = new Date();
  const dateParse = Date.parse(date.toString());
  const randomNumber = Math.random().toString(36).substr(2);

  return String(randomNumber + dateParse);
};

export const handleCreateInsertion = ({ content }: { content: string }) => {
  const id = createRandomId();
  const span = document.createElement("span");
  span.setAttribute("data-id", id);
  span.setAttribute("data-type", "insert");
  span.setAttribute("data-author", authorId.toString());
  span.setAttribute("data-time", new Date().toISOString());

  span.innerHTML = content;

  return span;
};
