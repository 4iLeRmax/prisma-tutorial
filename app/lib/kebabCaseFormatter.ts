export const kebabCaseFormatter = (str: string) => {
  return str
    .split("")
    .map((char) => (char === " " ? "-" : char.toLowerCase()))
    .join("");
};
