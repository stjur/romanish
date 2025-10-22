const textarea = document.getElementById('romanish-text');

const palatalMap = {
  b: 'ᶀ',
  c: 'ƈ',
  d: 'ᶁ',
  f: 'ᶂ',
  g: 'ᶃ',
  h: 'ꞕ',
  k: 'ᶄ',
  l: 'ᶅ',
  m: 'ᶆ',
  n: 'ᶇ',
  p: 'ᶈ',
  r: 'ᶉ',
  s: 'ᶊ',
  'ʃ': 'ᶋ',
  t: 'ƫ',
  v: 'ᶌ',
  x: 'ᶍ',
  z: 'ᶎ'
};

const altMap = {
  c: 'ç',
  a: 'ă'
};

const altCodeMap = {
  KeyC: 'ç',
  KeyA: 'ă'
};

const physicalKeyMap = {
  'ß': 'ȷ',
  'ẞ': 'ȷ',
  'ö': 'ʃ',
  'Ö': 'Ʃ',
  'ä': 'ꙟ',
  'Ä': 'Ꙟ'
};

const keyboardLayout = {
  numbers: [
    { label: '^', value: '^' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '0', value: '0' },
    { label: 'ȷ', value: 'ȷ' },
    { label: '´', value: '´' },
    { label: '⌫', value: 'backspace', type: 'action', width: 'wide' }
  ],
  top: [
    { label: 'q', value: 'q' },
    { label: 'w', value: 'w' },
    { label: 'e', value: 'e' },
    { label: 'r', value: 'r' },
    { label: 't', value: 't' },
    { label: 'z', value: 'z' },
    { label: 'u', value: 'u' },
    { label: 'i', value: 'i' },
    { label: 'o', value: 'o' },
    { label: 'p', value: 'p' },
    { label: '◌̡', value: 'hook', type: 'hook', width: 'wide' },
    { label: '+', value: '+' }
  ],
  home: [
    { label: 'a', value: 'a' },
    { label: 's', value: 's' },
    { label: 'd', value: 'd' },
    { label: 'f', value: 'f' },
    { label: 'g', value: 'g' },
    { label: 'h', value: 'h' },
    { label: 'j', value: 'j' },
    { label: 'k', value: 'k' },
    { label: 'l', value: 'l' },
    { label: 'ʃ', value: 'ʃ' },
    { label: 'ꙟ', value: 'ꙟ' },
    { label: '#', value: '#' }
  ],
  bottom: [
    { label: '<', value: '<' },
    { label: 'y', value: 'y' },
    { label: 'x', value: 'x' },
    { label: 'c', value: 'c' },
    { label: 'v', value: 'v' },
    { label: 'b', value: 'b' },
    { label: 'n', value: 'n' },
    { label: 'm', value: 'm' },
    { label: ',', value: ',' },
    { label: '.', value: '.' },
    { label: '-', value: '-' }
  ],
  controls: [
    { label: 'Space', value: ' ', type: 'action', width: 'extra-wide' },
    { label: 'Enter', value: '\n', type: 'action', width: 'wide' },
    { label: 'Clear', value: 'clear', type: 'action', width: 'wide' }
  ]
};

function buildKeyboard() {
  const rows = document.querySelectorAll('.keyboard__row');

  rows.forEach((row) => {
    const layout = keyboardLayout[row.dataset.row];
    row.innerHTML = '';

    layout.forEach((keyDef) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('key');

      if (keyDef.width === 'wide') {
        button.classList.add('key--wide');
      }

      if (keyDef.width === 'extra-wide') {
        button.classList.add('key--extra-wide');
      }

      if (keyDef.type === 'action' || keyDef.type === 'hook') {
        button.classList.add('key--special');
      }

      button.textContent = keyDef.label;
      button.dataset.value = keyDef.value;
      button.dataset.type = keyDef.type || 'character';

      button.addEventListener('click', () => handleKeyPress(keyDef));
      row.appendChild(button);
    });
  });
}

function handleKeyPress(keyDef) {
  const { type = 'character', value } = keyDef;

  switch (type) {
    case 'action':
      handleActionKey(value);
      break;
    case 'hook':
      applyPalatalHook();
      break;
    default:
      insertAtCursor(value);
      break;
  }
}

function handleActionKey(action) {
  switch (action) {
    case 'backspace':
      backspaceAtCursor();
      break;
    case 'clear':
      textarea.value = '';
      textarea.focus();
      break;
    default:
      insertAtCursor(action);
      break;
  }
}

function insertAtCursor(text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const current = textarea.value;
  textarea.value = current.slice(0, start) + text + current.slice(end);
  const cursor = start + text.length;
  textarea.setSelectionRange(cursor, cursor);
  textarea.focus();
}

function backspaceAtCursor() {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const current = textarea.value;

  if (start !== end) {
    textarea.value = current.slice(0, start) + current.slice(end);
    textarea.setSelectionRange(start, start);
  } else if (start > 0) {
    textarea.value = current.slice(0, start - 1) + current.slice(end);
    textarea.setSelectionRange(start - 1, start - 1);
  }

  textarea.focus();
}

function applyPalatalHook() {
  let start = textarea.selectionStart;
  let end = textarea.selectionEnd;
  const value = textarea.value;

  if (start !== end) {
    const lastIndex = end - 1;
    if (lastIndex >= start) {
      const targetChar = value[lastIndex];
      const mapped = getPalatalizedChar(targetChar);
      if (mapped) {
        textarea.value = value.slice(0, lastIndex) + mapped + value.slice(end);
        const newPos = lastIndex + 1;
        textarea.setSelectionRange(newPos, newPos);
        textarea.focus();
        return;
      }
    }

    textarea.setSelectionRange(end, end);
    start = end;
  }

  if (start > 0) {
    const prevChar = value[start - 1];
    const mapped = getPalatalizedChar(prevChar);
    if (mapped) {
      textarea.value = value.slice(0, start - 1) + mapped + value.slice(end);
      const newPos = start;
      textarea.setSelectionRange(newPos, newPos);
      textarea.focus();
      return;
    }
  }

  insertAtCursor('◌̡');
}

function getPalatalizedChar(char) {
  if (!char) {
    return null;
  }

  const lower = char.toLowerCase();
  const mapped = palatalMap[lower];
  if (!mapped) {
    return null;
  }

  if (char === lower) {
    return mapped;
  }

  return mapped.toUpperCase();
}

textarea.addEventListener('keydown', (event) => {
  if (event.defaultPrevented) {
    return;
  }

  if (event.altKey && !event.metaKey) {
    const replacement =
      altCodeMap[event.code] ?? altMap[event.key.toLowerCase()];
    if (replacement) {
      event.preventDefault();
      const output = event.shiftKey ? replacement.toUpperCase() : replacement;
      insertAtCursor(output);
    }
    return;
  }

  if (event.ctrlKey || event.metaKey) {
    return;
  }

  if (event.key === 'ü' || event.key === 'Ü') {
    event.preventDefault();
    applyPalatalHook();
    return;
  }

  const mapped = physicalKeyMap[event.key];
  if (mapped) {
    event.preventDefault();
    insertAtCursor(mapped);
  }
});

buildKeyboard();
textarea.focus();
