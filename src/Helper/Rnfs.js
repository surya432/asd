import RNFS from 'react-native-fs'
import { Platform } from 'react-native'
const rootPath = (Platform.OS == "android") ? RNFS.DocumentDirectoryPath : RNFS.MainBundlePath
export async function writeFiles(filename, content) {
    console.log(rootPath)
    var path = rootPath + '/' + filename + ".txt";
    if (RNFS.exists(path)) {
        return await RNFS.writeFile(path, content).then(() => {
            console.log('FILE WRITTEN!');
            return true;
        }).catch((err) => {
            console.log(err.message);
            return false;
        });
    } else {
        return await RNFS.unlink(path)
            .then(() => {
                RNFS.writeFile(path, content).then(() => {
                    console.log('FILE WRITTEN!');
                    return true;
                }).catch((err) => {
                    console.log(err.message);
                    return false;
                });
            })
    }
}
export async function readFiles(filename) {
    var path = rootPath + '/' + filename + ".txt";
    var content = await RNFS.readFile(path);
    return content;
}
export async function deleteFiles(filename) {
    var path = rootPath + '/' + filename + ".txt";
    await RNFS.unlink(path);
}