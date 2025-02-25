/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from 'react';

interface TaskContextType {
  count: number;
  setCount: (count: number) => void;
}

export const defaultTaskContext = {
  count: 0,
  setCount: () => {},
};

// Create the context
const TaskContext = createContext<TaskContextType>(defaultTaskContext);

// Create the provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <TaskContext.Provider value={{ count, setCount }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  return useContext(TaskContext);
}
