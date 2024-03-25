// pages/calendar/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import { Calendar, Event } from "../../../../types/calendar";
import Link from "next/link";

const CalendarDetailsPage = () => {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCalendar = async () => {
      const { id } = params;
      if (!id) return;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${apiUrl}/api/v1/calendars/${id}`, {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error("Failed to fetch calendar details");
        }

        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setCalendar(jsonResponse.data);
        } else {
          throw new Error(jsonResponse.message || "Error fetching calendar");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [params.id]); // Dependiendo de la versión de Next.js, es posible que necesites desestructurar params antes de usarlo en el array de dependencias

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!calendar) {
    return <div>Calendar not found.</div>;
  }

  return (
    <>
      <Header />
      <main className="p-4">
        <h1 className="text-xl font-bold">{calendar.title}</h1>
        <div>Events:</div>
        <ul>
          {calendar.eventsIds.map((event: Event) => (
            <li key={event._id} className="my-2">
              <div className="font-semibold">{event.title}</div>
              <div>{event.description}</div>
              <div>Start: {new Date(event.start).toLocaleString()}</div>
              <div>End: {new Date(event.end).toLocaleString()}</div>
            </li>
          ))}
        </ul>
        <Link href="/calendars" className="text-blue-600 hover:underline">
          Back to calendars
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default CalendarDetailsPage;
