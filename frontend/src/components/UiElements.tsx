import { Button } from "./dashboard/Button";

const COLORS: [
    name: string, 
    hex: string, 
    bgClass: string, 
    textClass?: string
][] = [
  [ "wild-orange", "#FF8102", "bg-wild-orange", "text-wild-orange" ],
  [ "wild-blue", "#0034AE", "bg-wild-blue", "text-wild-blue" ],
  [ "wild-bg-light-blue", "#F8FBFF", "bg-wild-bg-light-blue" ],
  [ "wild-selected-link", "#4D7AE3", "bg-wild-selected-link", "text-wild-selected-link" ],
  [ "wild-grey", "#F7F7F7", "bg-wild-grey" ],
  [ "wild-beige", "#FFEFD7", "bg-wild-beige" ],
  [ "wild-text-grey", "#364153", "bg-wild-text-grey", "text-wild-text-grey" ],
  [ "wild-light-blue", "#E8F2F8", "bg-wild-light-blue" ],
];

export default function Elements() {
  return (
    <div className="p-8 space-y-8">

      <section className="bg-white p-6 rounded shadow">
        <h2 className="mb-4">Typographie : Poppins</h2>

        <h1 className="mb-2">H1</h1>
        <h2 className="mb-2">H2</h2>
        <h3 className="mb-4">H3</h3>
        <p className="mb-2">Paragraphe régulier — Lorem ipsum dolor sit amet…</p>
        <p className="muted">Paragraphe muted — couleur texte secondaire.</p>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="mb-4">Palette de couleurs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map(([name, hex, bg, text]) => (
            <div key={name} className="flex items-center gap-4 bg-white rounded shadow p-4">
              <div className={`w-10 h-10 rounded-full ${bg}`} />
              <div className="flex-1">
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-wild-text-grey">{hex}</div>
              </div>
              {text && <span className={`px-2 py-1 rounded text-sm ${text}`}>Aa</span>}
            </div>

          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="mb-4">Composants du dashboard</h2>

        <h3 className="mb-3">Boutons</h3>
        <Button label="Bouton" icon={
          //  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          //   <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          // </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        }/>
      </section>
    </div>
  );
}