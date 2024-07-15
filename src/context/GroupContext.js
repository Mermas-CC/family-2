// src/context/GroupContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { createFamilyGroup, addMemory, getMemories, checkUserGroup, joinFamilyGroup, getGroupMembers } from '../firebase';

const GroupContext = createContext();

export function useGroup() {
  return useContext(GroupContext);
}

export function GroupProvider({ children }) {
  const { currentUser } = useAuth();
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentGroupName, setCurrentGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchGroup = async () => {
        const group = await checkUserGroup(currentUser.uid);
        if (group) {
          setCurrentGroup(group.id);
          setCurrentGroupName(group.name);
          const members = await getGroupMembers(group.id);
          setGroupMembers(members);
        } else {
          setCurrentGroup(null);
          setCurrentGroupName('');
          setGroupMembers([]);
        }
      };
      fetchGroup();
    } else {
      setCurrentGroup(null);
      setCurrentGroupName('');
      setGroupMembers([]);
    }
  }, [currentUser]);

  const createGroup = async (groupName) => {
    try {
      if (!currentUser) throw new Error("User is not logged in");
      const groupId = await createFamilyGroup(currentUser.uid, groupName);
      setCurrentGroup(groupId);
      setCurrentGroupName(groupName);
      const members = await getGroupMembers(groupId);
      setGroupMembers(members);
      return { groupId, groupName };
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  const joinGroup = async (groupName) => {
    try {
      if (!currentUser) throw new Error("User is not logged in");
      const groupId = await joinFamilyGroup(currentUser.uid, groupName);
      setCurrentGroup(groupId);
      setCurrentGroupName(groupName);
      const members = await getGroupMembers(groupId);
      setGroupMembers(members);
      return { groupId, groupName };
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  };

  const addMemoryToGroup = async (memory) => {
    if (currentGroup) {
      await addMemory(currentUser.uid, currentGroup, memory);
    }
  };

  const fetchMemories = async () => {
    if (currentGroup) {
      return await getMemories(currentUser.uid, currentGroup);
    }
    return [];
  };

  const value = {
    currentGroup,
    currentGroupName,
    groupMembers,
    setGroupMembers, // Asegurarse de que setGroupMembers esté en el valor del contexto
    createGroup,
    joinGroup,
    addMemoryToGroup,
    fetchMemories,
  };

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  );
}
