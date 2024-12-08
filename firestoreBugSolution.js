The issue was likely due to transient network problems or temporary Firebase service outages.  The solution implemented adds more comprehensive error handling and includes a retry mechanism to ensure that data is written reliably.  The code now checks for errors returned by the Firestore write operation, logs more detailed information, and attempts to retry the write operation if an error occurs.

```javascript
// firestoreBugSolution.js

db.collection('myCollection').add(data)
  .then(docRef => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(error => {
    console.error("Error adding document: ", error);
    // Retry mechanism
    setTimeout(() => {
        db.collection('myCollection').add(data)
          .then(docRef => {
            console.log("Document written with ID (retry): ", docRef.id);
          })
          .catch(retryError => {
            console.error("Error adding document (retry failed): ", retryError);
          });
    }, 5000); // Retry after 5 seconds
  });
```