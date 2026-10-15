import React, { createContext, useContext, useState, useEffect } from 'react';
import { roomsData as initialRooms } from '../data/rooms';
import { housematesData as initialHousemates } from '../data/housemates';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Rooms state with potential user posted rooms
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem('roommate_custom_rooms');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialRooms];
      }
    } catch (e) {
      console.error(e);
    }
    return initialRooms;
  });

  const [housemates] = useState(initialHousemates);

  // Favorites state
  const [favoriteRoomIds, setFavoriteRoomIds] = useState(() => {
    try {
      const saved = localStorage.getItem('roommate_fav_rooms');
      return saved ? JSON.parse(saved) : ['room-1', 'room-3'];
    } catch (e) {
      return ['room-1', 'room-3'];
    }
  });

  const [favoriteHousemateIds, setFavoriteHousemateIds] = useState(() => {
    try {
      const saved = localStorage.getItem('roommate_fav_housemates');
      return saved ? JSON.parse(saved) : ['hm-1'];
    } catch (e) {
      return ['hm-1'];
    }
  });

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Active interactive modal state
  const [modalData, setModalData] = useState({
    isOpen: false,
    type: '', // 'contact-owner', 'send-message', 'connect', 'auth-login', 'auth-signup'
    title: '',
    targetName: '',
    targetItem: null
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('roommate_fav_rooms', JSON.stringify(favoriteRoomIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteRoomIds]);

  useEffect(() => {
    try {
      localStorage.setItem('roommate_fav_housemates', JSON.stringify(favoriteHousemateIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteHousemateIds]);

  // Toast trigger helper
  const showToast = (message, type = 'success', icon = 'bi-check-circle-fill') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle favorite room
  const toggleFavoriteRoom = (roomId) => {
    setFavoriteRoomIds((prev) => {
      const exists = prev.includes(roomId);
      if (exists) {
        showToast('Room removed from saved favorites', 'info', 'bi-bookmark-x');
        return prev.filter((id) => id !== roomId);
      } else {
        showToast('Room added to saved favorites!', 'success', 'bi-heart-fill');
        return [...prev, roomId];
      }
    });
  };

  // Toggle favorite housemate
  const toggleFavoriteHousemate = (hmId) => {
    setFavoriteHousemateIds((prev) => {
      const exists = prev.includes(hmId);
      if (exists) {
        showToast('Housemate removed from saved list', 'info', 'bi-person-dash');
        return prev.filter((id) => id !== hmId);
      } else {
        showToast('Housemate profile saved to favorites!', 'success', 'bi-heart-fill');
        return [...prev, hmId];
      }
    });
  };

  // Add new posted room
  const addRoom = (newRoom) => {
    const formattedRoom = {
      ...newRoom,
      id: `room-custom-${Date.now()}`,
      featured: false,
      rating: 5.0,
      reviewsCount: 1,
      currentHousemates: []
    };

    setRooms((prev) => {
      const updated = [formattedRoom, ...prev];
      try {
        const customRooms = updated.filter((r) => r.id.startsWith('room-custom-'));
        localStorage.setItem('roommate_custom_rooms', JSON.stringify(customRooms));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    showToast('Your room listing has been created successfully!', 'success', 'bi-check-circle-fill');
  };

  // Open generic action modal
  const openModal = (type, title, targetName, targetItem = null) => {
    setModalData({
      isOpen: true,
      type,
      title,
      targetName,
      targetItem
    });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        housemates,
        favoriteRoomIds,
        favoriteHousemateIds,
        toggleFavoriteRoom,
        toggleFavoriteHousemate,
        addRoom,
        toasts,
        showToast,
        removeToast,
        modalData,
        openModal,
        closeModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
