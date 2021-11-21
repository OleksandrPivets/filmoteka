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
  return queue.includes(parseInt(id));
}
function checkIfInWatched(id) {
  const watched = getWatched();
  return watched.includes(parseInt(id));
}

//function to remove value from queue or watched lists in local storage by id
function removeFromQueue(event) {
  const queue = getQueue();
  localStorage.setItem(
    'queue',
    JSON.stringify(queue.filter(el => el !== parseInt(event.target.dataset.value))),
  );
}
function removeFromWatched(event) {
  const watched = getWatched();
  localStorage.setItem(
    'watched',
    JSON.stringify(watched.filter(el => el !== parseInt(event.target.dataset.value))),
  );
}

// functions for adding to queue and watched lists in local storage
function addToQueue(event) {
  if (checkIfInQueue(event.target.dataset.value)) return;
  addToList('queue', event.target.dataset.value);
}
function addToWatched(event) {
  if (checkIfInWatched(event.target.dataset.value)) return;
  addToList('watched', event.target.dataset.value);
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
