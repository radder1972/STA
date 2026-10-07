const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

const oldLogic = `      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      // If it's final, append it. If interim, we could show it live, but appending on final is safer.
      // For a simple implementation, let's just overwrite the input text while talking, or append if there was already text.
      
      // Let's get the final transcript
      if (event.results[0].isFinal) {
         setInputText(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[0][0].transcript);
      }`;

const newLogic = `      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setInputText(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[i][0].transcript);
        }
      }`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/Speelbot.jsx', code);
