const firebase = require('../db');
const Safe = require('../models/safe');
const firestore = firebase.firestore();

const createSafe = async (req, res, next) => {
    try {
        const data = (req.body);
        var gold = "0"
        var key = []
        var documents = []

        if (data.empty || !data.password) {
            res.status(400).send("No password given");
        }
        if (data.gold && Number(data.gold < 0))
          res.status(400).send("you can't add negative gold");
        if (!data.gold)
          data.gold = gold
        if (!data.key)
          data.key = key
        else {
          key.push(data.key)
          data.key = key
        }
        if (!data.documents)
          data.documents = documents
        else {
          documents.push(data.documents)
          data.documents = documents
        }
        firestore.collection('safe').add(data).then(function(docRef) {
        res.status(201).send({"id": docRef.id});

    })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSafes = async (req, res, next) => {
    try {
        const safes = await firestore.collection('safe');
        const data = await safes.get();
        const safeArray = [];

        if(data.empty) {
            res.status(404).send('No safes record found');
        }else {
            data.forEach(doc => {
                safeArray.push(doc.id);
            });
            res.status(200).send(safeArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSafe = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const safe = await firestore.collection('safe').doc(id);
        const dataGet = await safe.get();

        if(!dataGet.exists) {
            res.status(400).send('Safe with the given ID not found');
        } else {
            data = dataGet.data()
            if (body.password != data.password)
              res.status(400).send("Wrong password");
            else {
              const returnSafe = new Safe(
                  data.gold,
                  data.key,
                  data.documents
              );
              res.status(200).send(returnSafe);
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteSafe = async (req, res, next) => {
  try {
      const id = req.params.id;
      const body = req.body;
      const safe = await firestore.collection('safe').doc(id);
      const dataGet = await safe.get();

      if(!dataGet.exists) {
          res.status(400).send('Safe with the given ID not found');
      } else {
          data = dataGet.data()
          if (body.password != data.password)
            res.status(400).send("Wrong password");
          else {
            await firestore.collection('safe').doc(id).delete();
            res.status(204).send();
        }
      }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addItems = async (req, res, next) => {
  try {
      const id = req.params.id;
      const body = req.body;
      const safe = await firestore.collection('safe').doc(id);
      const dataGet = await safe.get();
      var error = 0

      if(!dataGet.exists) {
          res.status(400).send('Safe with the given ID not found');
      } else {
          data = dataGet.data()
          if (body.password != data.password)
            res.status(400).send("Wrong password");
          else {
            if (body.gold) {
              if (Number(body.gold) < 0) {
                error = 1
              }
              data.gold = Number(data.gold) + Number(body.gold)
              data.gold = '' + data.gold
            }

            if (body.key) {
              var keyArray = []
              if (data.key.length > 0) {
                data.key.forEach((item) => {
                  keyArray.push(item)
                });
              }
              keyArray.push(body.key)
              data.key = keyArray
            }

            if (body.documents) {
              var documentsArray = []
              if (data.documents.length > 0) {
                data.documents.forEach((item) => {
                  if (item == body.documents) {
                    error = 2
                  }
                  documentsArray.push(item)
                });
              }
              documentsArray.push(body.documents)
              data.documents = documentsArray
            }

            if (error == 0) {
              await safe.update(data);
              res.status(204).send();
            }
            else if (error == 1) {
              res.status(400).send("you can't add negative gold");
            }
            else {
              res.status(400).send("This documents already exist");
            }

        }
      }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeItems = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const safe = await firestore.collection('safe').doc(id);
    const dataGet = await safe.get();
    var error = 0

    if(!dataGet.exists) {
        res.status(400).send('Safe with the given ID not found');
    } else {
        data = dataGet.data()
        if (body.password != data.password)
          res.status(400).send("Wrong password");

        else {
          if (body.gold) {
            if (!data.gold)
              error = 1
            else if (Number(data.gold) < (Number(body.gold)))
              error = 1
            else {
              data.gold = Number(data.gold) - Number(body.gold)
              data.gold = '' + data.gold
            }
          }

          if (body.key) {
            if (Number(body.key) > data.key.length)
              error = 2
            if (data.key.length == 1)
              data.key = []
            else {
              data.key.splice(Number(body.key - 1), 1)
            }
          }

          if (body.documents) {
            for (i = 0; i < data.documents.length; i += 1) {
              if (data.documents[i] == body.documents) {
                data.documents.splice(i, 1)
                error = 0
                break;
              }
              error = 3
            };
          }

          if (error == 0) {
            await safe.update(data);
            res.status(204).send();
          }
          else if (error == 1) {
            res.status(400).send("Not enough gold in safe")
          }
          else if (error == 2) {
            res.status(400).send("Key out of range")
          }
          else {
            res.status(400).send("Documents don't exist")
          }

        }
      }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createSafe,
    getSafes,
    getSafe,
    deleteSafe,
    addItems,
    removeItems,
}
