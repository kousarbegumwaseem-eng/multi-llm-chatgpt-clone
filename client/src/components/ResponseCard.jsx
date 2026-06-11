import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
function ResponseCard({
    title,
    response,
    loading,
    continueChat
}) {
        const [displayedText, setDisplayedText] = useState('');
        useEffect(() => {

    let index = 0;

    setDisplayedText('');

    const interval = setInterval(() => {

        setDisplayedText(
            response.slice(0, index)
        );

        index++;

        if (index > response.length) {

            clearInterval(interval);
        }

    }, 20);

    return () => clearInterval(interval);

}, [response]);
        const copyResponse = () => {

        navigator.clipboard.writeText(response);

        alert('Response copied successfully.');
    };

    return (

        <div
            style={{
                flex: 1,
                minWidth: '300px',
                maxWidth: '500px',
               backgroundColor: '#0f172a',
                padding: '20px',
               borderRadius: '18px',
               boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                minHeight: '250px',
                maxHeight: '400px',
                overflowY: 'auto'
            }}
        >

           <div
    style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    paddingBottom: '10px',
    borderBottom: '1px solid #374151'
}}
>

   <h2
    style={{
        fontSize: '20px',
        margin: 0,
        color: '#f8fafc',
        fontWeight: 'bold'
    }}
>
    {title === 'ChatGPT' && '🤖 '}
{title === 'Gemini' && '✨ '}
{title === 'Claude' && '🧠 '}
{title}
</h2>

    <button
        onClick={copyResponse}
      style={{
    padding: '8px 14px',
    border: '1px solid #374151',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: '0.3s',
    backgroundColor: '#111827',
    color: 'white'
}}
    >
        Copy
    </button>

</div>

            {
                loading ? (

                    <p
    style={{
        color: '#94a3b8',
        fontStyle: 'italic',
        lineHeight: '1.8'
    }}
>
    AI is generating response...
</p>

                ) : (

                    <div
    style={{
        lineHeight: '1.8',
        fontSize: '15px',
        color: '#e5e7eb'
    }}
>
   <ReactMarkdown>
    {displayedText}
   </ReactMarkdown>
</div>

                )
            }

            <button
    onClick={() => continueChat(title)}

   style={{
    marginTop: '20px',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    width: '100%',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: '0.3s',
}}
>
    Continue with {title}
</button>

        </div>
    );
}

export default ResponseCard;