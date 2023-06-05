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
    const categoryCard = btn.closest('.card');
    const editForm = categoryCard.querySelector('.edit-form');
    const categoryId = categoryCard.dataset.categoryId;
    const editTitle = categoryCard.querySelector('#editTitle').value;
    const editPublished = categoryCard.querySelector('#editPublished').value;
    const editDescription = categoryCard.querySelector('#editDescription').value;
    updateCategory(categoryId, editTitle, editPublished, editDescription); // Pass the categoryId to the updateCategory function
    editForm.classList.add('d-none'); // Hide the edit fields
  });
});


// Add event listener to the add category button
const addCategoryBtn = document.getElementById('addCategoryBtn');
addCategoryBtn.addEventListener('click', function() {
  const addCategoryForm = document.getElementsByClassName('add-category-form')[0];
  addCategoryForm.classList.toggle('d-none');
});

// Add event listeners to the delete buttons
const deleteBtns = document.getElementsByClassName('delete-btn');
Array.from(deleteBtns).forEach(btn => {
  btn.addEventListener('click', async function() {
    const deleteForm = this.parentElement;
    const categoryId = deleteForm.closest('.card').dataset.categoryId;
    const confirmation = confirm('Are you sure you want to delete this category?');
    if (confirmation) {
      try {
        const response = await fetch(`/categories/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete category');
        }
        console.log('Category Deleted Successfully')
        location.reload(); // Reload the page after successful deletion
      } catch (error) {
        console.error(error);
        alert('Failed to delete category');
      }
    }
  });
});

// Function to update a category
const updateCategory = async (categoryId, updatedTitle, updatedPublished, updatedDescription) => {
  try {
    console.log('Category Updated Successfully');
    const response = await fetch(`/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: updatedTitle,
        published: updatedPublished,
        description: updatedDescription
      })
    });
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
    const data = await response.json();
    console.log(data.message);
    // Update the category details in the UI
    const categoryCard = document.querySelector(`.card[data-category-id="${categoryId}"]`);
    if (categoryCard) {
      const cardTitle = categoryCard.querySelector('.card-title');
      const cardPublished = categoryCard.querySelector('.card-published');
      const cardDescription = categoryCard.querySelector('.card-description');
      cardTitle.textContent = updatedTitle;
      cardPublished.textContent = `Published: ${updatedPublished}`;
      cardDescription.textContent = updatedDescription;
      const editForm = categoryCard.querySelector('.edit-form');
      editForm.classList.toggle('d-none');
    }
    console.log('Category Updated Successfully');
    const saveBtn = categoryCard.querySelector('.save-btn');
    saveBtn.removeEventListener('click', updateCategory);
  } catch (error) {
    console.error(error);
  }
};
