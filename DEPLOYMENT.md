# Deployment auf Vercel

## Schritt 1: Vorbereitung

Du brauchst:
- GitHub Account (kostenlos)
- Vercel Account (kostenlos)
- Claude API Key (hast du schon!)

## Schritt 2: GitHub Setup

1. Gehe zu https://github.com und logge dich ein
2. Erstelle ein **neues Repository** `kalender-notizen-backend`
3. Erstelle folgende Struktur:

```
kalender-notizen-backend/
├── api/
│   └── process.js       (Backend-Code)
├── public/
│   └── index.html       (Frontend-Code)
├── package.json
└── vercel.json
```

## Schritt 3: Dateien in GitHub hochladen

1. **api/process.js** → Die Backend-Datei (siehe unten)
2. **public/index.html** → Deine aktualisierte Frontend-Datei
3. **package.json** → Abhängigkeiten
4. **vercel.json** → siehe unten

## Schritt 4: vercel.json erstellen

Kopiere das in eine neue Datei `vercel.json`:

```json
{
  "buildCommand": "npm install",
  "outputDirectory": "public",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

## Schritt 5: Vercel Deployment

1. Gehe zu https://vercel.com und melde dich an
2. Klick auf **"Add New..."** → **"Project"**
3. Wähle dein **GitHub Repository** aus
4. Bei **Environment Variables** klick auf **"Add"**:
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** Dein Claude API Key
5. Klick **Deploy** 🚀

## Schritt 6: Frontend aktualisieren

Nachdem Vercel deployed ist, kopiere deine neue `index.html` zu GitHub:

1. In deinem Repository: `/public/index.html`
2. Ersetze mit der aktualisierten Version

## Schritt 7: App testen

Öffne deine App unter:
```
https://dein-vercel-domain.vercel.app
```

Jetzt sollte die **intelligente Spracherkennung** für Notizen funktionieren! 🎉

---

## Fehlerbehandlung

### "API Key Error"
→ Überprüfe ob die Environment Variable in Vercel richtig gesetzt ist

### "Processing failed"
→ Schau in Vercel Logs: Projekt → Deployments → Logs

### Frontend sieht Backend nicht
→ Stelle sicher, dass die `/api/process` Route erreichbar ist
