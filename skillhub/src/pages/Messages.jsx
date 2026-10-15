import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Messages = ({ initialConversations }) => {
  const [conversations, setConversations] = useState(
    initialConversations || [
      {
        id: 1,
        name: "Rahul Sharma",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        online: true,
        role: "Full Stack Developer",
        messages: [
          { id: 1, sender: "them", text: "Hi! Thanks for checking out my profile. I noticed your project requirement for a React e-commerce platform.", time: "10:30 AM" },
          { id: 2, sender: "me", text: "Hello Rahul! Yes, we need a high-performance web app with Razorpay integration and an admin panel.", time: "10:32 AM" },
          { id: 3, sender: "them", text: "Hi, I can help with your website! I have built several similar stores using React and Node.js. Would you like to review my live demos?", time: "10:35 AM" }
        ]
      },
      {
        id: 2,
        name: "Priya Patel",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        online: false,
        role: "UI/UX Designer",
        messages: [
          { id: 1, sender: "them", text: "Hello! I saw your inquiry regarding the mobile app UI/UX design.", time: "Yesterday" },
          { id: 2, sender: "them", text: "Thanks for contacting me. I've prepared a preliminary moodboard on Figma for your review.", time: "Yesterday" }
        ]
      },
      {
        id: 3,
        name: "Amit Shah",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        online: true,
        role: "Digital Marketing Expert",
        messages: [
          { id: 1, sender: "me", text: "Hi Amit, are you available for SEO audits this month?", time: "Sep 24" },
          { id: 2, sender: "them", text: "I have sent the proposal and keyword roadmap to your dashboard. Let me know if you want any adjustments!", time: "Sep 24" }
        ]
      },
      {
        id: 4,
        name: "Vikram Singh",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        online: true,
        role: "Mobile App Developer",
        messages: [
          { id: 1, sender: "them", text: "Hi there! I can take on your Flutter mobile app starting Monday.", time: "Sep 23" }
        ]
      }
    ]
  );

  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState('');
  const [searchContact, setSearchContact] = useState('');

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    setInputText('');

    // Simulated auto-reply after 1.5 seconds
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "them",
        text: "Got it! Thanks for the details. I will review this right away.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeChat.id) {
            return {
              ...c,
              messages: [...c.messages, reply]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchContact.toLowerCase()) ||
    c.role.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <div className="messages-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Messages</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-2">Messages & Conversations</h1>
          <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
            Chat in real-time with clients and freelancers, share files, and finalize project scope.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Left Column: Contact List */}
          <div className="col-lg-4 col-12">
            <div className="chat-sidebar d-flex flex-column bg-white shadow-sm">
              <div className="p-3 border-bottom">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-sm border-start-0"
                    placeholder="Search conversations..."
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-grow-1 overflow-auto">
                {filteredConversations.map((contact) => {
                  const lastMsg = contact.messages[contact.messages.length - 1];
                  const isActive = contact.id === activeChat.id;

                  return (
                    <div
                      key={contact.id}
                      className={`chat-contact d-flex align-items-center gap-3 ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveChatId(contact.id)}
                    >
                      <div className="position-relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="rounded-circle"
                          style={{ width: 48, height: 48, objectFit: 'cover' }}
                        />
                        <span
                          className={`position-absolute bottom-0 end-0 p-1 rounded-circle border border-white ${
                            contact.online ? 'bg-success' : 'bg-secondary'
                          }`}
                          style={{ width: 12, height: 12 }}
                        ></span>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className="mb-0 fw-bold text-truncate" style={{ fontSize: '0.925rem' }}>
                            {contact.name}
                          </h6>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {lastMsg?.time || ''}
                          </small>
                        </div>
                        <p className="text-muted small mb-0 text-truncate">
                          {lastMsg ? `"${lastMsg.text}"` : 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="col-lg-8 col-12">
            <div className="chat-window shadow-sm bg-white">
              {/* Header */}
              <div className="chat-header justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="rounded-circle"
                      style={{ width: 44, height: 44, objectFit: 'cover' }}
                    />
                    <span
                      className={`position-absolute bottom-0 end-0 p-1 rounded-circle border border-white ${
                        activeChat.online ? 'bg-success' : 'bg-secondary'
                      }`}
                      style={{ width: 10, height: 10 }}
                    ></span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">{activeChat.name}</h6>
                    <small className="text-muted">
                      {activeChat.online ? (
                        <span className="text-success"><i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i>Online</span>
                      ) : (
                        <span>Offline</span>
                      )}
                      {' · '}{activeChat.role}
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Link to={`/freelancers/${activeChat.id}`} className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-person me-1"></i> Profile
                  </Link>
                </div>
              </div>

              {/* Messages Area */}
              <div className="chat-messages">
                <div className="text-center my-2">
                  <span className="badge bg-light text-muted border px-3 py-1 small">
                    Beginning of conversation with {activeChat.name}
                  </span>
                </div>

                {activeChat.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`d-flex flex-column ${m.sender === 'me' ? 'align-items-end' : 'align-items-start'}`}
                  >
                    <div
                      className={`message-bubble ${m.sender === 'me' ? 'message-sent' : 'message-received'}`}
                    >
                      {m.text}
                    </div>
                    <small className="text-muted px-2 mb-2" style={{ fontSize: '0.72rem' }}>
                      {m.time}
                    </small>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="chat-input align-items-center">
                <button
                  type="button"
                  className="btn btn-light rounded-circle text-muted"
                  title="Attach file (simulation)"
                  onClick={() => alert('File attachment dialogue simulated.')}
                >
                  <i className="bi bi-paperclip fs-5"></i>
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Message ${activeChat.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary-custom rounded-circle p-2" style={{ width: 42, height: 42 }}>
                  <i className="bi bi-send-fill text-white"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
