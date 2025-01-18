export default function Home() {
  // Hardcoded data for schedule and to-do list
  const schedule = [
    { start_time: "8:00AM", end_time: "10:00AM", item: "Get ready for CS100 at 10:00AM s djna sdjn asjnd ajns d d abs dbhsa bhd asbhdabsh " },
    { start_time: "10:00AM", end_time: "11:00AM", item: "CS100" },
    { start_time: "11:00AM", end_time: "1:00PM", item: "Lunch with lab partners" },
    { start_time: "1:00PM", end_time: "4:00PM", item: "Lab class" },
    { start_time: "4:00PM", end_time: "6:00PM", item: "Lab Discussion" },
    { start_time: "6:00PM", end_time: "7:00PM", item: "Dinner with family at Cheesecake Factory" },
    { start_time: "7:00PM", end_time: "9:00PM", item: "Workout at 24hr fitness" },
    { start_time: "9:00PM", end_time: "11:00PM", item: "Work on CS140 PA1" },
  ];

  const todoList = [
    { name: "CS 140 PA1 dj absjhdb as djbas dnas djbnas jdba", dueDate: "1/16", subItems: [] },
    {
      name: "Final Project",
      dueDate: "1/25",
      subItems: ["Set up repo", "Write report da sjnd jans djnas djnas jnd asjnd ajns "],
    },
    { name: "Final exam", dueDate: "1/28", subItems: [] },
  ];

  // Calculate the duration in hours for each schedule item
  const scheduleWithDuration = schedule.map((entry) => {
    const [startHour, startPeriod] = entry.start_time.match(/(\d+):\d+(AM|PM)/).slice(1);
    const [endHour, endPeriod] = entry.end_time.match(/(\d+):\d+(AM|PM)/).slice(1);

    const start = parseInt(startHour) + (startPeriod === "PM" && startHour !== "12" ? 12 : 0);
    const end = parseInt(endHour) + (endPeriod === "PM" && endHour !== "12" ? 12 : 0);

    const duration = end - start;
    return { ...entry, duration };
  });

  return (
    <div className="flex w-4/5 p-5 gap-5 md:flex-row flex-col">
      {/* Schedule Section */}
      <div className="flex flex-col w-full md:w-1/2 border-2 border-black p-5">
        <h2 className="mb-4 text-center text-2xl">Schedule</h2>
        {scheduleWithDuration.map((entry, index) => (
          <div
            key={index}
            className="flex mb-2 gap-4"
            style={{ minHeight: `calc(${entry.duration} * 1.2rem + 1rem)` }}
          >
            <div className="w-16 text-right">
              {entry.start_time}
            </div>
            <div
              className="flex-1 border-2 border-black rounded-md p-1 overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: entry.duration,
              }}
            >
              {entry.item}
            </div>
          </div>
        ))}
        <div className="flex mt-5 gap-2">
          <input type="text" placeholder="Type here..." className="flex-1 border-2 border-black p-1" />
          <button className="w-20 border-2 border-black p-1">Send</button>
        </div>
      </div>

      {/* To-Do List Section */}
      <div className="w-full md:w-1/2 border-2 border-black p-5">
        <h2 className="mb-4 text-center text-2xl">To Do List</h2>
        {todoList.map((task, index) => (
          <div key={index} className="mb-2 border-2 border-black rounded-md p-2">
            <div className="flex justify-between items-start">
              <input type="checkbox" className="w-4 mt-1 mr-2"/>
              <h3>{task.name}</h3>
              <h4>{task.dueDate}</h4>
            </div>
            {task.subItems.length > 0 && (
              <div className="pl-5">
                <h4>Tasks</h4>
                <div className="flex flex-col gap-2 border-2 border-black rounded-md p-2"> 
                  {task.subItems.map((subItem, subIndex) => (
                    <div key={subIndex} className="flex items-start">
                      <input type="checkbox" className="w-4 mt-1 mr-2"/>
                      <span>{subItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
