import faker from 'faker';

const SUBJECT_LIMIT = 5;
const POST_LIMIT = 10;
const TIMEOUT = 1000;

window.Api = {
  postNewTopic(topic, successCallback, failureCallback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var valid = true,
            errors = {};

        if(topic.subject.length < SUBJECT_LIMIT) {
          errors.subject = [`Subject must be at least ${SUBJECT_LIMIT} characters`];
          valid = false;
        }

        if(topic.post.length < POST_LIMIT) {
          errors.post = [`Post must be at least ${POST_LIMIT} characters`];
          valid = false;
        }

        if(valid) {
          resolve({
            topic: {
              id: faker.random.number(),
              subject: topic.subject,
              post: topic.post,
              userId: topic.userId,
              points: 0,
              createdAt: (new Date()).toISOString(),
              userScore: 0,
              sticky: true,
            },
          });
        }
        else {
          reject({
            errors: errors,
          });
        }
      }, TIMEOUT);
    });
  },
}
