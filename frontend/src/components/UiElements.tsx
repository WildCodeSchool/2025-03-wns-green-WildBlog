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
    </div>
  );
}