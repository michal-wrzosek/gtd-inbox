import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import Button from '@ant-design/react-native/lib/button';
import WingBlank from '@ant-design/react-native/lib/wing-blank';
import WhiteSpace from '@ant-design/react-native/lib/white-space';

import { TaskType, InboxContext } from '../../context/InboxContext';

export interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<NavigationScreenProps<TaskProps>> & {
  navigationOptions: (props: NavigationScreenProps<TaskProps>) => NavigationStackOptions;
} = ({ navigation }) => {
  const [isActionable, setIsActionable] = React.useState<boolean | undefined>(undefined);
  const { removeTask } = React.useContext(InboxContext);

  const { task } = navigation.state.params;

  const handleTrashClick = () => {
    navigation.goBack();
    removeTask(task.id);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <WingBlank>
        <WhiteSpace />
        <Text style={{ fontSize: 24, textAlign: 'center' }}>Is it actionable?</Text>
        <WhiteSpace size="lg" />
        <Button type={isActionable === true ? 'primary' : undefined} onPress={() => setIsActionable(true)}>
          Yes
        </Button>
        <WhiteSpace />
        <Button type={isActionable === false ? 'primary' : undefined} onPress={() => setIsActionable(false)}>
          No
        </Button>
        {isActionable === false && (
          <React.Fragment>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <Button onPress={handleTrashClick}>Trash</Button>
            <WhiteSpace />
            <Button>Ideas</Button>
            <WhiteSpace />
            <Button>Notes</Button>
          </React.Fragment>
        )}
      </WingBlank>
    </View>
  );
};

Task.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.task.name,
});
