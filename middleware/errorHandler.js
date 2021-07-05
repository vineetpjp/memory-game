export const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(400).send({
    errors: [{ message: err.message ? err.message : "Something went wrong!!" }],
  });
};

export const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
