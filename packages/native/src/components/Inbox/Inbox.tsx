import React from 'react';

import { View, StyleSheet, Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Formik } from 'formik';
import List from '@ant-design/react-native/lib/list';
import InputItem from '@ant-design/react-native/lib/input-item';
import Button from '@ant-design/react-native/lib/button';
import { AntDesign } from '@expo/vector-icons';

import { InboxContext } from '../../context/InboxContext';
import { TaskProps } from '../Task/Task';

const styles = StyleSheet.create({
  wrapper: { flex: 1, width: '100%' },
  formWrapper: { width: '100%' },
  input: {},
  button: { marginTop: 10 },
  list: { width: '100%' },
});

export const Inbox: React.FC<NavigationScreenProps> & { navigationOptions: NavigationStackOptions } = ({
  navigation,
}) => {
  const { tasks, addTask } = React.useContext(InboxContext);

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ taskName: '' }}
        onSubmit={(values, { resetForm }) => {
          addTask(values.taskName);
          resetForm();
          Keyboard.dismiss();
        }}
      >
        {props => (
          <View style={styles.formWrapper}>
            <List>
              <InputItem
                style={styles.input}
                value={props.values.taskName}
                onChangeText={props.handleChange('taskName')}
                onBlur={props.handleBlur('taskName')}
                onSubmitEditing={() => props.handleSubmit()}
                placeholder={'Task name'}
              />
              <List.Item>
                <Button style={styles.button} onPress={props.handleSubmit} type="primary">
                  <AntDesign name="plus" /> {'Add'}
                </Button>
              </List.Item>
            </List>
          </View>
        )}
      </Formik>
      <List>
        {tasks.map(task => (
          <List.Item key={task.id} onPress={() => navigation.navigate('Task', { task } as TaskProps)}>
            {task.name}
          </List.Item>
        ))}
      </List>
    </View>
  );
};

Inbox.navigationOptions = {
  title: 'Inbox',
};
