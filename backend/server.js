const express = require('express');
const app = express();
const path = require('path');
const reviewsRoutes = require("./routes/reviews");
const PORT = 3000;

// Глобальная обработка статических файлов
app.use('/assets', express.static(path.join(__dirname, '../frontend/pages/assets')));
app.use('/mdb', express.static(path.join(__dirname, '../frontend/mdb')));
app.use('/axios', express.static(path.join(__dirname, '../frontend/axios')));
app.use('/api/reviews', reviewsRoutes);

// Обработка маршрутов для страниц
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/main.html'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `../frontend/pages/${page}.html`);

    // Проверяем существование файла
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, '../frontend/pages/404.html'));
        }
    });
});

// Обработка всех остальных маршрутов (например, для вложенных путей)
app.use((req, res) => {
    // Если запрос уходит в assets или другие файлы, проверьте путь
    const requestedPath = path.join(__dirname, '../frontend/pages', req.path);
    res.sendFile(requestedPath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, '../frontend/pages/404.html'));
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
