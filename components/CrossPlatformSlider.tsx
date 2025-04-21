// components/CrossPlatformSlider.tsx
import React from 'react';
import { Platform } from 'react-native';
import SliderNative from '@react-native-community/slider';

type Props = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
};

export default function CrossPlatformSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 10,
  step = 1,
}: Props) {
  if (Platform.OS === 'web') {
    return (
      <input
        type="range"
        min={minimumValue}
        max={maximumValue}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
    );
  }

  return (
    <SliderNative
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
    />
  );
}
