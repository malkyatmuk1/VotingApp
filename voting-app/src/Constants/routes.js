const url =
  (process.env.PUBLIC_URL === "/" ? "" : process.env.PUBLIC_URL) || "";

export const HOME = url + "/";
export const LOGIN = url + "/login";
export const VOTE = url + "/vote";
export const MYVOTE = url + "/my-vote";
export const RESULTS = url + "/result";
