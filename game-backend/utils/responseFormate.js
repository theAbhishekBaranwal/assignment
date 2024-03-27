const successResponse = (res, message, data) => {
    return res.status(200).send({ success: true, message, data });
  };
  
  const failureResponse = (res, message, error) => {
    return res
      .status(error && error.status ? error.status : 400)
      .send({ success: false, message, error: JSON.stringify(error) });
  };
  
  
  module.exports = {successResponse,failureResponse} // response return status code