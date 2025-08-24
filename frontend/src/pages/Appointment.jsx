import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from "axios";

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol ,assets} = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    // ✅ Only one definition now
   const bookAppointment = async () => {
  try {
    if (!docSlots[slotIndex] || !slotTime) return;

    const slot = docSlots[slotIndex].find(s => s.time === slotTime);
    if (!slot) return;

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Format date as ISO string for backend
    const slotDate = slot.datetime.toISOString();

    // ✅ Correct object
    const appointmentData = {
      patientId: userId,
      doctorId: docInfo._id,
      date: slotDate,
      time: slotTime,
    };
    console.log(`Bearer ${token}`);
    console.log("Booking appointment with data:", appointmentData);

    const res = await axios.post(
      "http://localhost:8080/api/appointment/book",
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    console.log("Appointment booked:", res.data);
    alert("Appointment booked successfully!");
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert(error.response?.data?.message || "Booking failed");
  }
};

    // const bookAppointment = async () => {
        

    //     // Get user ID and token from localStorage (assuming you store them after login)
       

    //     try {
    //         await axios.post("http://localhost:8080/api/appointment/book", {
    //         doctorId: docInfo._id,   // match backend
    //         patientId: userId,       // match backend
    //         date: slotDate,
    //         time: slotTime
    //         }, {
    //         headers: { Authorization:`Bearer ${token}`},
    //         withCredentials: true
    //         });

    //         alert("Appointment booked successfully!")
    //     } catch (err) {
    //         console.error(err)
    //         alert("Failed to book appointment")
    //     }
    // }

    useEffect(() => {
        if (doctors.length > 0) {
            const info = doctors.find((doc) => doc._id === docId)
            setDocInfo(info)
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            let today = new Date()
            let slots = []

            for (let i = 0; i < 7; i++) {
                let currentDate = new Date(today)
                currentDate.setDate(today.getDate() + i)
                let endTime = new Date(currentDate)
                endTime.setHours(21, 0, 0, 0)

                if (i === 0) {
                    let now = new Date()
                    let startHour = now.getHours() > 10 ? now.getHours() + 1 : 10
                    currentDate.setHours(startHour)
                    currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0)
                } else {
                    currentDate.setHours(10, 0, 0, 0)
                }

                let timeSlots = []
                while (currentDate < endTime) {
                    let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                    currentDate.setMinutes(currentDate.getMinutes() + 30)
                }
                slots.push(timeSlots)
            }
            setDocSlots(slots)
            setSlotIndex(0)
            setSlotTime('')
        }
    }, [docInfo])

    if (!docInfo) return null

    return (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {docInfo.name}
                        <img className='w-5' src={assets.verified_icon} alt="verified" />
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.specialty}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About <img className='w-3' src={assets.info_icon} alt="info" />
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>

            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.map((item, index) => (
                        <div
                            onClick={() => setSlotIndex(index)}
                            key={index}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
                        <p
                            onClick={() => setSlotTime(item.time)}
                            key={index}
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button
                    onClick={bookAppointment}
                    className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'
                    disabled={!slotTime}
                >
                    Book an appointment
                </button>
            </div>

            <RelatedDoctors specialty={docInfo.specialty} docId={docId} />
        </div>
    )
}

export default Appointment
