//move refs to main refs
// const refs = {
//   addToWatched: document.querySelector('.js-add-watched'),
//   addToQueue: document.querySelector('.js-add-queue'),
// };
//when to remove event listeners and when to add => when modal opens and closes
// refs.addToQueue.addEventListener('click', addToQueue);
// refs.addToWatched.addEventListener('click', addToWatched);
//what to do for delete (buttons) will we change ids? when to

//function for getting values from queue and watched lists in local storage
function getQueue() {
  return getFromList('queue');
}
function getWatched() {
  return getFromList('watched');
}

//function for checking if value is in queue or watched lists in local storage
function checkIfInQueue(id) {
  const queue = getQueue();
  return queue.includes(id);
}
function checkIfInWatched(id) {
  const watched = getWatched();
  return watched.includes(id);
}

//function to remove value from queue or watched lists in local storage
function removeFromQueue(id) {
  const queue = getQueue();
  localStorage.setItem('queue', JSON.stringify(queue.filter(el => el !== id)));
}
function removeFromWatched(id) {
  const watched = getWatched();
  localStorage.setItem('watched', JSON.stringify(watched.filter(el => el !== id)));
}

// functions for adding to queue and watched lists in local storage
function addToQueue(event) {
  addToList('queue', event.target.value);
}
function addToWatched(event) {
  addToList('watched', event.target.value);
}

// function for adding to list in local storage
function addToList(listName, value) {
  let list = JSON.parse(localStorage.getItem(`${listName}`));
  if (!list) list = [];
  list.push(parseInt(value));
  localStorage.setItem(`${listName}`, JSON.stringify(list));
}
// function for getting values from a list in local storage
function getFromList(listName) {
  let list = JSON.parse(localStorage.getItem(`${listName}`));
  if (list) return list;
  return [];
}
export {
  getQueue,
  getWatched,
  checkIfInQueue,
  checkIfInWatched,
  removeFromQueue,
  removeFromWatched,
  addToQueue,
  addToWatched,
};

// example of usage
// import {
//   getQueue,
//   getWatched,
//   checkIfInQueue,
//   checkIfInWatched,
//   removeFromQueue,
//   removeFromWatched,
//   addToQueue,
//   addToWatched,
// } from './js/LocalStorage';
// console.log(getWatched());
