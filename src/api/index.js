import { FIREBASE_KEY } from '../config'

export const urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`
export const urlLogin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`
export const urlChangePassword = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_KEY}`
