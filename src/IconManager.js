import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Iconf from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'


import { scale } from './Util';

export const musica = (size, color) => <Icon name="md-musical-notes-outline" size={scale(size)} color={color} />
export const library = (name, size, color) => <Icon2 name={name} size={scale(size)} color={color} />
export const video = (size, color) => <Icon name="videocam-outline" size={scale(size)} color={color} />
export const setting = (size, color) => <Icon name="people-outline" size={scale(size)} color={color} />
export const shuffle = (size, color) => <Icon1 name={'shuffle'} color={color} size={scale(size)} />
export const left = (size, color) => <Icon1 name={'chevron-left'} color={color} size={scale(size)} />
export const leftVid = (name, size, color) => <Iconf name={name} color={color} size={scale(size)} />
export const repeat = (size, color) => <Icon1 name={'repeat'}  color={color} size={scale(size)} />
export const forward = (size, color) => <Icon1 name={'skip-forward'}  color={color} size={scale(size)} />
export const backward = (size, color) => <Icon1 name={'skip-back'}  color={color} size={scale(size)} />
export const share = (size, color) => <Icon1 name={'share-2'}  color={color} size={scale(size)} />
export const star = (size, color) => <Icon1 name={'star'}  color={color} size={scale(size)} />
export const play = (name, size, color) => <Icon name={name}  color={color} size={scale(size)} />
export const playM = (name, size, color) => <IconM name={name}  color={color} size={scale(size)} />
export const backgroundplayer = (name, size, color) => <Icon1 name={name}  color={color} size={scale(size)} />
export const icon = (name, size, color) => <Icon1 name={name}  color={color} size={scale(size)} />