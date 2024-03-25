import Link from "next/link";
import React from "react";
import { Calendar, Event, ListProps } from "../../types/calendar";

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Tus Calendarios
      </h2>
      <ul className="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200">
        {items.map((calendar: Calendar) => (
          <li key={calendar._id} className="px-6 py-4">
            <Link
              href={`/calendar/${calendar._id}`}
              className="text-md font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {calendar.title}
            </Link>
            <ul className="mt-2">
              {calendar.eventsIds.map((event: Event) => (
                <li key={event._id} className="text-sm text-gray-700">
                  {event.title} - {new Date(event.start).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
