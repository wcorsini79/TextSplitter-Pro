document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const splitBtn = document.getElementById('splitBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsDiv = document.getElementById('results');
    const copyAllBtn = document.getElementById('copyAllBtn');
    
    splitBtn.addEventListener('click', splitText);
    copyAllBtn.addEventListener('click', copyAllResults);
    
    function splitText() {
        const text = inputText.value.trim();
        const splitType = document.querySelector('input[name="splitType"]:checked').value;
        const maxLength = parseInt(document.getElementById('maxLength').value);
        
        if (!text) {
            showAlert('Please enter some text to split!', 'error');
            return;
        }
        
        if (isNaN(maxLength) || maxLength <= 0) {
            showAlert('Please enter a valid positive number for maximum length!', 'error');
            return;
        }
        
        let chunks = [];
        if (splitType === 'characters') {
            chunks = splitByCharacters(text, maxLength);
        } else {
            chunks = splitByWords(text, maxLength);
        }
        
        displayResults(chunks);
    }
    
    function splitByCharacters(text, maxChars) {
        const chunks = [];
        let start = 0;
        
        while (start < text.length) {
            let end = Math.min(start + maxChars, text.length);
            
            // If we're not at the end and we're not at a space, find the last space
            if (end < text.length) {
                // Find the last space before the max length
                let lastSpace = text.lastIndexOf(' ', end);
                
                // If there's no space in this chunk, look forward for the next space
                if (lastSpace <= start) {
                    lastSpace = text.indexOf(' ', end);
                    if (lastSpace === -1) lastSpace = text.length;
                }
                
                // Adjust the end to the last space to keep words together
                end = lastSpace;
            }
            
            // Add the chunk (from start to end)
            chunks.push(text.substring(start, end).trim());
            
            // Move the start to after the space
            start = end + 1;
        }
        
        return chunks;
    }
    
    function splitByWords(text, maxWords) {
        const words = text.split(/\s+/);
        const chunks = [];
        let currentChunk = [];
        let currentCharCount = 0;
        
        for (const word of words) {
            // If adding this word would exceed maxWords or would make the chunk too long
            if (currentChunk.length >= maxWords || 
                (currentCharCount + word.length > maxWords * 50 && maxWords > 10)) {
                chunks.push(currentChunk.join(' '));
                currentChunk = [];
                currentCharCount = 0;
            }
            
            currentChunk.push(word);
            currentCharCount += word.length + 1; // +1 for the space
        }
        
        if (currentChunk.length > 0) {
            chunks.push(currentChunk.join(' '));
        }
        
        return chunks;
    }
    
    function displayResults(chunks) {
        resultsDiv.innerHTML = '';
        
        if (chunks.length === 0) {
            resultsDiv.innerHTML = '<p class="text-gray-500">No chunks were created.</p>';
            return;
        }
        
        chunks.forEach((chunk, index) => {
            const chunkElement = document.createElement('div');
            chunkElement.className = 'text-chunk p-4 bg-gray-50 rounded-lg relative';
            
            const content = document.createElement('div');
            content.className = 'whitespace-pre-wrap text-gray-700';
            content.textContent = chunk;
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded transition-all flex items-center space-x-1';
            copyBtn.innerHTML = '<i data-feather="copy" class="w-3 h-3"></i><span>Copy</span>';
            copyBtn.addEventListener('click', () => copyToClipboard(chunk, copyBtn));
            
            chunkElement.appendChild(content);
            chunkElement.appendChild(copyBtn);
            resultsDiv.appendChild(chunkElement);
        });
        
        resultsContainer.classList.remove('hidden');
        feather.replace();
    }
    
    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const feedback = document.createElement('span');
            feedback.className = 'copied-feedback absolute top-0 right-0 text-xs bg-green-100 text-green-700 px-2 py-1 rounded';
            feedback.textContent = 'Copied!';
            button.parentNode.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 1500);
        });
    }
    
    function copyAllResults() {
        const chunks = Array.from(document.querySelectorAll('.text-chunk div'))
            .map(el => el.textContent)
            .join('\n\n---\n\n');
        
        copyToClipboard(chunks, copyAllBtn);
    }
    
    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `fixed top-4 right-4 px-4 py-3 rounded-md shadow-lg ${
            type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`;
        alert.textContent = message;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
});