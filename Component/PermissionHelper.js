import {PermissionsAndroid} from 'react-native';

const requestStoragePermission = async () => {
    try {
        return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    } catch (err) {
        notifyError(err);
    }
};

const isStoragePermissionGranted = () => {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
};

const requestLocationPermission = async () => {
    try {
        return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } catch (err) {
        notifyError(err);
    }
};

const isLocationPermissionGranted = () => {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
};




const Storage = {
    requestStoragePermission,
    isStoragePermissionGranted,
    requestLocationPermission,
    isLocationPermissionGranted
};


const PermissionHelper = {
    Storage
};

export default PermissionHelper;