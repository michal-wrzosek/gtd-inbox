import React from 'react';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import { AntDesign } from '@expo/vector-icons';

export const Menu = () => {
  return (
    <TabBar>
      <TabBar.Item title={'Inbox'} selected={true} icon={<AntDesign name="inbox" />} />
    </TabBar>
  );
};
