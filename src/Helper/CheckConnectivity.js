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
    BackgroundTimer.runBackgroundTimer(() => {
        //code that will be called every 3 seconds 
        checkInet()
    },
        randomNumber(1000 * 60 * 8, 1000 * 60 * 15)
    );
    // BackgroundTimer.runBackgroundTimer(() => {
    //     //code that will be called every 3 seconds 
    //     checkInet()
    // },
    //     8000
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
            // await AsyncStorage.setItem('dataUserTask', JSON.stringify(dataList.data))
            const dataUser = await AsyncStorage.getItem('dataUserTask')
            const dataUserJsonlocal = await JSON.parse(dataUser);
            if (dataList.data != null && dataList.data.length > 0) {
                console.log("data dari Server " + dataList.data.length)
                // array check Update
                // for (let i = 0; i < dataList.data.length; i++) {
                //     var indexUpdate = await dataUserJsonlocal.findIndex((x) => (x.id == dataList.data[i].id));
                //     if (indexUpdate > -1) {
                //         if (JSON.stringify(dataList.data[i]) != JSON.stringify(dataUserJsonlocal[indexUpdate])) {
                //             if (dataList.data[i].delete_at != null) {
                //                 dataUserJsonlocal.splice(indexUpdate, 1);
                //             } else {
                //                 dataUserJsonlocal[indexUpdate] = dataList.data[i]
                //             }
                //         }
                //     }
                // }
                // remove & add  data array
                let dataArray = [];
                for (let i = 0; i < dataList.data.length; i++) {
                    // console.log(dataUserJsonlocal.includes(dataList.data[i])); //true
                    if (dataUserJsonlocal.filter(x => x.id == dataList.data[i].id).length > 0) {
                        dataArray.push(dataList.data[i])
                    } else {
                        dataArray.push(dataList.data[i])
                    }

                }
                await AsyncStorage.setItem('dataUserTask', JSON.stringify(dataArray))
            } else {
                await AsyncStorage.setItem('dataUserTask', "[]")
            }
        } else {
            await AsyncStorage.setItem('dataUserTask', "[]")
            console.log(dataList.keterangan)
        }
    } catch (error) {
        console.log("_calldata " + error)
    }
}