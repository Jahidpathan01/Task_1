document.getElementById('translation-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const inputText = document.getElementById('input-text').value;
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    
    if (!inputText.trim()) {
        alert('Please enter text to translate.');
        return;
    }
    
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(inputText)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Translation failed');
        }
        
        const data = await response.json();
        const translatedText = data[0][0][0];
        document.getElementById('translated-text').textContent = translatedText;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('translated-text').textContent = 'Translation failed. Please try again.';
    }
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const translatedText = document.getElementById('translated-text').textContent;
    navigator.clipboard.writeText(translatedText).then(function() {
        alert('Translated text copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});

document.getElementById('speak-btn').addEventListener('click', function() {
    const translatedText = document.getElementById('translated-text').textContent;
    if (translatedText && translatedText !== 'Translation failed. Please try again.') {
        const utterance = new SpeechSynthesisUtterance(translatedText);
        window.speechSynthesis.speak(utterance);
    }
});
