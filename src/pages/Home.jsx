import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events/")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-white text-center mb-10 tracking-wide">Support a Cause, Change a Life</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{event.title}</h2>
              <p className="text-gray-600 text-base mb-6">{event.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600">${event.amount_raised} raised</p>
                <p className="text-lg font-bold text-gray-800">${event.goal_amount} goal</p>
              </div>
              <Link to={`/event/${event.id}`} className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-center transform transition duration-300 hover:bg-blue-700 hover:scale-105">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
