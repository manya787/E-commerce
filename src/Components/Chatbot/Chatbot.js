import React, { useState, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Rating,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectEmail, selectLoginStatusexist } from '../../features/authslice';
import './Chatbot.css';
import { useNavigate } from 'react-router-dom';

// Define message types
const MessageType = {
  BOT: 'bot',
  USER: 'user',
  QUESTION: 'question',
  OPTION: 'option',
  ORDER: 'order',
  RECOMMENDATION: 'recommendation',
  QUICK_REPLY: 'quick_reply',
  RATING: 'rating',
  NOTIFICATION: 'notification'
};

/**
 * @typedef {Object} Message
 * @property {string} type
 * @property {string} content
 * @property {string} [answer]
 */

/**
 * @typedef {Object} RootState
 * @property {Object} auth
 * @property {boolean} auth.isLoggedIn
 * @property {Object} orders
 * @property {Array} orders.orders
 */

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [botName] = useState('AR Shop Assistant');
  const [userName, setUserName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [theme, setTheme] = useState('light');
  const userEmail = useSelector(selectEmail);
  const isLoggedIn = useSelector(selectLoginStatusexist);
  const orders = useSelector((state) => {
    if (!state.ordershistory) return [];
    return state.ordershistory.grandTotals || [];
  });
  const navigate = useNavigate();

  // Predefined questions and answers
  const predefinedQuestions = {
    'shipping': {
      answer: 'We offer worldwide shipping! Standard delivery takes 3-5 business days, and express delivery is available for 1-2 business days. Shipping costs vary based on your location and order size.',
      followUp: ['Track my order', 'Shipping rates', 'Return policy']
    },
    'delivery': {
      answer: 'Our delivery partners ensure safe and timely delivery of your AR products. You can track your order status in real-time through your account dashboard.',
      followUp: ['Track my order', 'Delivery time', 'Contact support']
    },
    'returns': {
      answer: 'We have a 30-day return policy. If you\'re not satisfied with your AR product, you can return it for a full refund or exchange. The item must be unused and in its original packaging.',
      followUp: ['Start return', 'Return policy details', 'Contact support']
    },
    'price': {
      answer: 'Our AR products are competitively priced, starting from Rs. 99. We often have special discounts and bundle offers. Check our website for current promotions!',
      followUp: ['View products', 'Current deals', 'Bundle offers']
    },
    'cost': {
      answer: 'Our AR products range from Rs99 to Rs499, depending on the model and features. We currently offer only Cash on Delivery as the payment method for your convenience.\n\nWould you like to know more about our return or refund process?',
      followUp: ['Refund Policy']
    },
    'ar technology': {
      answer: 'Our AR technology uses advanced computer vision and spatial computing to create immersive experiences. It\'s compatible with most modern smartphones and tablets.',
      followUp: ['Compatibility check', 'How it works', 'View demo']
    },
    'help': {
      answer: 'I can help you with product information, orders, shipping, returns, and technical support. What would you like to know more about?',
      followUp: ['Product info', 'Order status', 'Technical support']
    },
    'support': {
      answer: 'I\'m your personal AR Shop assistant! I can help you with most queries. If you need to speak with our customer support team, I can connect you with them. Would you like to:\n1. Email our support team\n2. Request a callback\n3. Submit a product query\n4. View support FAQs',
      followUp: ['Email support', 'Request callback', 'Submit product query', 'Support FAQs']
    },
    'customer support': {
      answer: 'Our customer support team is available 24/7 to help you. You can reach them through:\n\n1. Email: support@arshop.com\n2. Phone: +1 (800) 123-4567\n\nFor immediate assistance, you can request a callback and our team will contact you within 10 minutes.\n\nWould you like me to help you with any of these options?',
      followUp: ['Email support', 'Request callback', 'Support FAQs']
    },
    'rating': {
      answer: 'We value your feedback! How would you rate your experience with AR Shop? Your feedback helps us improve our products and services.',
      followUp: ['Rate experience', 'Submit feedback', 'View testimonials']
    },
    'feedback': {
      answer: 'Thank you for your interest in providing feedback. We\'d love to hear your thoughts about:\n1. Product quality\n2. Shopping experience\n3. Customer service\n4. AR technology\n5. Website usability\nWhich aspect would you like to rate?',
      followUp: ['Rate products', 'Rate service', 'Rate website']
    },
    'view products': {
      answer: 'You can browse our products by:\n1. Category (Clothing, Home, Beauty)\n2. Price range\n3. New arrivals\n4. Best sellers\n5. Special offers',
      followUp: ['View Fashion', 'View Furniture']
    },
    'view furniture': {
      answer: 'Redirecting you to our Furniture collection...',
      action: () => navigate('/Furniture')
    },
    'view fashion': {
      answer: 'Redirecting you to our Fashion collection...',
      action: () => navigate('/Fashion')
    },
    'payment security': {
      answer: 'We ensure your payment security through:\n\n1. SSL Encryption\n2. PCI DSS Compliance\n3. 3D Secure Authentication\n4. Fraud Detection Systems\n5. Secure Payment Gateway\n\nYour payment information is never stored on our servers. Would you like to proceed with your purchase?',
      followUp: ['Start Shopping', 'View Products', 'Contact Support']
    },
    'refund policy': {
      answer: 'Our refund policy is customer-friendly:\n\n1. 30-Day Money Back Guarantee\n2. Full Refund for Unused Products\n3. Free Return Shipping\n4. Instant Refund Processing\n5. Multiple Refund Options\n\nWould you like to know more about our return process?',
      followUp: ['Return Process', 'View Products', 'Contact Support']
    },
    'delivery status': {
      answer: 'We have sent tracking information to your registered email and phone number. You can check your delivery status through:\n\n1. Email: Check your inbox for tracking details\n2. SMS: Look for the tracking link in your messages\n3. Order History: View status in your account\n\nWould you like me to help you with anything else?',
      followUp: ['Track order', 'Contact support', 'View order history']
    },
    'track order': {
      answer: 'You can track your order through:\n\n1. Email: Check your inbox for tracking details\n2. SMS: Look for the tracking link in your messages\n3. Order History: View status in your account\n\nWould you like me to help you with anything else?',
      followUp: ['Contact support', 'View order history']
    },
    'submit product query': {
      answer: 'I can help you submit a query about your previous order. Please follow these steps:\n\n1. Select the order you want to query about\n2. Upload images of the product\n3. Describe the issue\n4. Submit your query\n\nWould you like to proceed?',
      followUp: ['Select order', 'Upload images', 'Describe issue']
    }
  };

  // Quick replies for common responses
  const quickReplies = {
    'shipping': ['Track my order', 'Shipping rates', 'Return policy'],
    'product': ['View Fashion', 'View Furniture'],
    'support': ['Email support', 'Request callback', 'Submit product query', 'Support FAQs'],
    'rating': ['Rate experience', 'Submit feedback', 'View testimonials'],
    'payment': ['Payment Security', 'EMI Options', 'Refund Policy']
  };

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--chat-bg', '#1a1a1a');
      root.style.setProperty('--chat-text', '#ffffff');
      root.style.setProperty('--chat-bubble-bg', '#2d2d2d');
      root.style.setProperty('--chat-input-bg', '#333333');
    } else {
      root.style.setProperty('--chat-bg', '#ffffff');
      root.style.setProperty('--chat-text', '#000000');
      root.style.setProperty('--chat-bubble-bg', '#f5f5f5');
      root.style.setProperty('--chat-input-bg', '#f5f5f5');
    }
  }, [theme]);

  useEffect(() => {
    if (userEmail) {
      const name = userEmail.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, [userEmail]);

  const handleClickOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      const greeting = isLoggedIn
        ? `Hello ${userName}! I'm your personal AR Shop assistant. How can I help you today?`
        : 'Welcome to AR Shop! I\'m your personal assistant. How can I assist you?';
      
      setMessages([
        { type: MessageType.BOT, content: greeting }
      ]);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: MessageType.QUESTION, content: 'Learn about AR features' },
          { type: MessageType.QUESTION, content: 'View my order history' },
          { type: MessageType.QUESTION, content: 'Get personalized recommendations' },
          { type: MessageType.QUESTION, content: 'Connect with customer support' },
          { type: MessageType.QUESTION, content: 'Rate your experience' }
        ]);
      }, 1000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000);
  };

  const handleQuestionClick = (question) => {
    setMessages(prev => [...prev, { type: MessageType.USER, content: question }]);

    simulateTyping(() => {
      let response;
      switch (question) {
        case 'Connect with customer support':
          response = {
            type: MessageType.BOT,
            content: 'Our customer support team is available 24/7 to help you. You can reach them through:\n\n1. Email: support@arshop.com\n2. Phone: +1 (800) 123-4567\n\nFor immediate assistance, you can request a callback and our team will contact you within 10 minutes.\n\nWould you like me to help you with any of these options?',
            followUp: ['Email support', 'Request callback', 'Support FAQs']
          };
          break;
        case 'Email support':
          response = {
            type: MessageType.BOT,
            content: 'You can email our support team at support@arshop.com. They typically respond within 24 hours. Would you like me to help you draft an email?',
            followUp: ['Draft email', 'Request callback', 'Support FAQs']
          };
          break;
        case 'Request callback':
          response = {
            type: MessageType.BOT,
            content: 'I\'ve submitted your callback request. Our customer support team will contact you within 10 minutes at your registered phone number. Is there anything specific you\'d like them to know about your query?',
            followUp: ['Add details', 'Support FAQs']
          };
          break;
        case 'Support FAQs':
          response = {
            type: MessageType.BOT,
            content: 'Here are some frequently asked questions:\n\n1. How do I track my order?\n2. What is your return policy?\n3. How do I change my delivery address?\n4. What payment methods do you accept?\n5. How do I cancel my order?\n\nWhich topic would you like to know more about?',
            followUp: ['Track order', 'Return policy', 'Change address', 'Payment methods', 'Cancel order']
          };
          break;
        case 'Learn about AR features':
          response = {
            type: MessageType.BOT,
            content: 'Our AR technology allows you to:\n- Try on clothing virtually\n- Visualize home decor in your space\n- See how furniture fits in your room \nWould you like to try it now?'
          };
          break;
        case 'View my order history':
          if (!isLoggedIn) {
            response = {
              type: MessageType.BOT,
              content: 'Please log in to view your order history.'
            };
          } else if (!orders?.length) {
            response = {
              type: MessageType.BOT,
              content: 'You haven\'t placed any orders yet.'
            };
          } else {
            const orderLinks = orders.map((total, index) => ({
              type: MessageType.ORDER,
              content: `Order #${index + 1} - Rs.${total}`,
              link: `/Orderhistory`
            }));
            setMessages(prev => [...prev, ...orderLinks]);
            return;
          }
          break;
        case 'Get personalized recommendations':
          if (!isLoggedIn) {
            response = {
              type: MessageType.BOT,
              content: 'Please log in to get personalized recommendations.'
            };
          } else if (!orders?.length) {
            response = {
              type: MessageType.BOT,
              content: 'Start shopping to get personalized recommendations!'
            };
          } else {
            const totalSpent = orders.reduce((sum, total) => sum + parseFloat(total), 0);
            const recommendations = [
              {
                type: MessageType.RECOMMENDATION,
                content: 'Based on your spending, you might like our premium collection!',
                link: 'http://localhost:3000/Fashion'
              },
              {
                type: MessageType.RECOMMENDATION,
                content: 'Check out our new arrivals that match your style!',
                link: 'http://localhost:3000/Furniture'
              }
            ];
            setMessages(prev => [...prev, ...recommendations]);
            return;
          }
          break;
        // Follow-up questions for shipping
        case 'Track my order':
          response = {
            type: MessageType.BOT,
            content: 'You can track your order by:\n1. Going to your account dashboard\n2. Clicking on "Orders"\n3. Selecting the order you want to track\n4. Clicking the "Track Order" button'
          };
          break;
        case 'Shipping rates':
          response = {
            type: MessageType.BOT,
            content: 'Our shipping rates are:\n- Standard (3-5 days): Rs. 6.00'
          };
          break;
        // Follow-up questions for delivery
        case 'Delivery time':
          response = {
            type: MessageType.BOT,
            content: 'Delivery times vary by location:\n- US: 2-3 business days\n- Canada: 5-7 business days\n- Europe: 7-10 business days\n- Rest of the world: 10-14 business days'
          };
          break;
        case 'Contact support':
          response = {
            type: MessageType.BOT,
            content: 'You can contact our support team through:\n1. Email: support@ar-shop.com\n2. Phone: 1-800-AR-SHOP\n3. Live chat: Available 24/7\n4. Help center: ar-shop.com/help'
          };
          break;
        // Follow-up questions for returns
        case 'Start return':
          response = {
            type: MessageType.BOT,
            content: 'To start a return:\n1. Log in to your account\n2. Go to "Orders"\n3. Select the order you want to return\n4. Click "Return Item"\n5. Follow the instructions to print the return label'
          };
          break;
        case 'Return policy details':
          response = {
            type: MessageType.BOT,
            content: 'Our return policy includes:\n- 30-day return window\n- Free return shipping\n- Full refund or exchange\n- Items must be unused and in original packaging\n- Refund processed within 5-7 business days'
          };
          break;
        // Follow-up questions for pricing
        case 'Current deals':
          response = {
            type: MessageType.BOT,
            content: 'Current promotions:\n- 20% off all dresses\n- Buy 2 get 1 free on accessories\n- Free shipping on orders over $50\n- Student discount: 10% off with valid ID'
          };
          break;
        case 'Bundle offers':
          response = {
            type: MessageType.BOT,
            content: 'Special bundle deals:\n- 2 dresses: Rs199 (Save Rs50)\n- Pro Bundle: Rs299 (Save Rs100)\n- Family Pack Hats: Rs399 (Save Rs150)\nAll bundles include free shipping!'
          };
          break;
        // Follow-up questions for AR technology
        case 'Compatibility check':
          response = {
            type: MessageType.BOT,
            content: 'Our AR technology works with:\n- iOS 13 or later\n- Android 10 or later\n- Most modern smartphones\n- Tablets with camera access\nCheck your device compatibility at ar-shop.com/compatibility'
          };
          break;
        case 'How it works':
          response = {
            type: MessageType.BOT,
            content: 'Our AR technology works by:\n1. Using your device\'s camera\n2. Creating a 3D model of your space\n3. Overlaying virtual products in real-time\n4. Allowing you to move and interact with items\n5. Saving your preferences for future use'
          };
          break;
        case 'View demo':
          response = {
            type: MessageType.BOT,
            content: 'You can view our AR demos at:\n1. ar-shop.com/demo\n2. YouTube channel: AR-Shop Official\n3. In-store demonstrations\n4. Virtual product tours'
          };
          break;
        case 'Rate your experience':
          response = {
            type: MessageType.BOT,
            content: 'We value your feedback! How would you rate your overall experience with AR Shop?',
            rating: true,
            category: 'overall'
          };
          break;
        case 'Rate products':
          response = {
            type: MessageType.BOT,
            content: 'How would you rate our AR products? Consider factors like quality, features, and value for money.',
            rating: true,
            category: 'products'
          };
          break;
        case 'Rate service':
          response = {
            type: MessageType.BOT,
            content: 'How would you rate our customer service? Consider factors like responsiveness, helpfulness, and support quality.',
            rating: true,
            category: 'service'
          };
          break;
        case 'Rate website':
          response = {
            type: MessageType.BOT,
            content: 'How would you rate our website experience? Consider factors like ease of use, navigation, and AR features.',
            rating: true,
            category: 'website'
          };
          break;
        case 'Submit feedback':
          response = {
            type: MessageType.BOT,
            content: 'Please share your detailed feedback about your experience with AR Shop. Your comments help us improve!',
            feedback: true
          };
          break;
        case 'View testimonials':
          response = {
            type: MessageType.BOT,
            content: 'Here are some recent customer testimonials:\n\n"Amazing AR experience! The virtual try-on feature is incredible." - Sarah\n\n"Best customer service I\'ve ever experienced!" - John\n\n"Love how easy it is to visualize products in my space." - Mike\n\nWould you like to share your experience too?',
            followUp: ['Rate experience', 'Submit feedback']
          };
          break;
        case 'View Fashion':
          response = {
            type: MessageType.BOT,
            content: 'Redirecting you to our Fashion collection...'
          };
          setMessages(prev => [...prev, response]);
          navigate('/Fashion');
          return;
        case 'View Furniture':
          response = {
            type: MessageType.BOT,
            content: 'Redirecting you to our Furniture collection...'
          };
          setMessages(prev => [...prev, response]);
          navigate('/Furniture');
          return;
        case 'Payment Security':
          response = {
            type: MessageType.BOT,
            content: predefinedQuestions['payment security'].answer,
            followUp: predefinedQuestions['payment security'].followUp
          };
          break;
        case 'Refund Policy':
          response = {
            type: MessageType.BOT,
            content: predefinedQuestions['refund policy'].answer,
            followUp: predefinedQuestions['refund policy'].followUp
          };
          break;
        case 'Delivery status':
          response = {
            type: MessageType.BOT,
            content: 'We have sent tracking information to your registered email and phone number. You can check your delivery status through:\n\n1. Email: Check your inbox for tracking details\n2. SMS: Look for the tracking link in your messages\n3. Order History: View status in your account\n\nWould you like me to help you with anything else?',
            followUp: ['Track order', 'Contact support', 'View order history']
          };
          break;
        case 'Track order':
          response = {
            type: MessageType.BOT,
            content: 'You can track your order through:\n\n1. Email: Check your inbox for tracking details\n2. SMS: Look for the tracking link in your messages\n3. Order History: View status in your account\n\nWould you like me to help you with anything else?',
            followUp: ['Contact support', 'View order history']
          };
          break;
        case 'Submit product query':
          response = {
            type: MessageType.BOT,
            content: 'I can help you submit a query about your previous order. Please follow these steps:\n\n1. Select the order you want to query about\n2. Upload images of the product\n3. Describe the issue\n4. Submit your query\n\nWould you like to proceed?',
            followUp: ['Select order', 'Upload images', 'Describe issue']
          };
          break;
        case 'Select order':
          response = {
            type: MessageType.BOT,
            content: 'Please select the order you want to query about:',
            orderSelection: true
          };
          break;
        case 'Upload images':
          response = {
            type: MessageType.BOT,
            content: 'Please upload images of the product. You can upload multiple images.',
            imageUpload: true
          };
          break;
        case 'Describe issue':
          response = {
            type: MessageType.BOT,
            content: 'Please describe the issue with your product. Be as detailed as possible.',
            issueDescription: true
          };
          break;
        default:
          response = {
            type: MessageType.BOT,
            content: 'I can help you with information about shipping, delivery, returns, pricing, AR technology, and customer support. What would you like to know?',
            followUp: [
              'Shipping information',
              'Delivery status',
              'Return policy',
              'Product pricing',
              'AR technology',
              'Connect with support'
            ]
          };
      }
      setMessages(prev => [...prev, response]);
    });
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { type: MessageType.USER, content: option }]);
    // Handle option clicks here
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim().toLowerCase();
    setMessages(prev => [...prev, { type: MessageType.USER, content: inputMessage }]);
    setInputMessage('');

    // Check for predefined questions
    const matchedQuestion = Object.keys(predefinedQuestions).find(q => 
      userMessage.includes(q.toLowerCase())
    );

    if (matchedQuestion && predefinedQuestions[matchedQuestion]) {
      simulateTyping(() => {
        const question = predefinedQuestions[matchedQuestion];
        setMessages(prev => [
          ...prev,
          { type: MessageType.BOT, content: question.answer }
        ]);

        // Execute action if exists
        if (question.action) {
          question.action();
          return;
        }

        // Add follow-up questions
        setTimeout(() => {
          const followUpQuestions = question.followUp || [];
          setMessages(prev => [
            ...prev,
            ...followUpQuestions.map(q => ({
              type: MessageType.QUESTION,
              content: q
            }))
          ]);
        }, 1000);
      });
    } else {
      simulateTyping(() => {
        setMessages(prev => [
          ...prev,
          { type: MessageType.BOT, content: 'I can help you with information about shipping, delivery, returns, pricing, and AR technology. What would you like to know?' },
          { type: MessageType.QUESTION, content: 'Shipping information' },
          { type: MessageType.QUESTION, content: 'Delivery status' },
          { type: MessageType.QUESTION, content: 'Return policy' },
          { type: MessageType.QUESTION, content: 'Product pricing' },
          { type: MessageType.QUESTION, content: 'AR technology' }
        ]);
      });
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  // Handle settings menu
  const handleSettingsClick = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    handleSettingsClose();
  };

  // Handle rating
  const handleRating = (messageIndex, value) => {
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[messageIndex].rating = value;
      return newMessages;
    });
  };

  // Add notification
  const addNotification = (message) => {
    setNotifications(prev => [...prev, { id: Date.now(), message }]);
  };

  // Handle quick reply
  const handleQuickReply = (category, reply) => {
    setMessages(prev => [...prev, { type: MessageType.USER, content: reply }]);
    handleQuestionClick(reply);
  };

  // Handle rating submission
  const handleRatingSubmit = (category, rating, comment = '') => {
    // Here you would typically send this to your backend
    console.log(`Rating submitted - Category: ${category}, Rating: ${rating}, Comment: ${comment}`);
    
    // Show thank you message
    setMessages(prev => [
      ...prev,
      { 
        type: MessageType.BOT, 
        content: 'Thank you for your feedback! Your rating helps us improve our products and services. Is there anything else you\'d like to rate or discuss?' 
      }
    ]);

    // Show follow-up options
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { type: MessageType.QUICK_REPLY, category: 'rating' }
      ]);
    }, 1000);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setMessages(prev => [
        ...prev,
        { type: MessageType.USER, content: 'Images uploaded successfully.' },
        { type: MessageType.BOT, content: 'Thank you for uploading the images. Our customer support team will review them and update you soon.' }
      ]);
    }
  };

  // Handle issue description
  const handleIssueDescription = (description) => {
    setMessages(prev => [
      ...prev,
      { type: MessageType.USER, content: description },
      { type: MessageType.BOT, content: 'Thank you for providing the details. Our customer support team will review your query and update you soon.' }
    ]);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleClickOpen}
        className="chatbot-fab"
        sx={{
          width: 56,
          height: 56,
          backgroundColor: theme === 'dark' ? '#1976d2' : '#2196f3',
          '&:hover': {
            backgroundColor: theme === 'dark' ? '#1565c0' : '#1976d2',
          }
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <ChatIcon sx={{ fontSize: 28 }} />
        </Badge>
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className="chatbot-dialog"
        PaperProps={{
          sx: {
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            margin: 0,
            maxWidth: '350px',
            width: '350px',
            maxHeight: '500px',
            height: 'auto',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: theme === 'dark' ? '#1976d2' : '#2196f3',
          color: 'white',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box display="flex" alignItems="center" gap={1}>
            <ChatIcon sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              {botName}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <IconButton 
              onClick={handleSettingsClick}
              sx={{ color: 'white' }}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton 
              onClick={handleClose}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={handleSettingsClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#000000'
            }
          }}
        >
          <MenuItem 
            onClick={() => handleThemeChange('light')}
            selected={theme === 'light'}
          >
            Light Theme
          </MenuItem>
          <MenuItem 
            onClick={() => handleThemeChange('dark')}
            selected={theme === 'dark'}
          >
            Dark Theme
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => addNotification('New feature coming soon!')}>
            Enable Notifications
          </MenuItem>
        </Menu>

        <DialogContent 
          className="chatbot-content"
          sx={{
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }}
        >
          <List sx={{ padding: '8px' }}>
            {messages.map((message, index) => (
              <ListItem 
                key={index} 
                className={`message ${message.type}`}
                sx={{ 
                  padding: '4px 8px',
                  animation: 'fadeIn 0.3s ease',
                  backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f5f5f5'
                }}
              >
                {message.orderSelection ? (
                  <Box display="flex" flexDirection="column" gap={1} width="100%">
                    <Typography variant="body2">{message.content}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleQuestionClick('Upload images')}
                      sx={{
                        alignSelf: 'flex-start',
                        backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : '#000000'
                      }}
                    >
                      Select Order
                    </Button>
                  </Box>
                ) : message.imageUpload ? (
                  <Box display="flex" flexDirection="column" gap={1} width="100%">
                    <Typography variant="body2">{message.content}</Typography>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        sx={{
                          alignSelf: 'flex-start',
                          backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : '#000000'
                        }}
                      >
                        Upload Images
                      </Button>
                    </label>
                  </Box>
                ) : message.issueDescription ? (
                  <Box display="flex" flexDirection="column" gap={1} width="100%">
                    <Typography variant="body2">{message.content}</Typography>
                    <TextField
                      multiline
                      rows={3}
                      placeholder="Describe the issue..."
                      variant="outlined"
                      size="small"
                      onChange={(e) => handleIssueDescription(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : '#000000'
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleQuestionClick('Submit query')}
                      sx={{
                        alignSelf: 'flex-end',
                        backgroundColor: theme === 'dark' ? '#1976d2' : '#2196f3',
                        '&:hover': {
                          backgroundColor: theme === 'dark' ? '#1565c0' : '#1976d2'
                        }
                      }}
                    >
                      Submit Query
                    </Button>
                  </Box>
                ) : message.rating ? (
                  <Box display="flex" flexDirection="column" gap={1} width="100%">
                    <Typography variant="body2">{message.content}</Typography>
                    <Rating
                      value={message.ratingValue || 0}
                      onChange={(event, newValue) => {
                        handleRatingSubmit(message.category, newValue);
                        setMessages(prev => {
                          const newMessages = [...prev];
                          newMessages[index].ratingValue = newValue;
                          return newMessages;
                        });
                      }}
                      size="large"
                    />
                  </Box>
                ) : message.feedback ? (
                  <Box display="flex" flexDirection="column" gap={1} width="100%">
                    <Typography variant="body2">{message.content}</Typography>
                    <TextField
                      multiline
                      rows={3}
                      placeholder="Share your thoughts..."
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setMessages(prev => {
                          const newMessages = [...prev];
                          newMessages[index].feedbackText = e.target.value;
                          return newMessages;
                        });
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : '#000000'
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        const feedbackText = messages[index].feedbackText || '';
                        handleRatingSubmit('feedback', null, feedbackText);
                      }}
                      sx={{
                        alignSelf: 'flex-end',
                        backgroundColor: theme === 'dark' ? '#1976d2' : '#2196f3',
                        '&:hover': {
                          backgroundColor: theme === 'dark' ? '#1565c0' : '#1976d2'
                        }
                      }}
                    >
                      Submit Feedback
                    </Button>
                  </Box>
                ) : message.type === MessageType.QUICK_REPLY ? (
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {quickReplies[message.category]?.map((reply, i) => (
                      <Button
                        key={i}
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuickReply(message.category, reply)}
                        sx={{
                          borderRadius: '16px',
                          textTransform: 'none'
                        }}
                      >
                        {reply}
                      </Button>
                    ))}
                  </Box>
                ) : message.type === MessageType.RATING ? (
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="body2">How helpful was this response?</Typography>
                    <Rating
                      value={message.rating || 0}
                      onChange={(event, newValue) => handleRating(index, newValue)}
                    />
                  </Box>
                ) : message.type === MessageType.NOTIFICATION ? (
                  <Box
                    sx={{
                      backgroundColor: '#e3f2fd',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      width: '100%'
                    }}
                  >
                    <Typography variant="body2">{message.content}</Typography>
                  </Box>
                ) : (message.type === MessageType.QUESTION || message.type === MessageType.OPTION) ? (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      message.type === MessageType.QUESTION
                        ? handleQuestionClick(message.content)
                        : handleOptionClick(message.content)
                    }
                    sx={{
                      width: '100%',
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#f0f4c3',
                      color: '#33691e',
                      '&:hover': {
                        backgroundColor: '#dce775',
                      }
                    }}
                  >
                    {message.content}
                  </Button>
                ) : message.type === MessageType.ORDER || message.type === MessageType.RECOMMENDATION ? (
                  <Button
                    variant="text"
                    onClick={() => {
                      if (message.link) {
                        if (message.link.startsWith('http')) {
                          window.open(message.link, '_blank');
                        } else {
                          navigate(message.link);
                        }
                      }
                    }}
                    sx={{
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      width: '100%',
                      backgroundColor: message.type === MessageType.ORDER ? '#fff8e1' : '#f3e5f5',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      '&:hover': {
                        backgroundColor: message.type === MessageType.ORDER ? '#ffe082' : '#e1bee7',
                      }
                    }}
                  >
                    {message.content}
                  </Button>
                ) : (
                  <ListItemText 
                    primary={message.content}
                    sx={{
                      '& .MuiTypography-root': {
                        whiteSpace: 'pre-line'
                      }
                    }}
                  />
                )}
              </ListItem>
            ))}
            {isTyping && (
              <ListItem 
                className="message bot" 
                sx={{ 
                  padding: '4px 8px',
                  backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f5f5f5'
                }}
              >
                <ListItemText primary="Typing..." />
              </ListItem>
            )}
          </List>
        </DialogContent>

        <DialogActions sx={{ 
          padding: '16px',
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          borderTop: `1px solid ${theme === 'dark' ? '#333333' : '#e0e0e0'}`
        }}>
          <IconButton 
            onClick={handleVoiceInput} 
            color={isListening ? "secondary" : "primary"}
            sx={{ color: theme === 'dark' ? '#ffffff' : '#2196f3' }}
          >
            <MicIcon />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: theme === 'dark' ? '#333333' : '#f5f5f5',
                color: theme === 'dark' ? '#ffffff' : '#000000',
                '& fieldset': {
                  borderColor: theme === 'dark' ? '#444444' : '#e0e0e0'
                },
                '&:hover fieldset': {
                  borderColor: theme === 'dark' ? '#666666' : '#bdbdbd'
                }
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            variant="contained"
            sx={{
              backgroundColor: theme === 'dark' ? '#1976d2' : '#2196f3',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: theme === 'dark' ? '#1565c0' : '#1976d2'
              }
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Chatbot;