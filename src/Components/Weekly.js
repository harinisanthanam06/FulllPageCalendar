import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


const WeeklyCalendar = () => {
    // const dispatch = useDispatch()
    // const startOfWeek = useAppSelector((state) => state.calendar.week);
    const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf('week'));
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
    ];
    const weekDates = [...Array(7)].map((_, index) => startOfWeek.add(index, 'day').format('D'));

    const handleNextWeek = () => {
        setStartOfWeek(startOfWeek.add(1, 'week'));
    };
    const handlePrevWeek = () => {
        setStartOfWeek(startOfWeek.subtract(1, 'week'));
    };

    const staticEvents = [
        { date: '2024-05-12', time: '10:00 AM', title: 'Team Meeting' },
        { date: '2024-05-13', time: '2:00 PM', title: 'Client Call' },
        { date: '2024-05-14', time: '10:00 AM', title: 'Product Discussion' },
        { date: '2024-05-15', time: '3:00 PM', title: 'Scrum Meet' },
        { date: '2024-05-15', time: '4:00 PM', title: 'One - One Discussion' },
        { date: '2024-05-16', time: '5:00 PM', title: "Next Sprint Meeting" },
        { date: '2024-05-16', time: '12:00 PM', title: "Customer <> Project Demo" },
        { date: '2024-05-16', time: '2:00 PM', title: "Project 01 Demo with customers" },

    ];
    return (
        <>
            <div className="col-span-1 flex justify-center items-center">
                <div className="flex  items-center gap-3">
                    <GrFormPrevious
                        className="cursor-pointer hover:scale-105 transition-all bg-zinc-300 w-10 h-10 p-2"
                        onClick={handlePrevWeek}
                    />

                    <GrFormNext
                        className=" cursor-pointer hover:scale-105 transition-all bg-zinc-300 w-10 h-10 p-2"
                        onClick={handleNextWeek}
                    /></div>
                {/* <button onClick={handleNextWeek} className="bg-black text-white p-2 rounded-md cursor-pointer">Next</button> */}
            </div>
            <div className="grid grid-cols-8 left-10 ">
                <div className="col-span-1"></div>
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="col-span-1 text-sm text-center p-3 place-content-center text-gray-500 select-none">
                        {day} <br /> {weekDates[index]}
                    </div>
                ))}
                {timeSlots.map((timeSlot, index) => (
                    <React.Fragment key={index}>
                        <div className="col-span-1 text-sm text-center p-3 place-content-center text-gray-500 select-none">{timeSlot}</div>
                        {daysOfWeek.map((day, dayIndex) => {
                            const currentDate = startOfWeek.add(dayIndex, 'day').format('YYYY-MM-DD');
                            const currentDateTime = `${currentDate}T${timeSlot}`;
                            const event = staticEvents.find((e) => e.date === currentDate && e.time === timeSlot);
                            if (event) {
                                return (
                                    <div key={`${index}-${dayIndex}`} className="col-span-1 text-center h-14 grid place-content-center text-sm border border-zinc-900">
                                        <div className="bg-blue-500 text-white p-1 w-32
                                         rounded-md text-sm">
                                            {event.title}{ }
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div key={`${index}-${dayIndex}`} className="col-span-1 text-center h-14 grid place-content-center text-sm border border-zinc-900">
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div></>
    );
};

export default WeeklyCalendar;
