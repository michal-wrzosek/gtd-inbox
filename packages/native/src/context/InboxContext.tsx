import React from 'react';
import { AsyncStorage } from 'react-native';
import { generateId } from '../util/generateId';

export type TaskType = {
  id: string;
  name: string;
};

interface InboxContextState {
  tasks: TaskType[];
}

interface InboxContextCallbacks {
  addTask: (taskName: TaskType['name']) => any;
  removeTask: (taskId: TaskType['id']) => any;
}

interface InboxContextValue extends InboxContextState, InboxContextCallbacks {}

const createNewTask = (taskName: string): TaskType => ({
  id: generateId(),
  name: taskName,
});

export const InboxContext = React.createContext<InboxContextValue>({} as InboxContextValue);

export const InboxContextProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<InboxContextState>({ tasks: [] });
  const stateWasMutatedByUser = React.useRef(false);

  React.useEffect(() => {
    const saveState = async () => {
      try {
        const inboxRaw = JSON.stringify(state);
        await AsyncStorage.setItem('inbox', inboxRaw);
      } catch (error) {
        console.error(error);
      }
    };

    if (stateWasMutatedByUser.current) {
      saveState();
    }
  }, [state]);

  React.useEffect(() => {
    const getSavedState = async () => {
      try {
        // AsyncStorage.removeItem('inbox');
        const inboxRaw = await AsyncStorage.getItem('inbox');
        if (inboxRaw === null) return;

        const inbox = JSON.parse(inboxRaw);
        setState(inbox);
      } catch (error) {
        console.error(error);
      }
    };

    getSavedState();
  }, [setState]);

  const addTask = React.useCallback(
    (taskName: Task['name']) => {
      stateWasMutatedByUser.current = true;

      setState(prevState => ({
        ...prevState,
        tasks: [createNewTask(taskName), ...prevState.tasks],
      }));
    },
    [setState],
  );

  const removeTask = React.useCallback(
    (taskId: TaskType['id']) => {
      stateWasMutatedByUser.current = true;
      setState(prevState => ({ ...prevState, tasks: prevState.tasks.filter(task => task.id !== taskId) }));
    },
    [setState],
  );

  return <InboxContext.Provider value={{ ...state, addTask, removeTask }}>{children}</InboxContext.Provider>;
};
