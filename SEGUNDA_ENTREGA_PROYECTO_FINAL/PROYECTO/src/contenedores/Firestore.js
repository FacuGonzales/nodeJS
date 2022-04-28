const admin = require('firebase-admin');
const key = require('../../firebase-key.json');

key = admin.ServiceAccount;

const serviceAccount = key;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class Firestore {
  collection;
  firestore;
  db;

  constructor(collection) {
    this.firestore = admin.firestore;
    this.db = admin.firestore();
    this.collection = admin.firestore().collection(collection);
  }

  async getAll() {
    try {
      const snapshot = await this.collection.get();
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      const snapshot = await this.collection.doc(id).get();
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  create(data) {
    try {
      return this.collection.add(data);
    } catch (err) {
      console.log(err);
    }
  }

  update(id, data) {
    try {
      return this.collection.doc(id).update(data);
    } catch (err) {
      console.log(err);
    }
  }

  delete(id) {
    try {
      return this.collection.doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      const snapshot = await this.collection.get();

      if (snapshot.size === 0) {
        return;
      }

      const batch = this.db.batch();

      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Firestore;