let lastId = 0;

export default function (prefix = 'id') {
  lastId = parseInt(lastId) + 1;
  // return `${prefix}${lastId}`;
  return `${lastId}`;
}
