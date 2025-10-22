# Romanish Keyboard

An on-screen keyboard for the fictional Romanish language, inspired by the German QWERTZ layout. The project mirrors the experience of the Romanian to Cyrillic tool while adapting the keyboard to Romanish characters.

## Features

- Custom keys replacing the German-specific characters:
  - `ȷ` replaces `ß`
  - `ʃ` replaces `ö`
  - `ꙟ` replaces `ä`
  - `◌̡` replaces `ü` and applies palatal hook transformations when possible
- Palatal hook key automatically converts supported consonants (e.g. `n` → `ᶇ`, `ʃ` → `ᶋ`). When no conversion is available, the standalone diacritic is inserted.
- Keyboard shortcuts for additional glyphs:
  - <kbd>Alt</kbd> + <kbd>C</kbd> inserts `ç`
  - <kbd>Alt</kbd> + <kbd>A</kbd> inserts `ă`
- Interactive on-screen keyboard with backspace, enter, space, and clear controls.
- Physical keyboard support mapping `ß`, `ö`, and `ä` to their Romanish counterparts and using `ü` for the palatal hook action.

Open `index.html` in a browser to start typing in Romanish.
