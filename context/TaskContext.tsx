import React, {createContext, useState, useContext} from 'react';

// Define the type for the task object
type Task = {
  id: number;
  title: string;
  description: string;
  startTime: Date; // Change the type to Date
  endTime: Date; // Change the type to Date
};

// Define the type for the context
type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
};

// Create the context object with the defined type
const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{tasks, addTask, deleteTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
};
