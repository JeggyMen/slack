// import React, { useState, useEffect } from 'react';

// export const useSession = (value) => {
//   const [session, setSession] = useState(() => {
//     const persistedSession = JSON.parse(localStorage.getItem('session') || 'null');
//     return persistedSession || value;
//   });

//   useEffect(() => {
//     localStorage.setItem('session', JSON.stringify(session));
//   }, [session]);

//   return [session, setSession];
// };

// const SessionContext = React.createContext({});

// export const SessionProvider = ({ children }) => {
//   const [session, setSession] = useSession(null);

//   return (
//     <SessionContext.Provider value={{ session, setSession }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export default SessionContext;