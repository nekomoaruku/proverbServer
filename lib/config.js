var config = {
  host: 'localhost',
  port: 3000,
  jwtSecret: '!@#$%^&*',
  aws: {
    accessKeyId: '',
    secretAccessKey: '',
    region: 'ap-northeast-1'
  },
  dynamoTable: "proverb_quiz"
};

module.exports = config;
