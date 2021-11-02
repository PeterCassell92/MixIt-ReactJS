import localforage from 'localforage';
import { extendPrototype } from 'localforage-getitems';

// Needed to add getItems() to localforage
extendPrototype(localforage);

// Adds an item to local storage using the specified key-value pair
function addToLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    localforage.setItem(key, value)
    .then(resolve)
    .catch(err => {
      reject(`Unable to set ${key} in local storage: ${err}`);
    });
  });
}

// Retrieves a value from local storage for the specified key
// and uses the setter function to set add it to component state
// This function returns a promise that will resolve once the setter has been called
function getFromLocalStorage(key, setter) {
  return new Promise((resolve, reject) => {
    localforage.getItem(key)
    .then(val => {
      if (setter) {
        setter(val);
      }
      resolve(val);
    })
    .catch(err => {
      reject(`Unable to retrieve ${key} from local storage: ${err}`);
    });
  });
}

// Retrieves all keys from local storage and creates an object of those keys
// and the corresponding values.
// This function returns a promise that will resolve with the backup object.
function backupLocalStorage() {
  return new Promise((resolve, reject) => {
    localforage.getItems(null)
    .then(obj => {
      resolve(obj);
    })
    .catch(err => {
      reject(`Unable to backup local storage: ${err}`);
    });
  });
}

// Irreversibly empties the local storage by removing all items
// USE WITH CAUTION!
// This function returns a promise
function emptyLocalStorage() {
  return new Promise((resolve, reject) => {
    localforage.clear()
    .then(resolve)
    .catch(err => {
      reject(`Unable to empty local storage: ${err}`);
    });
  });
}

export {
  addToLocalStorage,
  getFromLocalStorage,
  backupLocalStorage,
  emptyLocalStorage
};
export default getFromLocalStorage;
