// Load the AWS SDK for Node.js
const dotenv = require('dotenv');
dotenv.config();
var AWS = require('aws-sdk');
// Set region
AWS.config.update({
        region: process.env.region
    });

// Create publish parameters
const postSNSTopic = async (userInfo) => {
  return new Promise((resolve, reject) => {
      const params = {
          Message: JSON.stringify({
              default: 'initialize the download',
              email: userInfo.email,
              http: userInfo.url,
              assignment_id:userInfo.assignment_id,
              submission_id:userInfo.submission_id,
          }),
          TopicArn: process.env.AWS_SNS_TOPIC
      };

      const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

      sns.publish(params, (err, data) => {
          if (err) {
              console.error(err, err.stack);
              reject(err);
          } else {
              console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
              console.log("MessageID is " + data.MessageId);
              resolve(data);
          }
      });
  });
};

module.exports = { postSNSTopic };