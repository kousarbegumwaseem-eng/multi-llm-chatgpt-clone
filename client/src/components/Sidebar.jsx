function Sidebar({
    history,
    loadChat,
    newChat,
    deleteChat
}) {

    return (

        <div
            style={{
    width: '300px',
    backgroundColor: '#0f172a',
    color: 'white',
    padding: '20px',
    minHeight: '100vh',
    borderRight: '1px solid #1f2937',
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
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '25px',
    fontSize: '15px',
    transition: '0.3s'
    
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
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '12px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: '0.3s'
}}
>

    {/* Prompt */}
<div
    onClick={() => loadChat(chat)}
    style={{
        cursor: 'pointer',
        flex: 1
    }}
>

    <p
        style={{
            margin: 0,
            fontSize: '14px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '180px'
        }}
    >
        {chat.prompt}
    </p>

</div>

    {/* Delete Button */}
  <button
    onClick={(e) => {

        e.stopPropagation();

        deleteChat(chat.id);
    }}

    style={{
    backgroundColor: '#334155',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '6px 10px',
    fontWeight: 'bold',
    fontSize: '13px'
}}
>
    🗑
</button>

</div>

                    ))
                }

            </div>

        </div>
    );
}

export default Sidebar;