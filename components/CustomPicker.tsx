import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CustomPickerProps {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}

const CustomPicker: React.FC<CustomPickerProps> = ({ label, value, options, onValueChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TextInput
            label={label}
            value={value}
            mode="outlined"
            editable={false}
            style={styles.input}
            right={<TextInput.Icon icon="chevron-down" onPress={() => setVisible(true)} />}
          />
        }
        style={styles.menu}
      >
        {options.map((opt, index) => (
          <Menu.Item
            key={index}
            title={opt}
            onPress={() => {
              onValueChange(opt);
              setVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFF',
  },
  menu: {
    marginTop: 45,
  },
});

export default CustomPicker;
