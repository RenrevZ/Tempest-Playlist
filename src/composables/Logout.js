import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const error = ref(null)
const isLoading = ref(false)

// logout function
const logout = async () => {
  error.value = null
  const isLoading = true
  try {
    await projectAuth.signOut()
    const isLoading = false
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    const isLoading = false
  }
}

const Logout = () => {
  return { error, logout,isLoading }
}

export default Logout