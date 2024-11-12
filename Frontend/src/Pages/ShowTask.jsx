import { useState, useEffect } from 'react';

function ShowTask() {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: '', name: '', description: '' });
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/gettasks');
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Delete task function
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            // Remove the deleted task from the state
            setTasks(tasks.filter(task => task.id !== id));
            // Show success alert
            setAlert({ show: true, message: 'Task deleted successfully!', type: 'success' });
            setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000); // Hide alert after 3 seconds
        } catch (error) {
            console.error("Error deleting task:", error);
            // Show error alert
            setAlert({ show: true, message: 'Failed to delete task.', type: 'error' });
            setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000); // Hide alert after 3 seconds
        }
    };

    // Handle edit task form submission
    const handleUpdateTask = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/updatetasks/${currentTask.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: currentTask.name,
                    description: currentTask.description
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
            // Update the task in the state
            setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
            setIsEditing(false);
            // Show success alert
            setAlert({ show: true, message: 'Task updated successfully!', type: 'success' });
            setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000); // Hide alert after 3 seconds
        } catch (error) {
            console.error("Error updating task:", error);
            // Show error alert
            setAlert({ show: true, message: 'Failed to update task.', type: 'error' });
            setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000); // Hide alert after 3 seconds
        }
    };

    // Handle input change for the edit form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle editing a task
    const handleEditClick = (task) => {
        setCurrentTask(task);
        setIsEditing(true);
    };

    // Close the edit form
    const handleClose = () => {
        setIsEditing(false);
    };

    return (
        <section className="min-h-screen p-4 bg-slate-100 sm:p-8">
            <div className="container mx-auto">
                {/* Alert */}
                {alert.show && (
                    <div className={`mb-4 text-center p-3 rounded-md px-5 py-2 ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {alert.message}
                    </div>
                )}

                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 sm:text-3xl lg:text-4xl">Tasks List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-2 py-2 text-xs font-medium text-left text-gray-500 sm:px-4 sm:text-sm">Task Name</th>
                                <th className="px-2 py-2 text-xs font-medium text-left text-gray-500 sm:px-4 sm:text-sm">Task Description</th>
                                <th className="px-2 py-2 text-xs font-medium text-left text-gray-500 sm:px-4 sm:text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id} className="border-b border-gray-200">
                                    <td className="px-2 py-2 text-sm text-gray-700 sm:px-4">{task.name}</td>
                                    <td className="px-2 py-2 text-sm text-gray-700 sm:px-4">{task.description}</td>
                                    <td className="px-2 py-2 text-sm text-gray-700 sm:px-4">
                                        <button
                                            onClick={() => handleEditClick(task)}
                                            className="px-2 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Task Form as a Popup */}
                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                            {/* Close Button (X) */}
                            <button
                                onClick={handleClose}
                                className="absolute text-gray-500 top-4 right-4 hover:text-black"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <h3 className="mb-4 text-xl font-semibold text-center">Edit Task</h3>
                            <form onSubmit={handleUpdateTask} className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">
                                        Task Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={currentTask.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700" htmlFor="description">
                                        Task Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={currentTask.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-5 py-2 font-bold text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Update Task
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ShowTask;
