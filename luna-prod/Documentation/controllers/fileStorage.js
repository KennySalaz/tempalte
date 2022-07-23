
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import firebaseApp from '../firebase';

const storage = getStorage(firebaseApp)


export const fileToBlob = async (path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob

}


export const firebaseStorage = async (file, nameCollecio, id) => {
    const result = { statusResponse: false, error: null, url: null }
    let proceso = 0
    try {
        const storageRef = ref(storage, `/${nameCollecio}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', (snapshot) => {
            const redondear = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            proceso = redondear
            /* setProgesso(redondear) */
        },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((urlfile) => {
                    result.statusResponse = true
                    result.url = urlfile
                })
            }
        )

    } catch (error) {
        result.error = alert(error)
    }
    return result
}