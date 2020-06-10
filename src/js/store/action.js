export const ADD_ARTICLE = "ADD_ARTICLE";

export function addArticle(payload) {
  return {
    type: ADD_ARTICLE,
    payload: payload,
  };
}
