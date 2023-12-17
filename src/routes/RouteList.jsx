import AddNewPost from 'views/Blog/AddNewPost'
import PostDetail from 'views/Blog/PostDetails'
import Posts from 'views/Blog/Posts'
import Calendar from 'views/Calendar'
import Chats from 'views/Chat/Chats'
import ChatContacts from 'views/Chat/Contact'
import ChatGroups from 'views/Chat/Groups'
import ChatBot from 'views/ChatPopup/ChatBot'
import ChatPopup from 'views/ChatPopup/DirectMessage'
import ContactCards from 'views/Contact/ContactCards'
import ContactList from 'views/Contact/ContactList'
import EditContact from 'views/Contact/EditContact'
import Dashboard from 'views/Dashboard'
import Email from 'views/Email'
import GridView from 'views/FileManager/GridView'
import ListView from 'views/FileManager/ListView'
import Gallery from 'views/Gallery'
import AllApps from 'views/Integrations/All Apps'
import IntegrationsDetail from 'views/Integrations/App Details'
import Integration from 'views/Integrations/Integration'
import CreateInvoice from 'views/Invoices/CreateInvoice'
import InvoiceList from 'views/Invoices/InvoiceList'
import InvoiceTemplates from 'views/Invoices/InvoiceTemplates'
import PreviewInvoice from 'views/Invoices/PreviewInvoice'
import KanbanBoard from 'views/Scrumboard/KanbanBoard/Index'
import Pipeline from 'views/Scrumboard/Pipeline'
import ProjectsBoard from 'views/Scrumboard/ProjectsBoard'
import Gantt from 'views/Todo/Gantt'
import TaskList from 'views/Todo/Tasklist'
//Pages
import Account from 'views/Profiles/Account'
import EditProfile from 'views/Profiles/EditProfile'
import Profile from 'views/Profiles/Profile'
//Auth
import Error404 from 'views/Authentication/Error404/Error404'
import Error503 from 'views/Authentication/Error503/Error503'
import LockScreen from 'views/Authentication/LockScreen'
import ResetPassword from 'views/Authentication/ResetPassword'

// --- Private -----------------------------------------------------------------
export const privateRoutes = [
  { path: 'dashboard', exact: 'true', element: Dashboard },
  //Apps
  { path: 'apps/chat/chats', exact: 'true', element: Chats },
  { path: 'apps/chat/chat-groups', exact: 'true', element: ChatGroups },
  { path: 'apps/chat/chat-contact', exact: 'true', element: ChatContacts },
  { path: 'apps/chat-bot/chatpopup', exact: 'true', element: ChatPopup },
  { path: 'apps/chat-bot/chatbot', exact: 'true', element: ChatBot },
  { path: 'apps/calendar', exact: 'true', element: Calendar },
  { path: 'apps/email', exact: 'true', element: Email },
  { path: 'apps/taskboard/projects-board', exact: 'true', element: ProjectsBoard },
  { path: 'apps/taskboard/kanban-board', exact: 'true', element: KanbanBoard },
  { path: 'apps/taskboard/pipeline', exact: 'true', element: Pipeline },
  { path: 'apps/contacts/contact-list', exact: 'true', element: ContactList },
  { path: 'apps/contacts/contact-cards', exact: 'true', element: ContactCards },
  { path: 'apps/contacts/edit-contact', exact: 'true', element: EditContact },
  { path: 'apps/file-manager/list-view', exact: 'true', element: ListView },
  { path: 'apps/file-manager/grid-view', exact: 'true', element: GridView },
  { path: 'apps/gallery', exact: 'true', element: Gallery },
  { path: 'apps/todo/task-list', exact: 'true', element: TaskList },
  { path: 'apps/todo/gantt', exact: 'true', element: Gantt },
  { path: 'apps/blog/posts', exact: 'true', element: Posts },
  { path: 'apps/blog/add-new-post', exact: 'true', element: AddNewPost },
  { path: 'apps/blog/post-detail', exact: 'true', element: PostDetail },
  { path: 'apps/invoices/invoice-list', exact: 'true', element: InvoiceList },
  { path: 'apps/invoices/invoice-templates', exact: 'true', element: InvoiceTemplates },
  { path: 'apps/invoices/create-invoice', exact: 'true', element: CreateInvoice },
  { path: 'apps/invoices/invoice-preview', exact: 'true', element: PreviewInvoice },
  { path: 'apps/integrations/all-apps', exact: 'true', element: AllApps },
  { path: 'apps/integrations/integrations-detail', exact: 'true', element: IntegrationsDetail },
  { path: 'apps/integrations/integration', exact: 'true', element: Integration },
  //Pages
  { path: 'pages/profile', exact: 'true', element: Profile },
  { path: 'pages/edit-profile', exact: 'true', element: EditProfile },
  { path: 'pages/account', exact: 'true', element: Account },
  //Error
  { path: 'error-404', exact: 'true', element: Error404 },
]

// --- Public ------------------------------------------------------------------
export const publicRoutes = [
  { path: '/lock-screen', exact: 'true', element: LockScreen },
  { path: '/reset-password', exact: 'true', element: ResetPassword },
  { path: '/error-503', exact: 'true', element: Error503 },
]
