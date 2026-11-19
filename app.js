const express = require('express');
const app = express();
const PORT = ;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AWS EC2 Color Studio</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: background 0.5s ease;
          color: #fff;
          padding: 20px;
        }
        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        h1 { font-size: 2.2rem; margin-bottom: 10px; }
        p { font-size: 1rem; opacity: 0.9; margin-bottom: 25px; }
        .palette {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 25px;
        }
        .swatch {
          height: 90px;
          border-radius: 12px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 10px;
          font-weight: bold;
          font-size: 0.85rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: transform 0.2s;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }
        .swatch:hover { transform: translateY(-5px); }
        button {
          background: #ffffff;
          color: #333;
          border: none;
          padding: 14px 28px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          transition: transform 0.2s, background 0.2s;
        }
        button:hover { transform: scale(1.05); background: #f0f0f0; }
        .badge {
          margin-top: 20px;
          font-size: 0.85rem;
          opacity: 0.85;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🎨 Color Studio</h1>
        <p>Click any color box to set it as the background & copy its HEX code!</p>
        
        <div class="palette" id="palette"></div>
        
        <button onclick="generatePalette()">✨ Generate New Colors</button>
        <div class="badge" id="status">Deployed via Jenkins CI/CD on AWS EC2</div>
      </div>

      <script>
        function randomHex() {
          return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
        }

        function generatePalette() {
          const palette = document.getElementById('palette');
          palette.innerHTML = '';
          const colors = [randomHex(), randomHex(), randomHex(), randomHex()];
          
          document.body.style.background = 'linear-gradient(135deg, ' + colors[0] + ' 0%, ' + colors[1] + ' 100%)';

          colors.forEach(function(hex) {
            const box = document.createElement('div');
            box.className = 'swatch';
            box.style.backgroundColor = hex;
            box.innerText = hex;
            box.onclick = function() {
              document.body.style.background = hex;
              if (navigator.clipboard) {
                navigator.clipboard.writeText(hex);
              }
              document.getElementById('status').innerText = 'Copied ' + hex + ' to clipboard!';
            };
            palette.appendChild(box);
          });
        }

        generatePalette();
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Color website running on http://0.0.0:' + PORT);
});
