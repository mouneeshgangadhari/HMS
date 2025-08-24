
import { useNavigate } from 'react-router-dom';

export default function DoctorList({ doctors }) {
  const navigate = useNavigate();

  const handleBook = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div>
      {doctors.map(doc => (
        <div key={doc._id}>
          <h3>{doc.name}</h3>
          <p>{doc.specialization}</p>
          <button onClick={() => handleBook(doc._id)}>Book Appointment</button>
        </div>
      ))}
    </div>
  );
}