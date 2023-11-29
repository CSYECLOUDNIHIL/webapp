// Load the AWS SDK for Node.js
const dotenv = require('dotenv');
dotenv.config();
var AWS = require('aws-sdk');
// Set region
AWS.config.update({
        region: process.env.AWS_REGION
    });

// Create publish parameters
const postSNSTopic = async (userInfo) => {
  return new Promise((resolve, reject) => {


    const snsTopic = new AWS.SNS({ apiVersion: '2010-03-31' });

    const SNSMessageParams = {
        Message: JSON.stringify({
            default: 'User submitted the assignment',
            submissionId:userInfo.submission_id,
            email: userInfo.email,
            assignmentId:userInfo.assignment_id,
            submissionUrl: userInfo.url,
            reminingAttempts:userInfo.reminingAttempts,
            availableAttempts: userInfo.availableAttempts
        }),
        TopicArn: process.env.AWS_SNS_TOPIC
    };

    snsTopic.publish(params, (err, data) => {
          if (err) {
              console.error(err, err.stack);
              reject(err);
          } else {
              console.log(`Message ${SNSMessageParams.Message} sent to the topic ${SNSMessageParams.TopicArn}`);
              console.log("MessageID is " + data.MessageId);
              resolve(data);
          }
      });
  });
};

module.exports = { postSNSTopic };