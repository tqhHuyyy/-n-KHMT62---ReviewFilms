import * as Constants from '../constants';

export default function loginAPI(data) {
  const objFetch = {
    method: data.method,
    headers: Constants.HEADER,
    body: JSON.stringify(data.data),
  };

  return new Promise((resolve, reject) => {
    const url = Constants.DOMAIN + data.path;
    function handleErrors(response) {
      if (!response.ok) throw new Error(response.status);
      return response;
    }
    fetch(url, objFetch)
      .then(handleErrors)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
