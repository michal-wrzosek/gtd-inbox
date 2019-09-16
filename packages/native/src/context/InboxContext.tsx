import React from 'react';
import { AsyncStorage } from 'react-native';

interface InboxContextState {
  tasks: string[];
}

interface InboxContextCallbacks {
  addTask: (task: string) => any;
  removeTask: (task: string) => any;
}

interface InboxContextValue extends InboxContextState, InboxContextCallbacks {}

export const InboxContext = React.createContext<InboxContextValue>({} as InboxContextValue);

export const InboxContextProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<InboxContextState>({ tasks: [] });
  const stateWasMutatedByUser = React.useRef(false);

  React.useEffect(() => {
    const saveState = async () => {
      try {
        const inboxRaw = JSON.stringify(state);
        console.log('saveState', inboxRaw);
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
        const inboxRaw = await AsyncStorage.getItem('inbox');
        if (inboxRaw === null) return;

        const inbox = JSON.parse(inboxRaw);
        console.log('getSavedState', inbox);
        setState(inbox);
      } catch (error) {
        console.error(error);
      }
    };

    getSavedState();
  }, [setState]);

  const addTask = React.useCallback(
    (task: string) => {
      stateWasMutatedByUser.current = true;
      setState(prevState =>
        prevState.tasks.indexOf(task) === -1
          ? {
              ...prevState,
              tasks: [task, ...prevState.tasks],
            }
          : prevState,
      );
    },
    [setState],
  );

  const removeTask = React.useCallback(
    (task: string) => {
      stateWasMutatedByUser.current = true;
      setState(prevState => ({ ...prevState, tasks: prevState.tasks.filter(t => t !== task) }));
    },
    [setState],
  );

  return <InboxContext.Provider value={{ ...state, addTask, removeTask }}>{children}</InboxContext.Provider>;
};
