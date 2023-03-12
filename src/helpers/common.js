const response = (res, data, status, message, pagination) => {
  let statusName = "";
  //Set status based on statuscode
  if (status >= 100 && status < 200) {
    statusName = "informational";
  } else if (status >= 200 && status < 300) {
    statusName = "success";
  } else if (status >= 300 && status < 400) {
    statusName = "redirectional";
  } else if (status >= 400 && status < 500) {
    statusName = "client error";
  } else if (status >= 500 && status < 600) {
    statusName = "server error";
  }
  const resultPrint = {
    status: statusName,
    statusCode: status,
    data,
    message: message || null,
    pagination: pagination || {}
  };
  res.status(status).json(resultPrint);
};

module.exports = {response}
