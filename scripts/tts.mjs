import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Spoken text; tech terms spelled phonetically so the Polish voice reads them naturally.
const lines = [
  "Wpisujesz adres strony i po ułamku sekundy ją widzisz. A po drodze dzieje się kilkanaście rzeczy. Zobaczmy jakich.",
  "Każde urządzenie w sieci ma adres i pe, czyli numer, jak adres domu. Komputery rozmawiają liczbami, nie nazwami.",
  "Ale ty wpisujesz nazwę, nie numer. Dlatego najpierw działa de en es, książka telefoniczna internetu. Pyta kolejne serwery: główny, potem domeny pe el, aż dostanie adres i pe.",
  "Dane nie lecą w jednym kawałku. Dzielone są na małe pakiety, a każdy ma adres nadawcy i odbiorcy.",
  "Pakiety skaczą przez routery: od twojego domowego, przez dostawcę internetu, po światłowody pod oceanem. Każdy router decyduje tylko o następnym kroku.",
  "Te ce pe pilnuje porządku. Najpierw uścisk dłoni: syn, syn ak, ak. Potem numeruje pakiety, a zgubione wysyła jeszcze raz.",
  "Zanim polecą dane, przeglądarka i serwer ustalają szyfrowanie. To kłódka w pasku adresu. Nikt po drodze nie przeczyta treści.",
  "Teraz przeglądarka wysyła żądanie ha te te pe: get, daj mi stronę. Serwer odpowiada kodem dwieście, czyli OK, i wysyła ha te em el.",
  "Przeglądarka czyta ha te em el, dociąga style, skrypty i obrazki, i składa z tego stronę. Wszystko w mniej niż sekundę.",
  "I pe, de en es, pakiety, routing, te ce pe, szyfrowanie i ha te te pe. Tak działa internet. Sprawdź sam: wpisz w terminalu en es lukap i nazwę strony.",
];

const only = process.argv[2] ? Number(process.argv[2]) : null;
const outRoot = "assets/audio";
mkdirSync(outRoot, { recursive: true });

for (let i = 0; i < lines.length; i++) {
  const n = String(i + 1).padStart(2, "0");
  if (only && only !== i + 1) continue;
  const tmp = join(outRoot, `tmp-${n}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  const tts = new MsEdgeTTS();
  await tts.setMetadata("pl-PL-MarekNeural", OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
  });
  await tts.toFile(tmp, lines[i], { rate: "+10%" });
  tts.close();
  for (const f of readdirSync(tmp)) {
    const ext = f.endsWith(".mp3") ? "mp3" : "json";
    renameSync(join(tmp, f), join(outRoot, `vo-${n}.${ext}`));
  }
  rmSync(tmp, { recursive: true, force: true });
  console.log(`vo-${n} ok`, existsSync(join(outRoot, `vo-${n}.mp3`)));
}
