export async function HandleErrorCatch(error) {
    console.log(error)
    switch (error) {
        case "Network request failed":
            return "Koneksi Tidak Tersedia";
            break
        default:
            return error;
    }
}