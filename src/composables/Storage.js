import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "@/composables/getUser";

const { user } = getUser()

const Storage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async(file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try{
          const response = await storageRef.put(file)
          url.value = await response.ref.getDownloadURL()
        }catch(err){
            console.log(err.message)
            error.value = err.message
        }
    }

    return {url,filePath,error, uploadImage}
}

export default Storage