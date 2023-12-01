import HkBadge from 'components/@hk-badge/@hk-badge'
import { useTranslation } from 'react-i18next'
import * as Icons from 'tabler-icons-react'

export const NavMenu = () => {
  const { t } = useTranslation()
  return [
    {
      group: '',
      contents: [
        {
          name: t('Dashboard'),
          icon: <Icons.Template />,
          path: '/dashboard',
          badge: (
            <HkBadge size='sm' bg='pink' soft className='ms-xl-2 ms-auto'>
              hot
            </HkBadge>
          ),
        },
      ],
    },
    {
      group: 'Apps',
      contents: [
        {
          id: 'dash_chat',
          name: t('Chat'),
          icon: <Icons.MessageDots />,
          path: '/apps/chat',
          childrens: [
            {
              name: t('Chats'),
              path: '/apps/chat/chats',
              grp_name: 'apps',
            },
            {
              name: t('Groups'),
              path: '/apps/chat/chat-groups',
              grp_name: 'apps',
            },
            {
              name: t('Contacts'),
              path: '/apps/chat/chat-contact',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_chatpop',
          name: t('Chat Popup'),
          icon: <Icons.MessageCircle />,
          path: '/apps/chat-bot',
          childrens: [
            {
              name: t('Direct Message'),
              path: '/apps/chat-bot/chatpopup',
              grp_name: 'apps',
            },
            {
              name: t('Chatbot'),
              path: '/apps/chat-bot/chatbot',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_chatpop',
          name: t('Calendar'),
          icon: <Icons.CalendarTime />,
          path: '/apps/calendar',
          grp_name: 'apps',
        },
        {
          name: t('Email'),
          icon: <Icons.Inbox />,
          path: '/apps/email',
          grp_name: 'apps',
        },
        {
          id: 'dash_scrumboard',
          name: t('Scrumboard'),
          icon: <Icons.LayoutKanban />,
          path: '/apps/taskboard',
          iconBadge: (
            <HkBadge bg='primary' size='sm' pill className='position-top-end-overflow'>
              3
            </HkBadge>
          ),
          childrens: [
            {
              name: t('All Boards'),
              path: '/apps/taskboard/projects-board',
              grp_name: 'apps',
            },
            {
              name: t('Project Kanban'),
              path: '/apps/taskboard/kanban-board',
              grp_name: 'apps',
            },
            {
              name: t('Pipeline Kanban'),
              path: '/apps/taskboard/pipeline',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_contact',
          name: t('Contact'),
          icon: <Icons.Notebook />,
          path: '/apps/contacts',
          childrens: [
            {
              name: t('Contact List'),
              path: '/apps/contacts/contact-list',
              grp_name: 'apps',
            },
            {
              name: t('Contact Cards'),
              path: '/apps/contacts/contact-cards',
              grp_name: 'apps',
            },
            {
              name: t('Edit Contact'),
              path: '/apps/contacts/edit-contact',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_file',
          name: t('File Manager'),
          icon: <Icons.FileCheck />,
          path: '/apps/file-manager',
          childrens: [
            {
              name: t('List View'),
              path: '/apps/file-manager/list-view',
              grp_name: 'apps',
            },
            {
              name: t('Grid View'),
              path: '/apps/file-manager/grid-view',
              grp_name: 'apps',
            },
          ],
        },
        {
          name: t('Gallery'),
          icon: <Icons.Photo />,
          path: '/apps/gallery',
          grp_name: 'apps',
        },
        {
          id: 'dash_task',
          name: t('Todo'),
          icon: <Icons.ListDetails />,
          path: '/apps/todo',
          badge: (
            <HkBadge bg='success' soft className='ms-2'>
              2
            </HkBadge>
          ),
          childrens: [
            {
              name: t('Tasklist'),
              path: '/apps/todo/task-list',
              grp_name: 'apps',
            },
            {
              name: t('Gantt'),
              path: '/apps/todo/gantt',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_blog',
          name: t('Blog'),
          icon: <Icons.Browser />,
          path: '/apps/blog',
          childrens: [
            {
              name: t('Posts'),
              path: '/apps/blog/posts',
              grp_name: 'apps',
            },
            {
              name: t('Add New Post'),
              path: '/apps/blog/add-new-post',
              grp_name: 'apps',
            },
            {
              name: t('Post Detail'),
              path: '/apps/blog/post-detail',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_invoice',
          name: t('Invoices'),
          icon: <Icons.FileDigit />,
          path: '/apps/invoices',
          childrens: [
            {
              name: t('Invoice List'),
              path: '/apps/invoices/invoice-list',
              grp_name: 'apps',
            },
            {
              name: t('Invoice Templates'),
              path: '/apps/invoices/invoice-templates',
              grp_name: 'apps',
            },
            {
              name: t('Create Invoice'),
              path: '/apps/invoices/create-invoice',
              grp_name: 'apps',
            },
            {
              name: t('Invoice Preview'),
              path: '/apps/invoices/invoice-preview',
              grp_name: 'apps',
            },
          ],
        },
        {
          id: 'dash_integ',
          name: t('Integrations'),
          icon: <Icons.Code />,
          path: '/apps/integrations',
          childrens: [
            {
              name: t('All Apps'),
              path: '/apps/integrations/all-apps',
              grp_name: 'apps',
            },
            {
              name: t('App Detail'),
              path: '/apps/integrations/integrations-detail',
              grp_name: 'apps',
            },
            {
              name: t('Integrations'),
              path: '/apps/integrations/integration',
              grp_name: 'apps',
            },
          ],
        },
      ],
    },

    {
      group: 'Pages',
      contents: [
        {
          id: 'dash_pages',
          name: t('Authentication'),
          icon: <Icons.UserPlus />,
          path: '/auth',
          childrens: [
            {
              id: 'dash_log',
              name: t('Log In'),
              path: '/auth',
              childrens: [
                {
                  name: t('Login'),
                  path: '/auth/login',
                },
                {
                  name: t('Login Simple'),
                  path: '/auth/login-simple',
                },
                {
                  name: t('Login Classic'),
                  path: '/auth/login-classic',
                },
              ],
            },
            {
              id: 'dash_sign',
              name: t('Sign Up'),
              path: '/auth',
              childrens: [
                {
                  name: t('Signup'),
                  path: '/auth/signup',
                },
                {
                  name: t('Signup Simple'),
                  path: '/auth/signup-simple',
                },
                {
                  name: t('Signup Classic'),
                  path: '/auth/signup-classic',
                },
              ],
            },
            {
              name: t('Lock Screen'),
              path: '/auth/lock-screen',
            },
            {
              name: t('Reset Password'),
              path: '/auth/reset-password',
            },
            {
              name: t('Error 404'),
              path: '/error-404',
            },
            {
              name: t('Error 503'),
              path: '/auth/error-503',
            },
          ],
        },
        {
          id: 'dash_profile',
          name: t('Profile'),
          icon: <Icons.UserSearch />,
          path: '/pages',
          badgeIndicator: <HkBadge bg='danger' indicator className='position-absolute top-0 start-100' />,
          childrens: [
            {
              name: t('Profile'),
              path: '/pages/profile',
              grp_name: 'apps',
            },
            {
              name: t('Edit Profile'),
              path: '/pages/edit-profile',
              grp_name: 'apps',
            },
            {
              name: t('Account'),
              path: '/pages/account',
              grp_name: 'apps',
            },
          ],
        },
      ],
    },

    {
      group: 'Documentation',
      contents: [
        {
          name: t('Documentation'),
          icon: <Icons.FileCode2 />,
          path: 'https://nubra-ui-react.netlify.app/introduction',
        },
        {
          name: t('Components'),
          icon: <Icons.Layout />,
          path: 'https://nubra-ui-react.netlify.app/avatar',
        },
      ],
    },
  ]
}
