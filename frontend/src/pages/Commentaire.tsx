import Commentaires from "../components/Comments";

export default function Commentaire() {
  return (
    <div className="commentaire-container p-8 border rounded-lg shadow-md bg-white">
      <h1 className="commentaire-title mb-6">Commentaire</h1>
      <Commentaires />
    </div>
  );
}