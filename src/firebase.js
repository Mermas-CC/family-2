






// src/context/GroupContext.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8wHwosJPji1ZvyrT4TXehyLYPo07JSZU",
    authDomain: "hola-6c239.firebaseapp.com",
    projectId: "hola-6c239",
    storageBucket: "hola-6c239.appspot.com",
    messagingSenderId: "960237234659",
    appId: "1:960237234659:web:86f5b3d213394675f898d6",
    measurementId: "G-4FK7QPYF04"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { auth, db, storage };
  
  export const checkUserGroup = async (userId) => {
      const q = query(collection(db, "users", userId, "groups"));
      const querySnapshot = await getDocs(q);
      const groups = [];
      querySnapshot.forEach((doc) => {
          groups.push({ id: doc.id, ...doc.data() });
      });
      return groups.length > 0 ? groups[0] : null;
  };
  
  export const createFamilyGroup = async (userId, groupName) => {
      const existingGroup = await checkUserGroup(userId);
      if (existingGroup) {
          throw new Error("User already has a group");
      }
      const globalGroupDocRef = await addDoc(collection(db, "groups"), {
          name: groupName,
          members: [userId]
      });
      const groupId = globalGroupDocRef.id;
      const userDocRef = doc(db, "users", userId);
      const userGroupsCollectionRef = collection(userDocRef, "groups");
      await addDoc(userGroupsCollectionRef, {
          name: groupName,
          id: groupId
      });
      return groupId;
  };
  
  export const joinFamilyGroup = async (userId, groupName) => {
      const q = query(collection(db, "groups"), where("name", "==", groupName));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
          throw new Error("Group not found");
      }
      const groupDoc = querySnapshot.docs[0];
      const groupId = groupDoc.id;
      const groupDocRef = doc(db, "groups", groupId);
      await updateDoc(groupDocRef, {
          members: arrayUnion(userId)
      });
      const userDocRef = doc(db, "users", userId);
      const userGroupsCollectionRef = collection(userDocRef, "groups");
      await addDoc(userGroupsCollectionRef, {
          name: groupName,
          id: groupId
      });
      return groupId;
  };
  
  export const getGroupMembers = async (groupId) => {
      const groupDocRef = doc(db, "groups", groupId);
      const groupDoc = await getDoc(groupDocRef);
      const members = groupDoc.data().members;
      const memberDetails = await Promise.all(members.map(async (memberId) => {
          const memberDocRef = doc(db, "users", memberId);
          const memberDoc = await getDoc(memberDocRef);
          return { id: memberDoc.id, ...memberDoc.data() };
      }));
      return memberDetails;
  };
  
  export const addMemory = async (userId, groupId, memory) => {
      const docRef = await addDoc(collection(db, `groups/${groupId}/memories`), memory);
      return docRef.id;
  };
  
  export const getMemories = async (userId, groupId) => {
      const q = query(collection(db, `groups/${groupId}/memories`));
      const querySnapshot = await getDocs(q);
      const memories = [];
      querySnapshot.forEach((doc) => {
          memories.push({ id: doc.id, ...doc.data() });
      });
      return memories;
  };
  
  export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };
  
  export const addPhoto = async (groupId, title, description, date, imageUrl) => {
    await addDoc(collection(db, `groups/${groupId}/photos`), {
      title,
      description,
      date,
      imageUrl
    });
  };
  
  export const getPhotos = async (groupId) => {
    const photoCollection = collection(db, `groups/${groupId}/photos`);
    const photoSnapshot = await getDocs(photoCollection);
    const photoList = photoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return photoList;
  };
  
  export const getPhoto = async (groupId, photoId) => {
    const photoDoc = doc(db, `groups/${groupId}/photos/${photoId}`);
    const photoSnapshot = await getDoc(photoDoc);
    if (photoSnapshot.exists()) {
      return photoSnapshot.data();
    } else {
      throw new Error('Photo not found');
    }
  };