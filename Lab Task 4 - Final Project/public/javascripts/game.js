// Edit Button
const editBtns = document.getElementsByClassName('edit-btn');
Array.from(editBtns).forEach(btn => {
  btn.addEventListener('click', function() {
    const cardBody = this.parentElement;
    const editForm = cardBody.querySelector('.edit-form');
    editForm.classList.toggle('d-none');
  });
});

// Save Button
const saveBtns = document.querySelectorAll('.save-btn');
saveBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const gameCard = btn.closest('.card');
    const gameId = gameCard.dataset.gameId; 
    const editName = gameCard.querySelector('#editName').value;
    const editPrice = gameCard.querySelector('#editPrice').value;
    const editCategory = gameCard.querySelector('#editCategory').value;
    const editDescription = gameCard.querySelector('#editDescription').value;
    const editImageURL = gameCard.querySelector('#editImageURL').value;
    updateGame(gameId, editName, editPrice, editCategory, editDescription, editImageURL);
  });
});

// Add Button
const addGameBtn = document.getElementById('addGameBtn');
addGameBtn.addEventListener('click', function() {
  const addGameForm = document.getElementsByClassName('add-game-form')[0];
  addGameForm.classList.toggle('d-none');
});


