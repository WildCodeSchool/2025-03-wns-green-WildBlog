import img from "../assets/image_IT.jpg";
import Commentaires from "./Commentaires";



export default function Articles() {    
    return (      
    <div className="article-container flex:auto flex-col items-center p-20 max-w-800 md:auto">
    <h1 className="article-title text-center bg:wild-blue mb-10" >L’IA : entre révolution technologique et défi humain</h1>
        <img className="article-image block mx-auto w-full max-w-300 h-200 mb-20 rounded-lg shadow-lg object-cover"
             src={img} 
             alt="IA" />
    <div/>
        <p className="article-text text-justify text-1.6 mt-20" >
           Paris, 2025 – Longtemps cantonnée aux laboratoires de recherche et aux récits de science-fiction, l’intelligence artificielle (IA) est désormais partout : dans nos téléphones, nos voitures, nos hôpitaux, et même nos foyers.
                         Elle façonne une nouvelle ère, pleine de promesses… mais aussi de questions. Une révolution silencieuse mais omniprésente.
                         Que l’on demande à son assistant vocal de régler le chauffage, qu’un médecin analyse un scanner avec l’aide d’un algorithme, ou qu’un agriculteur optimise l’irrigation de ses champs grâce à des capteurs connectés, l’IA agit déjà en coulisses. Elle apprend, prédit, recommande.

                         Selon une étude fictive menée par l’Institut Européen de la Technologie, plus de 70 % des entreprises européennes utilisent aujourd’hui au moins une solution basée sur l’IA, contre seulement 15 % en 2018.

            L’IA créative et artistique

                        Mais l’IA ne se limite plus aux chiffres et aux calculs. Elle compose de la musique, génère des images, aide à l’écriture et même au design. De nombreux artistes collaborent désormais avec des intelligences artificielles pour explorer de nouvelles formes d’expression. Certains parlent d’une « co-création homme-machine ».

            Un défi éthique majeur

                        Face à cette montée en puissance, les débats se multiplient : comment encadrer l’IA pour qu’elle reste au service de l’humain ?

            Faut-il autoriser des IA à prendre des décisions médicales critiques ?

            Comment éviter les biais algorithmiques qui renforcent des discriminations existantes ?

            Quelle place restera-t-il aux métiers traditionnels menacés par l’automatisation ?

            « L’IA n’est ni bonne ni mauvaise en soi, tout dépend de l’usage qu’on en fait », rappelle Pr. Julien Morel, expert fictif en éthique numérique.

            Un avenir à co-construire

                         Si certains redoutent une perte de contrôle, d’autres voient dans l’IA un formidable levier de progrès : réduction de la consommation énergétique, médecine personnalisée, transports plus sûrs et plus fluides…

                        La clé semble résider dans un équilibre : faire de l’IA un outil, et non une fin. L’avenir de l’intelligence artificielle sera celui que l’humanité choisira de lui donner.
        </p>
         <Commentaires/>
    </div>
);


};