function Sidebar({
    history,
    loadChat,
    newChat,
    deleteChat
}) {

    return (

        <div
            style={{
                width: '250px',
                backgroundColor: '#1f2937',
                padding: '20px',
                color: 'white',
                height: '100vh',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}
        >

            {/* Title */}
            <h2 style={{ marginBottom: '20px' }}>
                Multi LLM
            </h2>

            {/* New Chat Button */}
            <button
                onClick={newChat}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                + New Chat
            </button>

            {/* History */}
            <div style={{ marginTop: '30px' }}>

                <h3>Previous Chats</h3>

                {
                    history.map((chat) => (

                        <div
    key={chat.id}
    style={{
        marginTop: '15px',
        padding: '12px',
        backgroundColor: '#374151',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
    }}
>

    {/* Prompt */}
    <div
        onClick={() => loadChat(chat)}
        style={{
            cursor: 'pointer',
            flex: 1,
            wordBreak: 'break-word'
        }}
    >
        {chat.prompt}
    </div>

    {/* Delete Button */}
  <button
    onClick={(e) => {

        e.stopPropagation();

        deleteChat(chat.id);
    }}

    style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '5px 8px'
    }}
>
    X
</button>

</div>

                    ))
                }

            </div>

        </div>
    );
}

export default Sidebar;