function populateIndexedDB() {
  const data = {
    key: 'hjucode@gmail.com',
    value: {
      id: 'hjucode@gmail.com',
      waste: [
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-01-20T13:31:36.978Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-04-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-04-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-05-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-05-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-06-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-06-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-06-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-06-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-07-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-07-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-07-23T12:57:34.195Z',
        },
        {
          label: 'c2',
          image: 'data:image/jpeg;base64',
          co2e: 0.335,
          dateScanned: '2024-07-23T12:57:34.195Z',
        },
      ],
    },
  };

  console.log('Data to be added to the object store:', data.value);

  const dbName = 'carbonitor';
  const storeName = 'carbonitor_store';

  const request = indexedDB.open(dbName);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
      const objectStore = db.createObjectStore(storeName, { keyPath: 'key' });
      console.log('Object store created.');
      console.log('Object store:', objectStore);
    } else {
      console.log('Object store already exists.');
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const putRequest = objectStore.put(data.value, data.key);

    putRequest.onsuccess = function () {
      console.log('Data successfully added to the object store.');
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    putRequest.onerror = function (_event) {
      console.error('Error adding data to the object store:', putRequest.error);
    };
  };

  request.onerror = function (event) {
    console.error(
      'Database error: ' +
        event.target.error.name +
        '; details: ' +
        event.target.error.message
    );
  };

  console.log('Request:', request);

  request.onerror = function (event) {
    console.error('Database error: ' + event.target.errorCode);
  };
}

populateIndexedDB();
