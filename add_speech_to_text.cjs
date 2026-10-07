const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// 1. Add Mic to imports
code = code.replace(
  "import { Bot, X, Send, User, Sparkles, MessageSquare, Plus } from 'lucide-react';",
  "import { Bot, X, Send, User, Sparkles, MessageSquare, Plus, Mic } from 'lucide-react';"
);

// 2. Add state
code = code.replace(
  "const [showAttachMenu, setShowAttachMenu] = useState(false);",
  "const [showAttachMenu, setShowAttachMenu] = useState(false);\n  const [isListening, setIsListening] = useState(false);"
);

// 3. Add Speech Recognition logic before handleSend
const speechLogic = `
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Spraakherkenning wordt helaas niet ondersteund in deze browser. Gebruik Google Chrome.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL';
    recognition.interimResults = true;
    recognition.continuous = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      // If it's final, append it. If interim, we could show it live, but appending on final is safer.
      // For a simple implementation, let's just overwrite the input text while talking, or append if there was already text.
      
      // Let's get the final transcript
      if (event.results[0].isFinal) {
         setInputText(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[0][0].transcript);
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech error", event);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
`;

code = code.replace(
  "const handleSend = async () => {",
  speechLogic + "\n  const handleSend = async () => {"
);

// 4. Add the Mic button next to the input field
// The input area has a gap: '8px'
const oldTextarea = `<textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Zeg iets tegen de cliënt..."`;

const newTextarea = `<button
          onClick={isListening ? undefined : startListening}
          title="Spraakgestuurd typen"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '22px',
            background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
            color: isListening ? '#ef4444' : 'var(--text-muted)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s',
            animation: isListening ? 'pulse 1.5s infinite' : 'none'
          }}
        >
          <Mic size={20} />
        </button>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Aan het luisteren..." : "Zeg iets tegen de cliënt..."}`;

code = code.replace(oldTextarea, newTextarea);

fs.writeFileSync('src/components/Speelbot.jsx', code);
