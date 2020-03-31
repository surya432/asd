import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import Notification from "@react-native-firebase/app"
const FCMService = async () => {
    CheckPermissionAndReturnFcmToken()
        .then((fcmToken) => {
            // createNotificationListeners()

        })
        .catch((error) => {
            console.log("Error Check Permission ", error)
        });
}

const ReturnFcmToken = () => new Promise(async (resolve) => {
    try {
        const fcmToken = await firebase.messaging().getToken();
        // you can put here some logic like storing fcmToken in sharedpreferences
        resolve(fcmToken);
    } catch (err) {
        reject(err);
    }
});

const RequestPermission = () => new Promise(async (resolve, reject) => {
    try {
        await firebase.messaging().requestPermission();
        resolve();
    } catch (error) {
        // User has rejected permissions
        reject(error);
    }
})

const CheckPermissionAndReturnFcmToken = () => new Promise(async (resolve, reject) => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        const fcmToken = await ReturnFcmToken();
        await AsyncStorage.setItem("fcmToken", fcmToken);
        const token = await AsyncStorage.getItem("fcmToken")
        resolve(fcmToken);
    } else {
        try {
            await RequestPermission();
            const fcmToken = await ReturnFcmToken();
            await AsyncStorage.setItem("fcmToken", fcmToken);
            const token = await AsyncStorage.getItem("fcmToken")
            resolve(fcmToken);
        } catch (e) {
            reject(e);
        }
    }
});

const createNotificationListeners = () => new Promise(async (resolve, reject) => {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log(notification)
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log(notificationOpen.notification)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log(notificationOpen.notification);

    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));
    });

});




export default FCMService
