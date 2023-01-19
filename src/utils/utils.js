export const reduction = (text) => {
  text.split('').length > 50 ? (text = text.split('').slice(0, 50).join('') + '...') : text;
  return text;
};
