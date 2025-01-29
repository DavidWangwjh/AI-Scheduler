"use client";
import React, { useState, KeyboardEvent } from "react";
import { UserAnalysis } from "@/components/ui/userAnalysis"

export default function Page() {
  // ------------------------- State -------------------------
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "CS 140 PA1 dj asbjhdb as djbas dnas djbnas jdba",
      completed: false,
      dueDate: "1/16",
    },
    {
      id: 2,
      title: "Final Project",
      completed: false,
      dueDate: "1/25",
      subTasks: [
        { id: 21, title: "Set up repo", completed: false },
        {
          id: 22,
          title: "Write report da sjnd jans djnas djnas jnd asjnd ajns nkd asjnd ajns djasnd ajn",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Final exam",
      completed: false,
      dueDate: "1/28",
    },
  ]);

  const [scheduleItems] = useState([
    { id: 1, time: "10:00AM", description: "CS100" },
    { id: 2, time: "11:00AM", description: "Lunch with lab partners" },
    { id: 3, time: "1:00PM", description: "Lab class" },
    { id: 4, time: "4:00PM", description: "Lab Discussion dbakshj djn " },
    {
      id: 5,
      time: "6:00PM",
      description: "Dinner with family at Cheesecake Factory Dinner Dinner Dinner Dinner Dinner Dinner Dinner Dinner Dinner",
    },
    { id: 6, time: "7:00PM", description: "Workout at 24hr fitness" },
    { id: 7, time: "9:00PM", description: "Work on CS140 PA1" },
  ]);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // For the Add-Task modal
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newSubTasks, setNewSubTasks] = useState([]);

  // ------------------------- Handlers -------------------------
  const handleToggleTaskCompletion = (taskId) => {
    if (!taskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // Toggle main task
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        // Otherwise, check subTasks
        if (task.subTasks && task.subTasks.length > 0) {
          return {
            ...task,
            subTasks: task.subTasks.map((sub) =>
              sub.id === taskId ? { ...sub, completed: !sub.completed } : sub
            ),
          };
        }
        return task;
      })
    );
  };

  const handleOpenAddTaskModal = () => {
    setShowAddTaskModal(true);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
    setNewTaskTitle("");
    setNewTaskDueDate("");
    setNewSubTasks([]);
  };

  const handleAddSubTask = () => {
    const newId = Date.now() + Math.random();
    setNewSubTasks((prev) => [
      ...prev,
      { id: newId, title: "", completed: false },
    ]);
  };

  const handleRemoveSubTask = (index) => {
    setNewSubTasks((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubTaskTitleChange = (index, value) => {
    setNewSubTasks((prev) => {
      const updated = [...prev];
      updated[index].title = value;
      return updated;
    });
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) return;

    const newId = Date.now();
    const finalSubTasks = newSubTasks
      .filter((sub) => sub.title.trim().length > 0)
      .map((sub) => ({ ...sub, title: sub.title.trim() }));

    const newTask = {
      id: newId,
      title: newTaskTitle.trim(),
      completed: false,
      dueDate: newTaskDueDate.trim(),
      subTasks: finalSubTasks.length > 0 ? finalSubTasks : undefined,
    };

    setTasks((prev) => [...prev, newTask]);
    handleCloseAddTaskModal();
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "User",
      text: chatInput.trim(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI Response
    const aiResponse = {
      id: Date.now() + 1,
      sender: "AI",
      text: "This is a simulated AI response for: " + userMessage.text,
    };
    setChatMessages((prev) => [...prev, aiResponse]);
  };

  const handleKeyDownChat = (event) => {
    if (event.key === "Enter") handleChatSend();
  };

  return (
    <main className="flex flex-row min-h-screen justify-start items-start">
      {/* SIDEBAR */}
      <nav className="bg-gray-100 w-50 h-screen p-4 flex flex-col space-y-2 md:hidden">
        <div
          tabIndex={0}
          aria-label="To-Do List"
          onClick={() => {}}
          onKeyDown={() => {}}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          &#9776; To-Do List
        </div>
        <div
          tabIndex={0}
          aria-label="Today's Schedule"
          onClick={() => {}}
          onKeyDown={() => {}}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          &#128197; Schedule
        </div>
        <div
          tabIndex={0}
          aria-label="User Analysis"
          onClick={() => {}}
          onKeyDown={() => {}}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          &#128200; Analysis
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="grid md:grid-cols-3 p-4 gap-4 w-full h-full">
        {/* TO-DO LIST CARD */}
        <section className="w-full bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-4">To-Do List</h2>
          <div className="mb-4 flex flex-col space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="pl-2 border rounded p-2">
                <div className="flex items-center justify-between space-x-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                    className="cursor-pointer"
                    aria-label={`Mark ${task.title} as completed`}
                  />
                  <span
                    className={task.completed ? "line-through text-gray-400" : ""}
                  >
                    {task.title}
                  </span>
                  <span className="ml-auto">{task.dueDate}</span>
                </div>

                {/* SUBTASKS */}
                {task.subTasks && task.subTasks.length > 0 && (
                  <div className="ml-6 mt-2">
                    {task.subTasks.map((sub) => (
                      <div key={sub.id} className="flex items-center space-x-2 mb-1">
                        <input
                          type="checkbox"
                          checked={sub.completed}
                          onChange={() => handleToggleTaskCompletion(sub.id)}
                          className="cursor-pointer"
                          aria-label={`Mark ${sub.title} as completed`}
                        />
                        <span
                          className={
                            sub.completed ? "line-through text-gray-400" : ""
                          }
                        >
                          {sub.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Task button */}
          <button
            tabIndex={0}
            aria-label="Open Add Task Modal"
            onClick={handleOpenAddTaskModal}
            className="bg-orange-400 text-white px-3 py-1 rounded"
          >
            Add Task
          </button>
        </section>

        {/* TODAY'S SCHEDULE CARD */}
        <section className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-4">Today’s Schedule</h2>
          <div className="flex flex-col space-y-2">
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className="border rounded p-2 flex items-center justify-between"
              >
                <span className="mr-4">{item.time}</span>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN (User Analysis + Chat) */}
        <div className="flex flex-col gap-4 w-full">
          <UserAnalysis></UserAnalysis>

          {/* CHAT AREA */}
          <section className="bg-white p-4 shadow rounded flex flex-col flex-1">
            <h2 className="text-xl font-bold mb-2">Chat</h2>
            <div className="mb-2 overflow-y-auto border p-2 rounded flex-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.sender === "User"
                      ? "text-right mb-2"
                      : "text-left mb-2 text-gray-600"
                  }
                >
                  <div
                    className={
                      msg.sender === "User"
                        ? "inline-block bg-orange-200 rounded px-2 py-1"
                        : "inline-block bg-gray-200 rounded px-2 py-1"
                    }
                  >
                    <span className="text-sm">{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                tabIndex={0}
                aria-label="Chat message input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDownChat}
                placeholder="Type your message..."
                className="border rounded p-1 flex-1"
              />
              <button
                tabIndex={0}
                aria-label="Send chat message"
                onClick={handleChatSend}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleChatSend();
                }}
                className="bg-white border rounded px-3 py-1 hover:bg-gray-100"
              >
                Send
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* ADD-TASK MODAL */}
      {showAddTaskModal && (
        <div
          tabIndex={0}
          aria-label="Add Task Modal Overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCloseAddTaskModal();
          }}
        >
          <div className="bg-white p-4 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-2">Add New Task</h2>
            
            {/* TITLE INPUT */}
            <label className="block mb-1" htmlFor="taskTitle">
              Title
            </label>
            <input
              id="taskTitle"
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="border rounded p-1 w-full mb-2"
            />

            {/* DUE DATE INPUT */}
            <label className="block mb-1" htmlFor="dueDate">
              Due Date
            </label>
            <input
              id="dueDate"
              type="text"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="border rounded p-1 w-full mb-2"
            />

            {/* SUB-TASKS */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Sub-Tasks</span>
                <button
                  tabIndex={0}
                  aria-label="Add subtask"
                  onClick={handleAddSubTask}
                  className="bg-gray-200 text-xs px-2 py-1 rounded"
                >
                  + Add
                </button>
              </div>

              {newSubTasks.map((sub, index) => (
                <div key={sub.id} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={sub.title}
                    onChange={(e) => handleSubTaskTitleChange(index, e.target.value)}
                    placeholder={`Sub-task #${index + 1}`}
                    className="border rounded p-1 w-full mr-2"
                  />
                  <button
                    tabIndex={0}
                    aria-label="Remove subtask"
                    onClick={() => handleRemoveSubTask(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    {/* You can use any icon you prefer, e.g., an SVG or emoji */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 
                          2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-8V5a1 
                          1 0 00-1-1h-4a1 1 0 00-1 1v2m-3 0h12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end space-x-2">
              <button
                tabIndex={0}
                aria-label="Cancel add task"
                onClick={handleCloseAddTaskModal}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                tabIndex={0}
                aria-label="Save new task"
                onClick={handleSaveTask}
                className="bg-orange-400 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}