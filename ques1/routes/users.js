var express = require('express');
var router = express.Router();

let users = []
// for get request
router.get('/', (req, res)=> {
  res.json(users);
});

// for post request
router.post('/',(req, res) =>{

  console.log('inside post request');
  const {username, password, firstname, lastname} = req.body;
  if(!username || !password || !firstname || !lastname){
    res.status(400).json({error: 'Invalid input'});
  }
  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    firstname,
    lastname
  }
  users.push(newUser);
  res.status(201).json(newUser);
})

// for put request
router.put('/:id', (req, res)=>{
  const { username, password, firstName, lastName } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    username,
    password,
    firstName,
    lastName,
  };

  res.json(users[userIndex]);
})

// delete req
router.delete('/:id', (req, res)=>{
  const {id} = req.params;
  const user = users.find(user => user.id === id);
  if(!user){
    res.status(404).json({error: 'User not found'});
  }
  users = users.filter(user => user.id !== id);
  res.status(204).send();
})

router.get('/search', (req, res)=>{
  const username = req.query.q || '';
  const filteredUsers = users.filter(user => user.username.includes(username));
  console.log('filteredusers - ', filteredUsers);
  res.json(filteredUsers);
})

module.exports = router;
