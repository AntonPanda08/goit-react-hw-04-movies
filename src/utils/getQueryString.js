import queryString from "query-string";
export default function getQueryStringParams(query) {
  return queryString.parse(query);
}
