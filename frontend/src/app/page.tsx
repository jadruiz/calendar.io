"use client";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import List from "../../components/calendar/List";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  useAuth();
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendars = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        console.error("No user ID or token found");
        setLoading(false);
        return;
      }

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
        const response = await fetch(
          `${apiUrl}/api/v1/calendars/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch calendars");
        }
        const { data } = await response.json();
        setCalendars(data);
      } catch (error) {
        console.error("Error fetching calendars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendars();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center">
          Cargando...
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <List items={calendars} />
      </main>
      <Footer />
    </>
  );
}
