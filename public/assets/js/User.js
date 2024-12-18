import { generateId } from './utils/function.js';

class User {

  constructor(username) {
    this.id = generateId();
    this.username = username;
  }

  static getAll() {
    return UserStorage.getAll();
  }
  
  static signIn(username) {
    const users = this.getAll();
    const foundUser = users.find(
      user => user.username.trim().toLowerCase() === username.trim().toLowerCase()
    );
    if(foundUser) {
      UserStorage.setLoggedInUser(foundUser);
      return {success: true, user: foundUser, message: "User found"};
    } else {
      return {success: false, message: "User not found"};
    }
  }

  static signOut() {
    UserStorage.destroy();
  }

  static getCurrentUser() {
    return UserStorage.getLoggedInUser();
  }

  save() {
    UserStorage.save(this);
    this.success = true;
  }
}

const UserStorage = {
  getAll: () => JSON.parse(localStorage.getItem('users')) || [],
  save: (user) => {
    const users = UserStorage.getAll();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },
  getLoggedInUser: () => JSON.parse(localStorage.getItem('loggedInUser')),
  setLoggedInUser: (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  },
  destroy: () => {
    localStorage.removeItem('loggedInUser');
  }
}

export {User}