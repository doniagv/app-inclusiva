import Script from "next/script";

export default function Juego({}) {
  return (
    <main>
      <Script
        id="show-game"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: `document.getElementById('buscarDiferencias').classList.remove('hidden')` }}
      />
    </main>
  );
}
