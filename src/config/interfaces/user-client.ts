//This is the ONLY user info that will get sent to client on front end, no need to send password!!
// Differs from DB user model because there is no password field!

interface UserClient {
  id: string;
  email: string;
  username: string;
}

export default UserClient;
