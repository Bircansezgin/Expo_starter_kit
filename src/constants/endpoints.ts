export const users = {
  login: () => `/login`,
  register: () => `/register`,
  changePassword: () => `/change-password`,
  getUsers: () => `/users`,
  deleteUserById: (id: number | string) => `/delete-user/${id}`,
  getUserById: (id: number | string) => `/get-user/${id}`,
  refreshCurrentUser: () => `/refresh-current-user`,
  getCurrentUserPermissions: () => `/current-user-permissions`,
  forgotPassword: () => `/forgot-password`,
  editProfile: () => `/edit-profile`,
};

