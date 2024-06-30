import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');
  //open database connect
  const jateDb = await openDB('jate',1)
  //create new transation
  const tx = jateDb.transaction('jate', "readwrite");
  //open object store
  const store = tx.objectStore('jate');
  //add content to object store
  const request = store.put({
  id: 1,
  value: content
});
//get confirmation
  const result = await request;
  console.log('Data saved to database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll()
  const result = await request;
  console.log('data retrived from database', result)
  return result;
}

initdb();
