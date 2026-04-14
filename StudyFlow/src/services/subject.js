import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { auth } from '../firebase/config'

export const addSubject = async (name) => {
  const user = auth.currentUser

  if (!user) throw new Error('User not logged in')

  return await addDoc(collection(db, 'users', user.uid, 'subjects'), {
    name: name,
    createdAt: new Date(),
  })
}
