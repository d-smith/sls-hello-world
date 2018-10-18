const AWS = require('aws-sdk');

const putServiceDuration = async (serviceName, timeMillis) => {

  let params = {
    MetricData: [
      {
        MetricName: serviceName + 'Duration',
        Dimensions: [
          {
            Name: 'Stage',
            Value: process.env.STAGE
          }
        ],
        Unit: 'Milliseconds',
        Value: timeMillis
      }],

    Namespace: 'HelloSls'
  };



  const cloudwatch = new AWS.CloudWatch();


  cloudwatch.putMetricData(params, (err, data) => {
    console.log('putServiceDuration');
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

};

const fnThatReturnsAPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

module.exports.hello = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  let start = new Date().getTime();
  await fnThatReturnsAPromise();
  let stop = new Date().getTime();
  putServiceDuration('hello', stop - start);


  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
