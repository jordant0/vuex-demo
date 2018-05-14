import faker from 'faker';

const NUM_TOPICS = 20;
const NUM_USERS = 10;

let users = [],
    topics = [];

for (var i = 0; i < NUM_USERS; ++i) {
  users.push({
    id: faker.random.number(),
    userName: faker.internet.userName(),
    email: faker.internet.exampleEmail(),
    name: faker.name.findName(),
    title: faker.name.jobTitle(),
    avatar: faker.image.avatar(),
    followed: false,
  });
}

for (var i = 0; i < NUM_TOPICS; ++i) {
  topics.push({
    id: faker.random.number(),
    subject: faker.commerce.productName(),
    post: faker.hacker.phrase(),
    user_id: users[Math.floor(Math.random() * NUM_USERS)].id,
    points: faker.random.number(50),
    createdAt: faker.date.past(),
    spiced: false,
    sticky: false,
  });
}

export {
  users,
  topics
}
