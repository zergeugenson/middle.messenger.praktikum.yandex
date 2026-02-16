import ChatsApi from '@/api/chats'

const chatsApi = new ChatsApi()

const getChats = async (): Promise<any[]> => {
  const chatsRaw = await chatsApi.chats()

  const chats = chatsRaw.map((i: any) => ({
    ...i,
    last_message: i?.last_message
      ? {
          ...i?.last_message,
          time: new Date(i?.last_message?.time)?.toLocaleString?.()
        }
      : undefined
  }))

  window.store.set({ chats })
  return chats
}


export { getChats }
