class Response {
  static jsonResponse(httpCode = 500, data = {}) {
    return {
      statusCode: httpCode,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*', // Allow from anywhere
        'Access-Control-Allow-Methods': '*', // Allow only GET request
      },
      body: JSON.stringify(data),
    };
  }
}

module.exports = Response;
