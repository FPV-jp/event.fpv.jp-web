import Dashboard from 'views/Dashboard'

//Auth
import Error404 from 'views/Authentication/Error404/Error404'
import Error503 from 'views/Authentication/Error503/Error503'
import LockScreen from 'views/Authentication/LockScreen'
import ResetPassword from 'views/Authentication/ResetPassword'

import { lazy } from 'react'

// --- Private -----------------------------------------------------------------
export const privateRoutes = [
  { path: 'dashboard', exact: 'true', element: Dashboard },

  //Apps
  { path: 'apps/chat/chats', exact: 'true', element: lazy(() => import('views/Chat/Chats')) },
  { path: 'apps/chat/chat-groups', exact: 'true', element: lazy(() => import('views/Chat/Groups')) },
  { path: 'apps/chat/chat-contact', exact: 'true', element: lazy(() => import('views/Chat/Contact')) },

  { path: 'apps/chat-bot/chatpopup', exact: 'true', element: lazy(() => import('views/ChatPopup/DirectMessage')) },
  { path: 'apps/chat-bot/chatbot', exact: 'true', element: lazy(() => import('views/ChatPopup/ChatBot')) },

  { path: 'apps/calendar', exact: 'true', element: lazy(() => import('views/Calendar')) },

  { path: 'apps/email', exact: 'true', element: lazy(() => import('views/Email')) },

  { path: 'apps/taskboard/projects-board', exact: 'true', element: lazy(() => import('views/Scrumboard/ProjectsBoard')) },
  { path: 'apps/taskboard/kanban-board', exact: 'true', element: lazy(() => import('views/Scrumboard/KanbanBoard/Index')) },
  { path: 'apps/taskboard/pipeline', exact: 'true', element: lazy(() => import('views/Scrumboard/Pipeline')) },

  { path: 'apps/contacts/contact-list', exact: 'true', element: lazy(() => import('views/Contact/ContactList')) },
  { path: 'apps/contacts/contact-cards', exact: 'true', element: lazy(() => import('views/Contact/ContactCards')) },
  { path: 'apps/contacts/edit-contact', exact: 'true', element: lazy(() => import('views/Contact/EditContact')) },

  { path: 'apps/file-manager/list-view', exact: 'true', element: lazy(() => import('views/FileManager/ListView')) },
  { path: 'apps/file-manager/grid-view', exact: 'true', element: lazy(() => import('views/FileManager/GridView')) },

  { path: 'apps/gallery', exact: 'true', element: lazy(() => import('views/Gallery')) },
  { path: 'apps/todo/task-list', exact: 'true', element: lazy(() => import('views/Todo/Tasklist')) },
  { path: 'apps/todo/gantt', exact: 'true', element: lazy(() => import('views/Todo/Gantt')) },

  { path: 'apps/blog/posts', exact: 'true', element: lazy(() => import('views/Blog/Posts')) },
  { path: 'apps/blog/add-new-post', exact: 'true', element: lazy(() => import('views/Blog/AddNewPost')) },
  { path: 'apps/blog/post-detail', exact: 'true', element: lazy(() => import('views/Blog/PostDetails')) },

  { path: 'apps/invoices/invoice-list', exact: 'true', element: lazy(() => import('views/Invoices/InvoiceList')) },
  { path: 'apps/invoices/invoice-templates', exact: 'true', element: lazy(() => import('views/Invoices/InvoiceTemplates')) },
  { path: 'apps/invoices/create-invoice', exact: 'true', element: lazy(() => import('views/Invoices/CreateInvoice')) },
  { path: 'apps/invoices/invoice-preview', exact: 'true', element: lazy(() => import('views/Invoices/PreviewInvoice')) },

  { path: 'apps/integrations/all-apps', exact: 'true', element: lazy(() => import('views/Integrations/All Apps')) },
  { path: 'apps/integrations/integrations-detail', exact: 'true', element: lazy(() => import('views/Integrations/App Details')) },
  { path: 'apps/integrations/integration', exact: 'true', element: lazy(() => import('views/Integrations/Integration')) },
  //Pages
  { path: 'pages/profile', exact: 'true', element: lazy(() => import('views/Profiles/Profile')) },
  { path: 'pages/edit-profile', exact: 'true', element: lazy(() => import('views/Profiles/EditProfile')) },
  { path: 'pages/account', exact: 'true', element: lazy(() => import('views/Profiles/Account')) },

  //Error
  { path: 'error-404', exact: 'true', element: Error404 },
]

// --- Public ------------------------------------------------------------------
export const publicRoutes = [
  { path: '/lock-screen', exact: 'true', element: LockScreen },
  { path: '/reset-password', exact: 'true', element: ResetPassword },
  { path: '/error-503', exact: 'true', element: Error503 },
]
