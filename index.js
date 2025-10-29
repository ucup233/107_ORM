const express = require('express');
const app = express();
const port = 5200;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
  db.sequelize.sync().then((result) => {
    app.listen( 3000,() => {
        console.log(`Server is running on http://localhost:${port}`);
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.status(201).json(komik);
    }   catch (error) { 
        res.status(500).json({ error: 'Gagal menambahkan komik' });
    }
});


