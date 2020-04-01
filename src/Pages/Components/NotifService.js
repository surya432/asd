import PushNotification from 'react-native-push-notification';
import FCMService from "./FCMService";
import AsyncStorage from '@react-native-community/async-storage';

export default class NotifService {

    constructor(onRegister, onNotification) {
        FCMService().then(
            () => {
                const token = AsyncStorage.getItem("fcmToken")
            }).then((token) => {
                this.configure(onRegister, onNotification, token);
                this.lastId = 0;
            })
    }

    configure(onRegister, onNotification, gcm = "") {

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: onRegister, //this._onRegister.bind(this),
            // (required) Called when a remote or local notification is opened or received
            onNotification: onNotification, //this._onNotification,
            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: gcm,
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
    }

    localNotif() {
        this.lastId++;
        PushNotification.localNotification({
            /* Android Only Properties */
            id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
            subText: "This is a subText", // (optional) default: none
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            /* iOS only properties */
            alertAction: 'view', // (optional) default: view
            category: null, // (optional) default: null
            userInfo: null, // (optional) default: null (object containing additional notification data)

            /* iOS and Android properties */
            action_data: "SendNotifikasiLokal",

            title: "Local Notification", // (optional)
            message: "My Notification Message", // (required)
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            //actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        });
    }

    scheduleNotif() {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + (5 * 1000)), // in 30 secs

            /* Android Only Properties */
            id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            ticker: "My Notification Ticker", // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
            subText: "This is a subText", // (optional) default: none
            color: "blue", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification

            /* iOS only properties */
            action_data: "SendNotifikasiLokal",
            alertAction: 'view', // (optional) default: view
            category: null, // (optional) default: null
            userInfo: null, // (optional) default: null (object containing additional notification data)

            /* iOS and Android properties */
            title: "Scheduled Notification", // (optional)
            message: "My Notification Message", // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }

    checkPermission(cbk) {
        return PushNotification.checkPermissions(cbk);
    }

    cancelNotif() {
        PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }

}

export function handlePerm(perms) {
    console.log("perms " + perms)
}
export function onNotif(notif) {
    console.log("notif " + JSON.stringify(notif));
    if ('action_data' in notif) {
        this.props.navigation.navigate(notif.action_data, { DATA: JSON.stringify(notif) })
    }
}
export function onRegister(token) {
    console.log("token " + token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
}
export async function getTokenFCM() {
    const token = await AsyncStorage.getItem("fcmToken")
    console.log("TOKEN FCM =  " + token)
}