import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

// 2. Provider component — ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // อ่าน favorites จาก localStorage ตอนเริ่มต้น
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  // บันทึก favorites ลง localStorage ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
