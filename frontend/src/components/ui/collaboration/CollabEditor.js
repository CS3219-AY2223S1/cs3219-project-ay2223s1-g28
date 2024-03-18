import { useEffect } from 'react';

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/neo.css'
import 'codemirror/mode/javascript/javascript'

function CollabEditor({ socket, roomId }) {
    useEffect(() => {
        const editor = CodeMirror.fromTextArea(
            document.getElementById('codemirror'),
            {
                lineNumbers: true,
                keyMap: 'sublime',
                theme: 'neo',
                mode: 'javascript'
            }
        );
        
        editor.setSize(null, '100%');
        editor.on('change', (instance, changes) => {
            const { origin } = changes;
            if (origin !== 'setValue') {
                socket.emit('code-changed', roomId, instance.getValue());
            }
        });

        socket.on('update-code', (code) => {
            if (code != null) {
                editor.setValue(code);
            }
        });

        return () => {
            socket.off('connect');
        };
    }, [socket, roomId]);

    return (
        <textarea id='codemirror' />
    );
}

export default CollabEditor;
