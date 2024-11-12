import { useState } from 'react';
import { Link } from 'react-router-dom';

function ToDoForm() {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            name: taskName,
            description: taskDescription,
        };

        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                alert("Task added successfully!");
                setTaskName('');
                setTaskDescription('');
            } else {
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting the task.");
        }
    };

    return (
        <section className="relative flex items-center justify-center min-h-screen px-4 bg-slate-100 sm:px-6 lg:px-8">
            <Link 
                className="absolute px-5 py-2 font-bold text-white bg-black rounded-lg top-4 right-4 hover:bg-gray-800 sm:top-6 sm:right-6 lg:top-8 lg:right-8"
                to="/show"
            >
                VIEW TASK
            </Link>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:max-w-lg lg:max-w-xl">
                <h2 className="mb-6 text-xl font-bold text-center text-gray-800 sm:text-2xl lg:text-3xl">Add New Task</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700" htmlFor="taskName">
                            Task Name
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter task name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700" htmlFor="taskDescription">
                            Task Description
                        </label>
                        <textarea
                            id="taskDescription"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter task description"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-5 py-2 font-bold text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ToDoForm;
