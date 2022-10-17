import { useEffect } from 'react';

import io from 'socket.io-client';

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/neo.css'
import 'codemirror/mode/javascript/javascript'

import { URL_COLLAB_SVC } from '../../../configs';

function CollabEditor({ roomId }) {
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

        const socket = io(URL_COLLAB_SVC)

        socket.on('connect', () => {
            socket.emit('join-room', roomId);
        });

        editor.on('change', (instance, changes) => {
            const { origin } = changes;
            if (origin !== 'setValue') {
                socket.emit('code-changed', roomId, instance.getValue());
            }
        });

        socket.on('update-code', (code) => {
            editor.setValue(code);
        });

        return () => {
            socket.off('connect');
            socket.off('update-code');
        };
    }, [roomId]);

    return (
        <textarea id='codemirror' />
    );
}

export default CollabEditor;
