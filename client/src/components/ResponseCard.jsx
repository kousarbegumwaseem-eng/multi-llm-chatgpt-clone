function ResponseCard({
    title,
    response,
    loading,
    continueChat
}) {
        const copyResponse = () => {

        navigator.clipboard.writeText(response);

        alert('Response copied');
    };

    return (

        <div
            style={{
                flex: 1,
                backgroundColor: '#1f2937',
                padding: '20px',
                borderRadius: '15px',
                minHeight: '250px',
maxHeight: '400px',
overflowY: 'auto'
            }}
        >

           <div
    style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}
>

    <h2>{title}</h2>

    <button
        onClick={copyResponse}
        style={{
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
    >
        Copy
    </button>

</div>

            {
                loading ? (

                    <p>Generating response...</p>

                ) : (

                    <p
    style={{
        whiteSpace: 'pre-wrap',
        lineHeight: '1.6'
    }}
>
    {response}
</p>

                )
            }

            <button
    onClick={() => continueChat(title)}

    style={{
        marginTop: '20px',
        padding: '10px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: 'white',
        cursor: 'pointer',
        width: '100%'
    }}
>
    Continue with {title}
</button>

        </div>
    );
}

export default ResponseCard;