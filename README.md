# Jak działa internet

Film o tym, co się dzieje między wpisaniem adresu a otwarciem strony: DNS, adres IP,
pakiety, routery, serwer. Bez wzorów, raczej na obrazkach.

## Jak zbudować

```bash
npm install
npm run dev      # podgląd w przeglądarce
npm run render   # render do MP4
```

Lektor jest z Edge TTS (`scripts/tts.mjs`), muzyka generowana skryptem (`scripts/music.mjs`).
Gotowe MP4 nie są w repo, za duże.

Zrobione w [HyperFrames](https://github.com/heygen-com/hyperframes) (HTML + GSAP, render do wideo).
