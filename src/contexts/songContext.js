import { createContext, useState } from "react";

export const SongContext = createContext();

export default function SongProvider({ children }) {
  const [encryptedSongData, setEncryptedSongData] = useState();

  return (
    <SongContext.Provider value={{  encryptedSongData, setEncryptedSongData }}>
      {children}
    </SongContext.Provider>
  );
}
