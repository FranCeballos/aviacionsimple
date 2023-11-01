export default (id) => {
  return id.trim().toLowerCase().replaceAll(" ", "-");
};
