import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

<<<<<<< HEAD
export const useUserContext = () => useContext(UserContext);
=======
export const useUserContext = () => useContext(UserContext);
>>>>>>> b79c09baacdc5ccb0decd225770a881b9dd3d6f3
