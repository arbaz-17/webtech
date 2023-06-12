// Edit Button
const editBtns = document.getElementsByClassName('edit-btn');
Array.from(editBtns).forEach(btn => {
  btn.addEventListener('click', function() {
    const cardBody = this.parentElement;
    const editForm = cardBody.querySelector('.edit-form');
    editForm.classList.toggle('d-none');
  });
});

//Save Button
const saveBtns = document.querySelectorAll('.save-btn');
saveBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const consoleId = card.dataset.consoleId;
    const editName = card.querySelector('#editName').value;
    const editCategory = card.querySelector('#editCategory').value;
    const editPrice = card.querySelector('#editPrice').value;
    const editDescription = card.querySelector('#editDescription').value;
    const editImageURL = card.querySelector('#editImageURL').value;

    updateConsole(consoleId, editName, editCategory, editPrice, editDescription, editImageURL);
  });
});

// Add Button
const addConsoleBtn = document.getElementById('addConsoleBtn');
if (addConsoleBtn) {
  addConsoleBtn.addEventListener('click', function() {
    const addConsoleForm = document.querySelector('.add-console-form');
    if (addConsoleForm) {
      addConsoleForm.classList.toggle('d-none');
    }
  });
}
