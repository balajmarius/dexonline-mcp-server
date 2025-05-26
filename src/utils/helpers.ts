export const respond = (content: string | string[]) => {
  if (Array.isArray(content)) {
    return {
      content: content.map((text) => {
        return { type: "text" as const, text };
      }),
    };
  }
  return {
    content: [{ type: "text" as const, text: content }],
  };
};
