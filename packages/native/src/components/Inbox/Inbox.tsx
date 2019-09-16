import React, { FormEvent } from 'react';

import { Formik } from 'formik';
import { View, StyleSheet, Keyboard } from 'react-native';
import List from '@ant-design/react-native/lib/list';
import InputItem from '@ant-design/react-native/lib/input-item';
import Button from '@ant-design/react-native/lib/button';
import { AntDesign } from '@expo/vector-icons';
import { InboxContext } from '../../context/InboxContext';

const styles = StyleSheet.create({
  wrapper: { flex: 1, width: '100%' },
  formWrapper: { width: '100%' },
  input: {},
  button: { marginTop: 10 },
  list: { width: '100%' },
});

export const Inbox = () => {
  const { tasks, addTask, removeTask } = React.useContext(InboxContext);

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ task: '' }}
        onSubmit={(values, { resetForm }) => {
          addTask(values.task);
          resetForm();
          Keyboard.dismiss();
        }}
      >
        {props => (
          <View style={styles.formWrapper}>
            <List>
              <InputItem
                style={styles.input}
                value={props.values.task}
                onChangeText={props.handleChange('task')}
                onBlur={props.handleBlur('task')}
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
          <List.Item key={task} onPress={() => removeTask(task)} extra={<AntDesign name="minuscircle" />}>
            {task}
          </List.Item>
        ))}
      </List>
    </View>
  );
};
