'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseReal } from '@/lib/firebaseClient';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial state from localStorage and sync with Supabase if active
  useEffect(() => {
    // 1. Get Category
    const savedCat = localStorage.getItem('oh_category');
    if (savedCat) {
      setSelectedCategory(savedCat);
    } else {
      // Prompt selection if they don't have one selected yet
      setIsCategoryModalOpen(true);
    }

    // 2. Get Bookmarks
    const savedBookmarks = localStorage.getItem('oh_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }

    // 3. Firebase Auth listener
    let unsubscribe;
    if (isFirebaseReal()) {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Student',
            email: firebaseUser.email
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      // Mock session check
      const mockSession = localStorage.getItem('oh_mock_user');
      if (mockSession) {
        try {
          setUser(JSON.parse(mockSession));
        } catch (e) {}
      }
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Sync bookmarks to localStorage whenever they change
  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem('oh_bookmarks', JSON.stringify(bookmarks));
    } else {
      localStorage.removeItem('oh_bookmarks');
    }
  }, [bookmarks]);

  // Handle Category Select
  const selectCategory = (categoryKey) => {
    setSelectedCategory(categoryKey);
    if (categoryKey) {
      localStorage.setItem('oh_category', categoryKey);
    } else {
      localStorage.removeItem('oh_category');
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (itemType, itemId, itemData) => {
    setBookmarks((prev) => {
      const exists = prev.find(b => b.id === itemId && b.type === itemType);
      if (exists) {
        // Remove
        return prev.filter(b => !(b.id === itemId && b.type === itemType));
      } else {
        // Add
        return [...prev, { id: itemId, type: itemType, data: itemData, savedAt: new Date().toISOString() }];
      }
    });
  };

  const isBookmarked = (itemType, itemId) => {
    return bookmarks.some(b => b.id === itemId && b.type === itemType);
  };

  // Firebase / Mock Authentication Functions
  const mockLogin = async (email, name) => {
    if (isFirebaseReal()) {
      // Create a dummy password derived from email to keep the frictionless name/email login UI
      const dummyPassword = `pb-${email.replace(/[^a-zA-Z0-9]/g, '')}-123`;
      try {
        let userCredential;
        try {
          userCredential = await signInWithEmailAndPassword(auth, email, dummyPassword);
        } catch (error) {
          // If the user does not exist or has invalid credential/email, attempt registration
          if (
            error.code === 'auth/user-not-found' || 
            error.code === 'auth/invalid-credential' || 
            error.code === 'auth/invalid-email'
          ) {
            userCredential = await createUserWithEmailAndPassword(auth, email, dummyPassword);
            await updateProfile(userCredential.user, { displayName: name });
          } else {
            throw error;
          }
        }
        setUser({
          id: userCredential.user.uid,
          name: userCredential.user.displayName || name,
          email: userCredential.user.email
        });
      } catch (err) {
        console.error("Firebase auth error:", err);
        alert(`Authentication failed: ${err.message}`);
      }
    } else {
      const mockUser = { id: 'mock-u1', name, email, category: selectedCategory };
      setUser(mockUser);
      localStorage.setItem('oh_mock_user', JSON.stringify(mockUser));
    }
  };

  const logout = async () => {
    if (isFirebaseReal()) {
      await signOut(auth);
    } else {
      localStorage.removeItem('oh_mock_user');
      setUser(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        selectCategory,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
        user,
        mockLogin,
        logout,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
