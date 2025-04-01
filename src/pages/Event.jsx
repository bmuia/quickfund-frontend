import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch event details
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/events/${id}/`)
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching event:", error));
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!event) return;

    if (parseFloat(event.amount_raised) + parseFloat(amount) > parseFloat(event.goal_amount)) {
      setErrorMessage("Donation exceeds goal amount.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/donate/", {
        event: id,
        donor_name: donorName,
        amount: amount,
      });

      alert("Donation successful!");

      // Clear form
      setDonorName("");
      setAmount("");

      // Fetch updated event data
      axios.get(`http://127.0.0.1:8000/api/events/${id}/`)
        .then(response => setEvent(response.data));

    } catch (error) {
      console.error("Error making donation:", error);
    }
  };

  if (!event) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{event.title}</h1>
        <p className="text-gray-700 text-lg mb-8">{event.description}</p>
        <p className="text-green-600 text-xl font-semibold mb-10">
          ${event.amount_raised} / ${event.goal_amount}
        </p>

        {parseFloat(event.amount_raised) >= parseFloat(event.goal_amount) ? (
          <p className="text-center text-xl font-bold text-red-500">🎉 Goal Reached! No more donations needed. 🎉</p>
        ) : (
          <form onSubmit={handleDonate} className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Make a Donation</h2>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            <input
              type="text"
              placeholder="Your Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-md text-lg transform transition duration-300 hover:bg-blue-700 hover:scale-105">
              Donate Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Event;
