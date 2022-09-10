import * as React from 'react';
import {runOnJS} from 'react-native-reanimated';

import {StyleSheet, Text} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';

import {Camera} from 'react-native-vision-camera';
import {scanFaces, Face} from 'vision-camera-face-detector';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [faces, setFaces] = React.useState();

  const devices = useCameraDevices();
  const device = devices.front;

  React.useEffect(() => {
    console.log(faces);
  }, [faces]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  });

  return device != null && hasPermission ? (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
  ) : (
    <Text>hello</Text>
  );
}

const data = [
  {
    bounds: {
      boundingCenterX: 352,
      boundingCenterY: 785,
      boundingExactCenterX: 352,
      boundingExactCenterY: 785.5,
      height: 371,
      width: 372,
      x: 176,
      y: 807.25,
    },
    contours: {
      FACE: [Array],
      LEFT_CHEEK: [Array],
      LEFT_EYE: [Array],
      LEFT_EYEBROW_BOTTOM: [Array],
      LEFT_EYEBROW_TOP: [Array],
      LOWER_LIP_BOTTOM: [Array],
      LOWER_LIP_TOP: [Array],
      NOSE_BOTTOM: [Array],
      NOSE_BRIDGE: [Array],
      RIGHT_CHEEK: [Array],
      RIGHT_EYE: [Array],
      RIGHT_EYEBROW_BOTTOM: [Array],
      RIGHT_EYEBROW_TOP: [Array],
      UPPER_LIP_BOTTOM: [Array],
      UPPER_LIP_TOP: [Array],
    },
    leftEyeOpenProbability: 0.9933371543884277,
    pitchAngle: 6.193233013153076,
    rightEyeOpenProbability: 0.994285523891449,
    rollAngle: 0.38453036546707153,
    smilingProbability: 0.006722430698573589,
    yawAngle: -8.473143577575684,
  },
];
