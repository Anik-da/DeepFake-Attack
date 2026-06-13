'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, VerificationHistoryItem } from '../types';
import { mockHistory } from '../lib/mockData';
import { auth, googleProvider, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile as fbUpdateProfile
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  history: VerificationHistoryItem[];
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, avatar?: string) => void;
  addToHistory: (item: Omit<VerificationHistoryItem, 'id' | 'timestamp' | 'status'>) => void;
  clearHistory: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<VerificationHistoryItem[]>([]);

  const fetchUserHistory = async (uid: string) => {
    try {
      const q = query(collection(db, 'users', uid, 'history'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const items: VerificationHistoryItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as VerificationHistoryItem);
      });
      
      // Seed default history on first register/empty state
      if (items.length === 0) {
        for (const item of mockHistory) {
          const docRef = doc(db, 'users', uid, 'history', item.id);
          await setDoc(docRef, item);
          items.push(item);
        }
      }
      setHistory(items);
    } catch (error) {
      console.error('Error fetching user history:', error);
      setHistory(mockHistory);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const customUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Anonymous',
          email: fbUser.email || '',
          avatar: fbUser.photoURL || undefined,
          role: 'user',
          createdAt: fbUser.metadata.creationTime 
            ? new Date(fbUser.metadata.creationTime).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0]
        };
        setUser(customUser);
        localStorage.setItem('tg_user', JSON.stringify(customUser));
        await fetchUserHistory(fbUser.uid);
      } else {
        setUser(null);
        localStorage.removeItem('tg_user');
        
        const savedHistory = localStorage.getItem('tg_history_guest');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        } else {
          setHistory(mockHistory);
          localStorage.setItem('tg_history_guest', JSON.stringify(mockHistory));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (error) {
      console.error('Google SSO error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await fbUpdateProfile(userCredential.user, {
          displayName: name
        });
        
        const currentUser = auth.currentUser;
        if (currentUser) {
          const customUser: User = {
            id: currentUser.uid,
            name: name,
            email: currentUser.email || '',
            avatar: currentUser.photoURL || undefined,
            role: 'user',
            createdAt: new Date().toISOString().split('T')[0]
          };
          setUser(customUser);
          localStorage.setItem('tg_user', JSON.stringify(customUser));
        }
      }
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (name: string, avatar?: string) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await fbUpdateProfile(currentUser, {
          displayName: name,
          photoURL: avatar || null
        });
        
        const updated: User = {
          id: currentUser.uid,
          name,
          email: currentUser.email || '',
          avatar: avatar || undefined,
          role: 'user',
          createdAt: user?.createdAt || new Date().toISOString().split('T')[0]
        };
        setUser(updated);
        localStorage.setItem('tg_user', JSON.stringify(updated));
      } catch (error) {
        console.error('Update profile error:', error);
      }
    }
  };

  const addToHistory = async (item: Omit<VerificationHistoryItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: VerificationHistoryItem = {
      ...item,
      id: 'TG-' + Math.floor(10000 + Math.random() * 90000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'completed'
    };
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid, 'history', newItem.id), newItem);
      } catch (error) {
        console.error('Error writing history to Firestore:', error);
      }
    } else {
      localStorage.setItem('tg_history_guest', JSON.stringify(updatedHistory));
    }
  };

  const clearHistory = async () => {
    setHistory([]);
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const uid = currentUser.uid;
        const q = collection(db, 'users', uid, 'history');
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map(d => 
          deleteDoc(doc(db, 'users', uid, 'history', d.id))
        );
        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Error clearing history from Firestore:', error);
      }
    } else {
      localStorage.setItem('tg_history_guest', JSON.stringify([]));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      history,
      login,
      loginWithGoogle,
      register,
      logout,
      updateProfile,
      addToHistory,
      clearHistory
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

