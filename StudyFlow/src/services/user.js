import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const saveUserProfile = async (uid, { firstName, lastName, email }) => {
  await setDoc(
    doc(db, 'users', uid),
    {
      firstName,
      lastName,
      email,
    },
    { merge: true },
  )
}

export const getUserProfile = async (uid) => {
  const snapshot = await getDoc(doc(db, 'users', uid))
  if (!snapshot.exists()) return null
  return snapshot.data()
}
