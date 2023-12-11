import HkBadge from 'components/@hk-badge/@hk-badge'
import { useTranslation } from 'react-i18next'
import * as Icons from 'tabler-icons-react'

const Badge = () => {
  return (
    <HkBadge size='sm' bg='pink' soft className='ms-xl-2 ms-auto'>
      hot
    </HkBadge>
  )
}

const IconBadge = (prop) => {
  const { count } = prop
  return (
    <HkBadge bg='primary' size='sm' pill className='position-top-end-overflow'>
      {count}
    </HkBadge>
  )
}

const IconBadge2 = (prop) => {
  const { count } = prop
  return (
    <HkBadge bg='success' soft className='ms-2'>
      {count}
    </HkBadge>
  )
}

const BadgeIndicator = () => {
  return <HkBadge bg='danger' indicator className='position-absolute top-0 start-100' />
}

export const NavMenuConfig = () => {
  const { t } = useTranslation()

  const mainMenuConfig = (name, path) => {
    return {
      name: t(name),
      path: path,
    }
  }

  const appSubMenuConfig = (name, path) => {
    return {
      name: t(name),
      path: path,
      grp_name: 'apps',
    }
  }

  return [
    {
      group: '',
      contents: [
        {
          name: t('Dashboard'),
          icon: <Icons.Template />,
          path: '/dashboard',
          badge: <Badge />,
        },
      ],
    },
    {
      group: 'Apps',
      contents: [
        {
          id: 'dash_scrumboard',
          name: t('Scrumboard'),
          icon: <Icons.LayoutKanban />,
          path: '/apps/taskboard',
          iconBadge: <IconBadge count='3' />,
          childrens: [
            appSubMenuConfig('All Boards', '/apps/taskboard/projects-board'), //
            appSubMenuConfig('Project Kanban', '/apps/taskboard/kanban-board'), //
            appSubMenuConfig('Pipeline Kanban', '/apps/taskboard/pipeline'), //
          ],
        },
        {
          id: 'dash_task',
          name: t('Todo'),
          icon: <Icons.ListDetails />,
          path: '/apps/todo',
          badge: <IconBadge2 />,
          childrens: [
            appSubMenuConfig('Tasklist', '/apps/todo/task-list'), //
            appSubMenuConfig('Gantt', '/apps/todo/gantt'), //
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
          name: t('Gallery'),
          icon: <Icons.Photo />,
          path: '/apps/gallery',
          grp_name: 'apps',
        },
        {
          id: 'dash_chat',
          name: t('Chat'),
          icon: <Icons.MessageDots />,
          path: '/apps/chat',
          childrens: [
            appSubMenuConfig('Chats', '/apps/chat/chats'), //
            appSubMenuConfig('Groups', '/apps/chat/chat-groups'), //
            appSubMenuConfig('Contacts', '/apps/chat/chat-contact'), //
          ],
        },
        {
          id: 'dash_chatpop',
          name: t('Chat Popup'),
          icon: <Icons.MessageCircle />,
          path: '/apps/chat-bot',
          childrens: [
            appSubMenuConfig('Direct Message', '/apps/chat-bot/chatpopup'), //
            appSubMenuConfig('Chatbot', '/apps/chat-bot/chatbot'), //
          ],
        },
        {
          id: 'dash_contact',
          name: t('Contact'),
          icon: <Icons.Notebook />,
          path: '/apps/contacts',
          childrens: [
            appSubMenuConfig('Contact List', '/apps/contacts/contact-list'), //
            appSubMenuConfig('Contact Cards', '/apps/contacts/contact-cards'), //
            appSubMenuConfig('Edit Contact', '/apps/contacts/edit-contact'), //
          ],
        },
        {
          id: 'dash_file',
          name: t('File Manager'),
          icon: <Icons.FileCheck />,
          path: '/apps/file-manager',
          childrens: [
            appSubMenuConfig('List View', '/apps/file-manager/list-view'), //
            appSubMenuConfig('Grid View', '/apps/file-manager/grid-view'), //
          ],
        },
        {
          id: 'dash_blog',
          name: t('Blog'),
          icon: <Icons.Browser />,
          path: '/apps/blog',
          childrens: [
            appSubMenuConfig('Posts', '/apps/blog/posts'), //
            appSubMenuConfig('Add New Post', '/apps/blog/add-new-post'), //
            appSubMenuConfig('Post Detail', '/apps/blog/post-detail'), //
          ],
        },
        {
          id: 'dash_invoice',
          name: t('Invoices'),
          icon: <Icons.FileDigit />,
          path: '/apps/invoices',
          childrens: [
            appSubMenuConfig('Invoice List', '/apps/invoices/invoice-list'), //
            appSubMenuConfig('Invoice Templates', '/apps/invoices/invoice-templates'), //
            appSubMenuConfig('Create Invoice', '/apps/invoices/create-invoice'), //
            appSubMenuConfig('Invoice Preview', '/apps/invoices/invoice-preview'), //
          ],
        },
        {
          id: 'dash_integ',
          name: t('Integrations'),
          icon: <Icons.Code />,
          path: '/apps/integrations',
          childrens: [
            appSubMenuConfig('All Apps', '/apps/integrations/all-apps'), //
            appSubMenuConfig('App Detail', '/apps/integrations/integrations-detail'), //
            appSubMenuConfig('Integrations', '/apps/integrations/integration'), //
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
            mainMenuConfig('Lock Screen', '/auth/lock-screen'), //
            mainMenuConfig('Reset Password', '/auth/reset-password'), //
            mainMenuConfig('Error 404', '/error-404'), //
            mainMenuConfig('Error 503', '/auth/error-503'), //
          ],
        },
        {
          id: 'dash_profile',
          name: t('Profile'),
          icon: <Icons.UserSearch />,
          path: '/pages',
          badgeIndicator: <BadgeIndicator />,
          childrens: [
            appSubMenuConfig('Profile', '/pages/profile'), //
            appSubMenuConfig('Edit Profile', '/pages/edit-profile'), //
            appSubMenuConfig('Account', '/pages/account'), //
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
