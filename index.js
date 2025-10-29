const express = require('express');
const app = express();
const port = 5200;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
  db.sequelize.sync().then((result) => {
    app.listen( 5200,() => {
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

app.get('/komik', async (req, res) => {
    try {
        const komiks = await db.Komik.findAll();
        res.status(200).json(komiks);
    }   catch (error) { 
        res.status(500).json({ error: 'Gagal mengambil data komik' });
    }
});

app.put('/komik/:id', async (req, res) => {
    const komikId = req.params.id;
    const data = req.body;
    try {
        const komik = await db.Komik.findByPk(komikId);
        if (!komik) {
            return res.status(404).json({ error: 'Komik tidak ditemukan' });
        }
        await komik.update(data);
        res.status(200).json(komik);
    }   
    catch (error) { 
        res.status(500).json({ error: 'Gagal memperbarui data komik' });
    }
}); 

app.delete('/komik/:id', async (req, res) => {
    const komikId = req.params.id;
    try {
        const komik = await db.Komik.findByPk(komikId);
        if (!komik) {
            return res.status(404).json({ error: 'Komik tidak ditemukan' });
        }
        await komik.destroy();
        res.status(200).json({ message: 'Komik berhasil dihapus' });
    }   
    catch (error) { 
        res.status(500).json({ error: 'Gagal menghapus data komik' });
    }
});

