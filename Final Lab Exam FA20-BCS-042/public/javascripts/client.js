
// Add event listeners to the edit buttons
const editBtns = document.getElementsByClassName('edit-btn');
Array.from(editBtns).forEach(btn => {
  btn.addEventListener('click', function() {
    const cardBody = this.parentElement;
    const editForm = cardBody.querySelector('.edit-form');
    editForm.classList.toggle('d-none');
  });
});

const saveBtns = document.querySelectorAll('.save-btn');
saveBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const gameCard = btn.closest('.card');
    const gameId = gameCard.dataset.gameId; // Extract the gameId from the dataset
    const editName = gameCard.querySelector('#editName').value;
    const editPrice = gameCard.querySelector('#editPrice').value;
    updateGame(gameId, editName, editPrice); // Pass the gameId to the updateGame function
  });
});


// Add event listener to the add game button
const addGameBtn = document.getElementById('addGameBtn');
addGameBtn.addEventListener('click', function() {
  const addGameForm = document.getElementsByClassName('add-game-form')[0];
  addGameForm.classList.toggle('d-none');
});

// Add event listeners to the delete buttons
const deleteBtns = document.getElementsByClassName('delete-btn');
Array.from(deleteBtns).forEach(btn => {
  btn.addEventListener('click', async function() {
    const deleteForm = this.parentElement;
    const gameId = deleteForm.closest('.card').dataset.gameId;
    const confirmation = confirm('Are you sure you want to delete this game?');
    if (confirmation) {
      try {
        const response = await fetch(`/games/${gameId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
          
        });
        if (!response.ok) {
          throw new Error('Failed to delete game');
        }
        console.log('Game Deleted Successfully')
        location.reload(); // Reload the page after successful deletion
      } catch (error) {
        console.error(error);
        alert('Failed to delete game');
      }
    }
  });
});

// Function to update a game
const updateGame = async (gameId, updatedName, updatedPrice) => {
  try {
    console.log('Game Updated Successfully')
    const response = await fetch(`/games/${gameId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: updatedName,
          price: updatedPrice
        })
      });
    if (!response.ok) {
      throw new Error('Failed to update game');
    }
    const data = await response.json();
    console.log(data.message);
    // Update the game details in the UI
    const gameCard = document.querySelector(`.card[data-game-id="${gameId}"]`);
    if (gameCard) {
      const cardTitle = gameCard.querySelector('.card-title');
      const cardPrice = gameCard.querySelector('.card-text');
      cardTitle.textContent = updatedName;
      cardPrice.textContent = `Price: ${updatedPrice}`;
      gameCard.querySelector('.edit-form').classList.add('d-none');
    }
    console.log('Game Updated Successfully')
  } catch (error) {
    console.error(error);
  }
};

// Event listener for save button
// Event listener for save button
