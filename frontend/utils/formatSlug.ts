export const formatSlug = (firstName: string, lastName: string) => {
  let str = firstName + " " + lastName;
  str = str.replace(/[^a-zA-Z0-9 ]/g, ""); // Remove all special characters
  str = str.replace(/ /g, "+"); // Replace all spaces with '+'

  return str.toLowerCase();
};
