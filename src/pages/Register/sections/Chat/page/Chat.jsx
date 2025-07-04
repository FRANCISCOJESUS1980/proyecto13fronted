import React from 'react'
import './Chat.css'
import Header from '../../../../../components/Header/page/Header'
import Loading from '../../../../../components/Loading/loading'
import ChatHeader from '../components/ChatHeader'
import ChatMainContent from '../components/ChatContent'
import { ChatProvider } from '../context/ChatContext'
import { useChatOptimized } from '../hooks/useChatOptimized'

const ChatInner = React.memo(() => {
  const { isLoading, animationComplete } = useChatOptimized()

  if (isLoading) {
    return (
      <Loading
        isVisible={isLoading}
        loadingText='CARGANDO CHAT...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div
      className={`cf-chat-container ${
        animationComplete ? 'cf-chat-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-chat-main-content'>
        <ChatHeader />
        <ChatMainContent />
      </div>
    </div>
  )
})

ChatInner.displayName = 'ChatInner'

const Chat = () => {
  return (
    <ChatProvider>
      <ChatInner />
    </ChatProvider>
  )
}

export default Chat
