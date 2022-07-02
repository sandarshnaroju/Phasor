let globalUrl = ['https://vid.puffyan.us'];

const setGlobalUrl = url => {
  globalUrl[0] = url;
};
const getGlobalUrl = () => {
  return globalUrl[0];
};

const worker = {
  setGlobalUrl,
  globalUrl,
  getGlobalUrl,
};

module.exports = worker;
