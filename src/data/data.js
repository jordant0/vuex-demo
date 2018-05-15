import faker from 'faker';

const NUM_TOPICS = 20;
const NUM_USERS = 10;

let users = [],
    topics = [],
    currentUserId;

function newUser() {
  return {
    id: faker.random.number(),
    userName: faker.internet.userName(),
    email: faker.internet.exampleEmail(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    title: faker.name.jobTitle(),
    company: faker.company.companyName(),
    avatar: faker.image.avatar(),
    followers: faker.random.number(500),
    following: 0,
    followed: false,
  };
};

function newTopic() {
  return {
    id: faker.random.number(),
    subject: faker.hacker.phrase(),
    post: faker.lorem.paragraph(10),
    userId: users[Math.floor(Math.random() * NUM_USERS)].id,
    points: faker.random.number(50),
    createdAt: faker.date.past(),
    userScore: 0,
    sticky: false,
  };
};

for (var i = 0; i < NUM_USERS; ++i) {
  users.push(newUser());
}

for (var i = 0; i < NUM_TOPICS; ++i) {
  topics.push(newTopic());
}

currentUserId = users[Math.floor(Math.random() * NUM_USERS)].id;

export {
  users,
  topics,
  currentUserId,
}
