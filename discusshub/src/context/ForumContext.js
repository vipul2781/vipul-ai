import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPosts } from '../data/posts';
import { initialCommunities } from '../data/communities';
import { initialUsers } from '../data/users';
import { initialComments } from '../data/comments';
import { initialNotifications } from '../data/notifications';
import { initialCategories } from '../data/categories';
import { initialReportedPosts, initialReportedComments, initialBannedUsers, initialModLog } from '../data/moderation';

const ForumContext = createContext();

export const useForum = () => useContext(ForumContext);

export const ForumProvider = ({ children }) => {
  // Current logged in dummy user
  const currentUser = initialUsers[0]; // Rahul Sharma

  // Posts State
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('discusshub_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  // Communities State
  const [communities, setCommunities] = useState(() => {
    const saved = localStorage.getItem('discusshub_communities');
    return saved ? JSON.parse(saved) : initialCommunities;
  });

  // Users State
  const [users] = useState(initialUsers);

  // Comments State
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('discusshub_comments');
    return saved ? JSON.parse(saved) : initialComments;
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('discusshub_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Saved Posts (IDs or post objects in localStorage)
  const [savedPostIds, setSavedPostIds] = useState(() => {
    const saved = localStorage.getItem('discusshub_saved_post_ids');
    return saved ? JSON.parse(saved) : ['post-1', 'post-3', 'post-7'];
  });

  // Saved Comments
  const [savedCommentIds, setSavedCommentIds] = useState(() => {
    const saved = localStorage.getItem('discusshub_saved_comment_ids');
    return saved ? JSON.parse(saved) : ['c-1', 'c-4'];
  });

  // Following user IDs
  const [followingUserIds, setFollowingUserIds] = useState(() => {
    const saved = localStorage.getItem('discusshub_following_users');
    return saved ? JSON.parse(saved) : ['priya_patel', 'alex_chen'];
  });

  // User votes tracking: { [postId]: 1 | -1 | 0 }
  const [userPostVotes, setUserPostVotes] = useState(() => {
    const saved = localStorage.getItem('discusshub_user_post_votes');
    return saved ? JSON.parse(saved) : { 'post-1': 1, 'post-2': 1 };
  });

  // User comment votes tracking: { [commentId]: 1 | -1 | 0 }
  const [userCommentVotes, setUserCommentVotes] = useState(() => {
    const saved = localStorage.getItem('discusshub_user_comment_votes');
    return saved ? JSON.parse(saved) : { 'c-1': 1 };
  });

  // Moderation state
  const [reportedPosts, setReportedPosts] = useState(initialReportedPosts);
  const [reportedComments, setReportedComments] = useState(initialReportedComments);
  const [bannedUsers, setBannedUsers] = useState(initialBannedUsers);
  const [modLog, setModLog] = useState(initialModLog);

  // Global Toast Alert State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('discusshub_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('discusshub_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('discusshub_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('discusshub_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('discusshub_saved_post_ids', JSON.stringify(savedPostIds));
  }, [savedPostIds]);

  useEffect(() => {
    localStorage.setItem('discusshub_saved_comment_ids', JSON.stringify(savedCommentIds));
  }, [savedCommentIds]);

  useEffect(() => {
    localStorage.setItem('discusshub_following_users', JSON.stringify(followingUserIds));
  }, [followingUserIds]);

  useEffect(() => {
    localStorage.setItem('discusshub_user_post_votes', JSON.stringify(userPostVotes));
  }, [userPostVotes]);

  useEffect(() => {
    localStorage.setItem('discusshub_user_comment_votes', JSON.stringify(userCommentVotes));
  }, [userCommentVotes]);

  // VOTE ON POST
  const votePost = (postId, direction) => {
    const currentVote = userPostVotes[postId] || 0;
    let newVote = 0;
    let voteDiff = 0;

    if (currentVote === direction) {
      // Toggle off
      newVote = 0;
      voteDiff = -direction;
    } else {
      // New vote direction
      newVote = direction;
      voteDiff = direction - currentVote;
    }

    setUserPostVotes(prev => ({ ...prev, [postId]: newVote }));
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, votes: p.votes + voteDiff } : p))
    );
  };

  // VOTE ON COMMENT
  const voteComment = (commentId, direction) => {
    const currentVote = userCommentVotes[commentId] || 0;
    let newVote = 0;
    let voteDiff = 0;

    if (currentVote === direction) {
      newVote = 0;
      voteDiff = -direction;
    } else {
      newVote = direction;
      voteDiff = direction - currentVote;
    }

    setUserCommentVotes(prev => ({ ...prev, [commentId]: newVote }));

    // Recursive helper to update nested comments
    const updateVoteInTree = (list) => {
      return list.map(item => {
        if (item.id === commentId) {
          return { ...item, votes: (item.votes || 0) + voteDiff };
        }
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: updateVoteInTree(item.replies) };
        }
        return item;
      });
    };

    setComments(prev => updateVoteInTree(prev));
  };

  // TOGGLE SAVE POST
  const toggleSavePost = (postId) => {
    if (savedPostIds.includes(postId)) {
      setSavedPostIds(prev => prev.filter(id => id !== postId));
      showToast('Removed from saved posts', 'info');
    } else {
      setSavedPostIds(prev => [...prev, postId]);
      showToast('Post saved successfully!', 'success');
    }
  };

  // TOGGLE SAVE COMMENT
  const toggleSaveComment = (commentId) => {
    if (savedCommentIds.includes(commentId)) {
      setSavedCommentIds(prev => prev.filter(id => id !== commentId));
      showToast('Removed comment from saved list', 'info');
    } else {
      setSavedCommentIds(prev => [...prev, commentId]);
      showToast('Comment saved to your bookmarks!', 'success');
    }
  };

  // TOGGLE JOIN COMMUNITY
  const toggleJoinCommunity = (communityId) => {
    setCommunities(prev =>
      prev.map(c => {
        if (c.id === communityId) {
          const joined = !c.isJoined;
          showToast(
            joined ? `Joined r/${c.name}!` : `Left r/${c.name}`,
            joined ? 'success' : 'info'
          );
          return {
            ...c,
            isJoined: joined,
            membersCount: joined ? c.membersCount + 1 : c.membersCount - 1
          };
        }
        return c;
      })
    );
  };

  // TOGGLE FOLLOW USER
  const toggleFollowUser = (userId) => {
    if (followingUserIds.includes(userId)) {
      setFollowingUserIds(prev => prev.filter(id => id !== userId));
      showToast(`Unfollowed @${userId}`, 'info');
    } else {
      setFollowingUserIds(prev => [...prev, userId]);
      showToast(`Following @${userId}!`, 'success');
    }
  };

  // ADD NEW POST
  const addPost = (newPostData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      votes: 1,
      commentsCount: 0,
      createdAt: 'Just now',
      timestamp: Date.now(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar
      },
      ...newPostData
    };

    setPosts(prev => [newPost, ...prev]);

    // Also update community post count
    if (newPostData.communityId) {
      setCommunities(prev =>
        prev.map(c =>
          c.id === newPostData.communityId
            ? { ...c, postsCount: c.postsCount + 1 }
            : c
        )
      );
    }

    showToast('Your post has been published successfully!', 'success');
    return newPost;
  };

  // ADD COMMENT OR REPLY
  const addComment = (postId, content, parentId = null) => {
    const newComment = {
      id: `c-${Date.now()}`,
      postId,
      parentId,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar
      },
      content,
      votes: 1,
      createdAt: 'Just now',
      timestamp: Date.now(),
      replies: []
    };

    if (!parentId) {
      setComments(prev => [newComment, ...prev]);
    } else {
      const insertReply = (list) => {
        return list.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              replies: [...(item.replies || []), newComment]
            };
          }
          if (item.replies && item.replies.length > 0) {
            return {
              ...item,
              replies: insertReply(item.replies)
            };
          }
          return item;
        });
      };
      setComments(prev => insertReply(prev));
    }

    // Increment post commentsCount
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p
      )
    );

    showToast('Your comment has been added.', 'success');
  };

  // DELETE DUMMY COMMENT
  const deleteComment = (commentId, postId) => {
    const filterComment = (list) => {
      return list
        .filter(item => item.id !== commentId)
        .map(item => {
          if (item.replies && item.replies.length > 0) {
            return { ...item, replies: filterComment(item.replies) };
          }
          return item;
        });
    };

    setComments(prev => filterComment(prev));
    if (postId) {
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, commentsCount: Math.max(0, (p.commentsCount || 1) - 1) }
            : p
        )
      );
    }
    showToast('Comment deleted', 'info');
  };

  // ADD NEW COMMUNITY
  const addCommunity = (communityData) => {
    const newCommunity = {
      id: communityData.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      slug: communityData.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      membersCount: 1,
      onlineCount: 1,
      postsCount: 0,
      postsThisWeek: 0,
      createdAt: 'Just now',
      isJoined: true,
      moderators: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: 'Creator & Lead Moderator',
          avatar: currentUser.avatar
        }
      ],
      ...communityData
    };

    setCommunities(prev => [newCommunity, ...prev]);
    showToast('Community created successfully!', 'success');
    return newCommunity;
  };

  // NOTIFICATIONS HELPERS
  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // MODERATION ACTIONS
  const resolveReport = (reportId, actionType, targetName) => {
    if (actionType === 'Remove') {
      setReportedPosts(prev => prev.filter(r => r.id !== reportId));
      setReportedComments(prev => prev.filter(r => r.id !== reportId));
      setModLog(prev => [
        {
          id: `log-${Date.now()}`,
          action: 'Content Removed',
          target: targetName || 'Reported Content',
          moderator: currentUser.name,
          time: 'Just now'
        },
        ...prev
      ]);
      showToast('Content successfully removed from platform.', 'warning');
    } else if (actionType === 'Ignore' || actionType === 'Approve') {
      setReportedPosts(prev =>
        prev.map(r => (r.id === reportId ? { ...r, status: 'Resolved' } : r))
      );
      setReportedComments(prev =>
        prev.map(r => (r.id === reportId ? { ...r, status: 'Resolved' } : r))
      );
      setModLog(prev => [
        {
          id: `log-${Date.now()}`,
          action: 'Report Approved / Cleared',
          target: targetName || 'Reported Item',
          moderator: currentUser.name,
          time: 'Just now'
        },
        ...prev
      ]);
      showToast('Report marked as resolved.', 'success');
    } else if (actionType === 'Ban User') {
      setBannedUsers(prev => [
        {
          id: `ban-${Date.now()}`,
          username: targetName,
          reason: 'Severe forum policy breach',
          bannedAt: 'Just now',
          bannedBy: currentUser.name
        },
        ...prev
      ]);
      setReportedPosts(prev => prev.filter(r => r.author !== targetName));
      setModLog(prev => [
        {
          id: `log-${Date.now()}`,
          action: 'User Banned',
          target: targetName,
          moderator: currentUser.name,
          time: 'Just now'
        },
        ...prev
      ]);
      showToast(`User @${targetName} has been banned.`, 'danger');
    } else if (actionType === 'Warn User') {
      setModLog(prev => [
        {
          id: `log-${Date.now()}`,
          action: 'Official Warning Issued',
          target: targetName,
          moderator: currentUser.name,
          time: 'Just now'
        },
        ...prev
      ]);
      showToast(`Warning sent to @${targetName}.`, 'warning');
    }
  };

  const unbanUser = (banId, username) => {
    setBannedUsers(prev => prev.filter(b => b.id !== banId));
    setModLog(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'User Unbanned',
        target: username,
        moderator: currentUser.name,
        time: 'Just now'
      },
      ...prev
    ]);
    showToast(`Unbanned user @${username}`, 'info');
  };

  return (
    <ForumContext.Provider
      value={{
        currentUser,
        posts,
        communities,
        users,
        comments,
        categories: initialCategories,
        notifications,
        savedPostIds,
        savedCommentIds,
        followingUserIds,
        userPostVotes,
        userCommentVotes,
        reportedPosts,
        reportedComments,
        bannedUsers,
        modLog,
        toastMessage,
        showToast,
        votePost,
        voteComment,
        toggleSavePost,
        toggleSaveComment,
        toggleJoinCommunity,
        toggleFollowUser,
        addPost,
        addComment,
        deleteComment,
        addCommunity,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resolveReport,
        unbanUser
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
