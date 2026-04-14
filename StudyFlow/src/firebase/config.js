import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCpDJNz37mNKYSypPp2g26vvsF2wz1uhu0',
  authDomain: 'programsko-inzenjerstvo-70b32.firebaseapp.com',
  projectId: 'programsko-inzenjerstvo-70b32',
  storageBucket: 'programsko-inzenjerstvo-70b32.firebasestorage.app',
  messagingSenderId: '227365599547',
  appId: '1:227365599547:web:eff1df31396dd233e95f1e',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
