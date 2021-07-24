//Will go in DB

export const Users = [
  {
    username: "rohit",
    password: "123",
  },
  {
    username: "preeti",
    password: "abc",
  },
];

function findUser(username) {
  return Users.find((user) => user.username === username);
}

export const fakeAuthAPI = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUser(username);
      if (user) {
        if (user.password === password) {
          resolve({ success: true, status: 200 });
        }
        reject({ success: false, status: 401 });
      }
    }, 3000);
  });
};
