






// src/context/GroupContext.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

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
  
  export { auth, db };
  
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
    try {
      const existingGroup = await checkUserGroup(userId);
      if (existingGroup) {
        throw new Error("User already has a group");
      }
      console.log(`Creating group for user ${userId} with name ${groupName}`);
  
      // Crear el grupo en la colección global `groups`
      const globalGroupDocRef = await addDoc(collection(db, "groups"), {
        name: groupName,
        members: [userId]
      });
      const groupId = globalGroupDocRef.id;
  
      // Crear la referencia del grupo en la colección específica del usuario
      const userDocRef = doc(db, "users", userId);
      const userGroupsCollectionRef = collection(userDocRef, "groups");
      await addDoc(userGroupsCollectionRef, {
        name: groupName,
        id: groupId
      });
  
      console.log('Group created with ID: ', groupId);
      return groupId;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };
  
  export const joinFamilyGroup = async (userId, groupName) => {
    try {
      // Find the group by name in the global collection `groups`
      const q = query(collection(db, "groups"), where("name", "==", groupName));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("Group not found");
      }
  
      const groupDoc = querySnapshot.docs[0];
      const groupId = groupDoc.id;
  
      // Add the user to the group members
      const groupDocRef = doc(db, "groups", groupId);
      await updateDoc(groupDocRef, {
        members: arrayUnion(userId)
      });
  
      // Link the group to the user
      const userDocRef = doc(db, "users", userId);
      const userGroupsCollectionRef = collection(userDocRef, "groups");
      await addDoc(userGroupsCollectionRef, {
        name: groupName,
        id: groupId
      });
  
      return groupId;
    } catch (e) {
      console.error('Error joining group: ', e);
      throw e;
    }
  };
  
  export const getGroupMembers = async (groupId) => {
    try {
      const groupDocRef = doc(db, "groups", groupId);
      const groupDoc = await getDoc(groupDocRef);
      const members = groupDoc.data().members;
  
      // Obtener detalles de cada miembro
      const memberDetails = await Promise.all(members.map(async (memberId) => {
        const memberDocRef = doc(db, "users", memberId);
        const memberDoc = await getDoc(memberDocRef);
        return { id: memberDoc.id, ...memberDoc.data() };
      }));
  
      return memberDetails;
    } catch (e) {
      console.error('Error getting group members: ', e);
      throw e;
    }
  };
  
  export const addMemory = async (userId, groupId, memory) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/groups/${groupId}/memories`), memory);
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };
  
  export const getMemories = async (userId, groupId) => {
    try {
      const q = query(collection(db, `users/${userId}/groups/${groupId}/memories`));
      const querySnapshot = await getDocs(q);
      const memories = [];
      querySnapshot.forEach((doc) => {
        memories.push({ id: doc.id, ...doc.data() });
      });
      return memories;
    } catch (e) {
      console.error('Error getting documents: ', e);
      throw e;
    }
  };