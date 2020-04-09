import NetInfo from "@react-native-community/netinfo";
import BackgroundJob from 'react-native-background-job';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import { ServiceTaskListFilter } from './../services/ServiceTaskListFilter';
function randomNumber(min, max) {
    console.log(Math.random() * (max - min) + min)
    return Math.random() * (max - min) + min;
}
export default CheckConnectivity = async () => {
    // BackgroundTimer.runBackgroundTimer(() => {
    //     //code that will be called every 3 seconds 
    //     checkInet()
    // },
    //     randomNumber(1000 * 60 * 8, 1000 * 60 * 15)
    // );
    BackgroundJob.cancelAll()
        .then(() => {
            const backgroundJob = {
                jobKey: "myJob",
                job: () => {
                    console.log("backgroudjob")
                    checkInet()
                }
            };
            BackgroundJob.register(backgroundJob);
            var backgroundSchedule = {
                jobKey: "myJob",
                timeout: 1000,
                exact: true
            }
            BackgroundJob.schedule(backgroundSchedule)
                .then(() => console.log("Success Schedule"))
                .catch((err) => console.log(err));
            console.log("Success Cancel")
        })
        .catch(err => console.log(err));

};
const checkInet = async () => {
    NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if (state.isConnected) {
            _calldata()
        }
    });
}
const _calldata = async () => {
    try {
        const dataUser = await AsyncStorage.getItem('dataUser')
            .then((result) => JSON.parse(result))
        const dataList = await ServiceTaskListFilter(null, "taskAll/" + dataUser.id)
        if (dataList.kode == 1) {
            console.log("ok")
            await AsyncStorage.setItem('dataUserTask', JSON.stringify(dataList.data))
        } else {
            console.log(dataList.keterangan)
        }
    } catch (error) {
        console.log("_calldata" + error)
    }
}