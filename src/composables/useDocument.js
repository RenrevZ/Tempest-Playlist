import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const useDocument = (collection,id) => {
    const error = ref(null)
    const isLoading = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {  
        isLoading.value = false
        error.value = null

        try{
            const response =  await docRef.delete()
            isLoading.value = false
            return response
        }catch(error){
            console.log(err.message)
            isLoading.value = false
            error.value = 'could not delete the document'
        }
    }

    const updateDoc = async (updates) => {
        isLoading.value = false
        error.value = null
    
        try{
            const response =  await docRef.update(updates)
            isLoading.value = false
            return response
        }catch(error){
            console.log(err.message)
            isLoading.value = false
            error.value = 'could not update the document'
        }
    }


    return {error,isLoading,deleteDoc,updateDoc}
}




export default useDocument