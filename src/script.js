const addNoteBtnEl = document.getElementById('add_note');
const noteContainerEl = document.querySelector('.notes');

addNoteBtnEl.addEventListener('click', () => {
  addNote();
});

(function () {
  const lsNotes = JSON.parse(localStorage.getItem('notes'));
  console.log(lsNotes);
  if (lsNotes.length === 0 || !lsNotes) {
    addNote();
  } else {
    lsNotes.forEach((text) => addNote(text));
  }
})();

function addNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
  <div class="tool">
    <i class="save ri-save-line"></i>
    <i class="trash ri-delete-bin-line"></i>
  </div>
  <textarea>${text}</textarea>
  `;

  note.querySelector('.trash').addEventListener('click', () => {
    note.remove();
    saveNote();
  });

  note.querySelector('.save').addEventListener('click', saveNote);

  noteContainerEl.appendChild(note);
  saveNote();
}

function saveNote() {
  const notes = document.querySelectorAll('.note textarea');
  const data = [];
  notes.forEach((note) => data.push(note.value));

  if (localStorage.length === 0) {
    localStorage.removeItem('notes');
  } else {
    localStorage.setItem('notes', JSON.stringify(data));
  }
}
