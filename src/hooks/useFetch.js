// custom hook สำหรับดึงข้อมูลจาก API
import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null); // ข้อมูลที่ดึงได้
  const [loading, setLoading] = useState(true); // กำลังโหลด
  const [error, setError] = useState(null); // error

  // ดึงข้อมูลจาก API
  // useCallback ใช้ memoize ฟังก์ชัน fetchData
  // async/await ใช้ async/await เพื่อให้โค้ดดูง่ายขึ้น
  // finally ใช้ finally เพื่อให้โค้ดดูง่ายขึ้น
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // useEffect ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData }; // return ข้อมูลที่ดึงได้, กำลังโหลด, error, refetch
}

export default useFetch;
