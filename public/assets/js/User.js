class User {

  constructor(username) {
    this.id = this.generateId();
    this.username = username;
  }

  generateId(prefix = 'user') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}-${timestamp}-${random}`;
  }

  static getAll() {
    return UserStorage.getAll();
  }
  
  static signIn(username) {
    const users = this.getAll();
    const foundUser = users.find(
      user => user.username.trim().tolowerCase() === username.trim().tolowerCase()
    );
    if(foundUser) {
      return {success: true, user: foundUser, message: "User found"};
    } else {
      return {success: false, message: "User not found"};
    }
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
  }
}

export {User}