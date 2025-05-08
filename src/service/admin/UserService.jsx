const usersMock = [
    { id: 1, email: 'admin@example.com', role: 'ADMIN' },
    { id: 2, email: 'user@example.com', role: 'USER' },
  ];
  
  const UserService = {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(usersMock), 300);
      });
    },
  };
  
  export default UserService;
  