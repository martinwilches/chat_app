import ChatWindow from '../../components/ChatWindow/ChatWindow'
import Sidebar from '../../components/Sidebar/Sidebar'

const Chat: React.FC = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-full sm:w-1/3 max-w-114 min-h-screen">
                    <Sidebar />
                </div>
                <div className="hidden flex-1 min-h-screen sm:flex">
                    <ChatWindow />
                </div>
            </div>
        </>
    )
}

export default Chat
