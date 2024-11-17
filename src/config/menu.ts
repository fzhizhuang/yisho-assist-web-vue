interface Menu {
  icon: string
  name: string
  path: string
}

export const menuList: Menu[] = [
  {
    icon: 'icon-chat',
    name: 'Ai聊天',
    path: '/chat'
  },
 {
    icon: 'icon-image',
    name: 'Ai绘画',
    path: '/image'
  },
  {
    icon: 'icon-app',
    name: '应用中心',
    path: '/assist'
  },
  {
    icon: 'icon-shop',
    name: '商城',
    path: '/shop'
  }
]
