import React, {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface ModalContainerProps {
  children?: any;
  isModal?: boolean;
  containerMainStyle?: ViewStyle;
  onPress: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  isModal,
  containerMainStyle,
  onPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModal}
      onRequestClose={onPress}
      style={styles.container}>
      <TouchableOpacity
        style={[styles.containerMain, containerMainStyle && containerMainStyle]}
        onPressOut={onPress}
        activeOpacity={1}>
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMain: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
