import { useState } from "react";
import api from "../../../api/axios";
import './message.css'
import { useEffect } from "react";

function Messages() {

    const [openMessage, setOpenMessage] = useState(null);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //success state
    const [formSuccess, setFormSuccess] = useState("");

    //error states
    const [formError, setFormError] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    //delete message
    const [deleteMessage, setDeleteMessage] = useState(false);

    const [messageToDelete, setMessageToDelete] = useState(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);

            const response = await api.get('/public/messages');

            setMessages(response.data.messages);

        } catch (error) {
            setError("Failed to load")
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMessages();
    },[])

    const unreadMessages = messages.filter(
        (message) => message.read === false
    );

    const readMessages = messages.filter(
        (message) => message.read === true
    );

    
    const handleOpenMessage = async (message) => {
        setOpenMessage(message);

        if (message.read === false) {
            try {
                await api.patch(`/public/messages/${message.id}/read`);

                setMessages((previousMessages) =>
                    previousMessages.map((item) =>
                        item.id === message.id
                            ? { ...item, read: true }
                            : item
                    )
                );
            } catch (error) {
                console.error("Failed to mark message as read:", error);
            }
        }
    };

    const openDeleteMessage = (message) => {
        setMessageToDelete({
            id: message.id,
            name: message.name,
            email: message.email,
            message: message.message,
            read: message.read,
            createdAt: message.createdAt
        })
        setDeleteMessage(true);
    }

    const handleDeleteMessage = async () => {
        try {
            const response = await api.delete(`/public/messages/${messageToDelete.id}`);

            // Remove the deleted message from React state
            setMessages((previousMessages) => 
               previousMessages.filter(
                (message) => message.id !== messageToDelete.id
                )
            )

            setFormError("");
            setFormSuccess(
               response.data.message || "Match deleted successfully"
            );

            // Close the confirmation popup after showing success
            setTimeout(() => {
                setDeleteMessage(false);
                setMessageToDelete(null);

                setFormSuccess("");
 
            }, 1500);

        } catch (error) {
            const data = error.message?.data;
            setFormError(data?.message || "Something went wrong.")
        }
    }

    const closeDeleteMessage = () => {
        setMessageToDelete(null);
        setDeleteMessage(false);
        setFormError("");
        setFormSuccess("");
    }


    const closeMessage = () => {
        setOpenMessage(null);
    }

    if (loading) {
    return <div className="spinner">Loading...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

    return (
        <>  
            {openMessage && (
                <div className="message-modal-overlay">
                   <div className="message-modal">
                      <div className="message-modal-header">
                        <div>
                            <span className="modal-subtitle">
                                PARIS FC · CONTACT MESSAGES
                            </span>
                            <h2 id="message-modal-title">
                                    Message Details
                            </h2>
                        </div>
                        <button type="button" className="modal-close-btn" onClick={closeMessage}>
                           &times;
                        </button>
                      </div>

                      <div className="message-modal-body">
                        <div className="modal-sender">
                          <div className="sender-avatar">
                            {openMessage.name
                                .trim()
                                .charAt(0)
                                .toUpperCase()}
                          </div>

                          <div className="sender-details">
                             <h3>{openMessage.name}</h3>
                             <a href={`mailto:${openMessage.email}`}>
                                {openMessage.email}
                             </a>
                          </div>
                        </div>

                        <div className="modal-message-meta">
                            <span>Received</span>
                            <span>
                                {new Date(openMessage.createdAt).toLocaleDateString("en-GB")}
                            </span>
                        </div>

                        <div className="modal-full-message">
                          <h4>Message</h4>
                          <p>{openMessage.message}</p>
                        </div>

                      </div>  

                      <div className="message-modal-footer">
                         <span></span>
                         <button type="button" className="modal-done-btn" onClick={closeMessage}>
                            Close
                         </button>
                      </div>

                   </div>
                </div>
            )}

            {deleteMessage && (
                <div className="delete-overlay">
                  <div className="confirmation-message">
                    <h2>Are you sure you want to delete this Message</h2>
                    <p>email: {messageToDelete.email}</p>
                  </div>
                    
                        {formSuccess && (
                        <p className="success-delete-message">{formSuccess}</p>
                        )}
                    
                    <div className="action-btns">
                        <button onClick={handleDeleteMessage}>Delete</button>
                        <button onClick={closeDeleteMessage}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="messages-section">
                <div className="message-details">
                    <div className="messages-header">
                        <div>
                            <h1>Messages from Visitors</h1>
                            <p>Manage messages received through the Paris FC website.</p>
                        </div>
                    </div>

                    <div className="read-and-unread-section">
                        <section className="message-group unread">
                            <div className="message-group-header">
                                <h2>Unread Messages</h2>
                                <span className="message-count">{unreadMessages.length}</span>
                            </div>

                            <div className="message-list">
                                {unreadMessages.map(message => {
                                    return (
                                        <article key={message.id} className="message">
                                            <div className="message-top">
                                                <h3>{message.name}</h3>
                                                <span className="message-status unread-status">
                                                    Unread
                                                </span>
                                            </div>

                                            <p className="message-email">{message.email}</p>

                                            <p className="message-content">
                                                {message.message}
                                            </p>
                                            <div className="modal-message-meta">
                                                <span>Received</span>
                                                <span>
                                                    {new Date(message.createdAt).toLocaleDateString("en-GB")}
                                                </span>
                                            </div>

                                            <div className="message-actions">
                                                <button type="button" className="open-message-btn" onClick={() => handleOpenMessage(message)}>
                                                    Open Message
                                                </button>
                                                <button className="delete-msg-btn" type="button" onClick={() => openDeleteMessage(message)}>
                                                    Delete Message
                                                </button>
                                            </div>
                                        </article>
                                    )
                                })}
                               
                            </div>
                        </section>

                        <section className="message-group read">
                            <div className="message-group-header">
                                <h2>Read Messages</h2>
                                <span className="message-count">{readMessages.length}</span>
                            </div>

                            <div className="message-list">
                                {readMessages.map(message => {
                                    return (
                                        <article key={message.id} className="message">
                                            <div className="message-top">
                                                <h3>{message.name}</h3>
                                                <span className="message-status read-status">
                                                    Read
                                                </span>
                                            </div>

                                            <p className="message-email">{message.email}</p>

                                            <p className="message-content">
                                                {message.message}
                                            </p>
                                            <div className="modal-message-meta">
                                                <span>Received</span>
                                                <span>
                                                    {new Date(message.createdAt).toLocaleDateString("en-GB")}
                                                </span>
                                            </div>

                                            <div className="message-actions">
                                                <button type="button" className="open-message-btn" onClick={() => handleOpenMessage(message)}>
                                                    View Message
                                                </button>
                                                <button className="delete-msg-btn" type="button" onClick={() => openDeleteMessage(message)}>
                                                    Delete Message
                                                </button>
                                            </div>
                                        </article>
                                    )
                                })}
                                
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Messages


// import { useEffect, useState } from "react";
// import api from "../../../api/axios";
// import "./message.css";

// function Messages() {
//     const [openMessage, setOpenMessage] = useState(null);

//     const sampleMessages = [
//         {
//             id: 1,
//             name: "Ibrahim Zaki",
//             email: "ibrahim@gmail.com",
//             message:
//                 "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, dicta. Natus porro, perferendis a voluptate reprehenderit quas necessitatibus perspiciatis commodi odio explicabo. Quas delectus, placeat voluptates officia ea facilis rerum.",
//             read: false,
//             createdAt: "2026-10-26T09:30:00"
//         },
//         {
//             id: 2,
//             name: "Ibrahim Zaki",
//             email: "ibrahim@gmail.com",
//             message:
//                 "Thank you for supporting Paris FC. I would like to know more about the team.",
//             read: true,
//             createdAt: "2026-10-25T14:20:00"
//         }
//     ];

//     const unreadMessages = sampleMessages.filter(
//         (message) => !message.read
//     );

//     const readMessages = sampleMessages.filter(
//         (message) => message.read
//     );

//     const closeMessage = () => {
//         setOpenMessage(null);
//     };

//     // Close the modal when Escape is pressed.
//     useEffect(() => {
//         if (!openMessage) return;

//         const handleKeyDown = (event) => {
//             if (event.key === "Escape") {
//                 closeMessage();
//             }
//         };

//         window.addEventListener("keydown", handleKeyDown);

//         return () => {
//             window.removeEventListener("keydown", handleKeyDown);
//         };
//     }, [openMessage]);

//     const formatDate = (date) => {
//         if (!date) return "Date unavailable";

//         return new Date(date).toLocaleString(undefined, {
//             day: "numeric",
//             month: "short",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit"
//         });
//     };

//     return (
//         <>
//             {/* Message modal */}
//             {openMessage && (
//                 <div
//                     className="message-modal-overlay"
//                     onMouseDown={(event) => {
//                         if (event.target === event.currentTarget) {
//                             closeMessage();
//                         }
//                     }}
//                 >
//                     <div
//                         className="message-modal"
//                         role="dialog"
//                         aria-modal="true"
//                         aria-labelledby="message-modal-title"
//                     >
//                         <div className="message-modal-header">
//                             <div>
//                                 <span className="modal-subtitle">
//                                     PARIS FC · CONTACT MESSAGES
//                                 </span>

//                                 <h2 id="message-modal-title">
//                                     Message Details
//                                 </h2>
//                             </div>

//                             <button
//                                 type="button"
//                                 className="modal-close-btn"
//                                 onClick={closeMessage}
//                                 aria-label="Close message"
//                             >
//                                 &times;
//                             </button>
//                         </div>

//                         <div className="message-modal-body">
//                             <div className="modal-sender">
//                                 <div className="sender-avatar">
//                                     {openMessage.name
//                                         .trim()
//                                         .charAt(0)
//                                         .toUpperCase()}
//                                 </div>

//                                 <div className="sender-details">
//                                     <h3>{openMessage.name}</h3>
//                                     <a href={`mailto:${openMessage.email}`}>
//                                         {openMessage.email}
//                                     </a>
//                                 </div>
//                             </div>

//                             <div className="modal-message-meta">
//                                 <span>Received</span>
//                                 <span>
//                                     {formatDate(openMessage.createdAt)}
//                                 </span>
//                             </div>

//                             <div className="modal-full-message">
//                                 <h4>Message</h4>
//                                 <p>{openMessage.message}</p>
//                             </div>
//                         </div>

//                         <div className="message-modal-footer">
//                             <span
//                                 className={`modal-status ${
//                                     openMessage.read
//                                         ? "modal-status-read"
//                                         : "modal-status-unread"
//                                 }`}
//                             >
//                                 {openMessage.read ? "Read" : "Unread"}
//                             </span>

//                             <button
//                                 type="button"
//                                 className="modal-done-btn"
//                                 onClick={closeMessage}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Messages page */}
//             <div className="messages-section">
//                 <div className="message-details">
//                     <div className="messages-header">
//                         <div>
//                             <h1>Messages from Visitors</h1>
//                             <p>
//                                 Manage messages received through the Paris FC
//                                 website.
//                             </p>
//                         </div>
//                     </div>

//                     <div className="read-and-unread-section">
//                         {/* Unread messages */}
//                         <section className="message-group unread">
//                             <div className="message-group-header">
//                                 <h2>Unread Messages</h2>
//                                 <span className="message-count">
//                                     {unreadMessages.length}
//                                 </span>
//                             </div>

//                             <div className="message-list">
//                                 {unreadMessages.length > 0 ? (
//                                     unreadMessages.map((message) => (
//                                         <article
//                                             className="message"
//                                             key={message.id}
//                                         >
//                                             <div className="message-top">
//                                                 <h3>{message.name}</h3>
//                                                 <span className="message-status unread-status">
//                                                     Unread
//                                                 </span>
//                                             </div>

//                                             <p className="message-email">
//                                                 {message.email}
//                                             </p>

//                                             <p className="message-content">
//                                                 {message.message}
//                                             </p>

//                                             <div className="message-actions">
//                                                 <button
//                                                     type="button"
//                                                     className="open-message-btn"
//                                                     onClick={() =>
//                                                         setOpenMessage(message)
//                                                     }
//                                                 >
//                                                     Open Message
//                                                 </button>
//                                             </div>
//                                         </article>
//                                     ))
//                                 ) : (
//                                     <p className="empty-messages">
//                                         No unread messages.
//                                     </p>
//                                 )}
//                             </div>
//                         </section>

//                         {/* Read messages */}
//                         <section className="message-group read">
//                             <div className="message-group-header">
//                                 <h2>Read Messages</h2>
//                                 <span className="message-count">
//                                     {readMessages.length}
//                                 </span>
//                             </div>

//                             <div className="message-list">
//                                 {readMessages.length > 0 ? (
//                                     readMessages.map((message) => (
//                                         <article
//                                             className="message"
//                                             key={message.id}
//                                         >
//                                             <div className="message-top">
//                                                 <h3>{message.name}</h3>
//                                                 <span className="message-status read-status">
//                                                     Read
//                                                 </span>
//                                             </div>

//                                             <p className="message-email">
//                                                 {message.email}
//                                             </p>

//                                             <p className="message-content">
//                                                 {message.message}
//                                             </p>

//                                             <div className="message-actions">
//                                                 <button
//                                                     type="button"
//                                                     className="open-message-btn"
//                                                     onClick={() =>
//                                                         setOpenMessage(message)
//                                                     }
//                                                 >
//                                                     View Message
//                                                 </button>
//                                             </div>
//                                         </article>
//                                     ))
//                                 ) : (
//                                     <p className="empty-messages">
//                                         No read messages.
//                                     </p>
//                                 )}
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Messages;
