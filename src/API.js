const REACT_APP_VOCABULARY_HOST = "http://localhost:8888"

const API = {

  // vocabulary
  listAllVocabulary: `${REACT_APP_VOCABULARY_HOST}/api/vocabulary/list`,
  addVocabulary: `${REACT_APP_VOCABULARY_HOST}/api/vocabulary/add`,
  updateVocabulary: `${REACT_APP_VOCABULARY_HOST}/api/vocabulary/update`,
  deleteVocabulary: `${REACT_APP_VOCABULARY_HOST}/api/vocabulary/delete`,
};

export default API;