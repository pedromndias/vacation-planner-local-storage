// Let's grab the form element:
const addItems = document.querySelector('.add-items');
// And grab the tapas list:
const itemsList = document.querySelector('.plates');
// Our array will be an array of objects, containing the name of the tapa and its status (done or not):
const items = JSON.parse(localStorage.getItem("items")) || [];

// Let's grab the two buttons:
const checkBtn = document.getElementById("check-btn")
const deleteBtn = document.getElementById("delete-btn")

// Let's create the function to add an item:
function addItem(e) {
  // We need to prevent the page from reloading uppon submitting:
  e.preventDefault()
  // Now let's look for something with the "name" attribute of "item", on "this" form. We need to get its value:
  const text = (this.querySelector("[name=item]")).value
  // Now let's create an object with that item:
  const item = {
    text, // Same as "text: text"
    done: false
  }

  // Now we push the item to the items array:
  items.push(item)

  // Let's call the function to display the items:
  populateList(items, itemsList)
  // Let's set the items array to local storage. Remember to stringify:
  localStorage.setItem('items', JSON.stringify(items));

  // We can also clear the input:
  this.reset()

  
  console.log(item)

}

// The next function will display the list on the page. Note it has an empty array as argument so it does not break in case we don't pass any value:
function populateList(plates = [], platesList) {
  // We will map through the array and return HTML to the platesList:
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

// The next function will work with the checkbox to remove the tapa from the HTML:
function toggleDone(e) {
  if(!e.target.matches("input")) return // Skip this unless it's an input
  // If it matches, we will change the done to true/false:
  const el = e.target
  const index = el.dataset.index //Note the data set that we created on the mapping
  items[index].done = !items[index].done
  // We also need to add the item to update the item on localStorage:
  localStorage.setItem('items', JSON.stringify(items));
  // And re render the HTML:
  populateList(items, itemsList)

}
// The function above uses event delegation, together with the event listener. It listens for something higher and then inside of it we check if that is the target we want.

// The next function will check/unckeck all the items when called:
function checkAll() {
  let someIsChecked = items.some(item => item.done)
  if(someIsChecked) {
    items.forEach(item => item.done = false)
  } else {
    items.forEach(item => item.done = true)
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList)
}

// The next function will delete all the items when called:
function deleteAll() {
  items.splice(0, items.length)

  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList)
}


// Now we create a submit event listener:
addItems.addEventListener("submit", addItem)
// We need to create a click event on the itemsList itself and see if the target matches the item we are looking for (see function toggleDone above)
itemsList.addEventListener("click", toggleDone)

// When the page loads, we need to get the items from localStorage and display them:
populateList(items, itemsList)

// Let's add event listeners to the buttons:
checkBtn.addEventListener("click", checkAll)
deleteBtn.addEventListener("click", deleteAll)
