const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyaları serve et
app.use(express.static(__dirname));
app.use(express.json());

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint - iletişim formu için
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('İletişim formu:', { name, email, message });
    
    // Burada email gönderme işlemi yapılabilir
    // Nodemailer veya başka bir servis kullanılabilir
    
    res.json({ 
        success: true, 
        message: 'Mesajınız alındı!' 
    });
});

// API endpoint - GitHub projeleri için
app.get('/api/projects', (req, res) => {
    const projects = [
        {
            id: 1,
            title: 'Özel Bot Geliştirme',
            description: 'Node.js tabanlı otomasyon botları ve arka plan servisleri',
            tech: ['Node.js', 'JavaScript', 'API']
        },
        {
            id: 2,
            title: 'Web Uygulamaları',
            description: 'Dinamik ve etkileşimli web arayüzleri',
            tech: ['HTML5', 'CSS3', 'JavaScript']
        },
        {
            id: 3,
            title: 'Modüler Kütüphaneler',
            description: 'Tekrar kullanılabilir kod modülleri ve araçlar',
            tech: ['JavaScript', 'ES6+']
        }
    ];
    
    res.json(projects);
});

// Server'ı başlat
app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
    console.log(`💻 Developed by darking053official`);
});
