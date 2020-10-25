const to = promise =>
  promise
    .then(data => ({data, error: null}))
    .catch(error => ({error, data: null}));

export default to;