import { HeaderHome } from "../components/home/HeaderHome";
import { FooterHome } from "../components/home/FooterHome";
import img1 from '../assets/Home1.jpg';
import img2 from '../assets/Home2.png';
import { BsBrush } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";



export function HomePage() {
    return (
        <div>
            <div>
                <HeaderHome />
                <h1 className="text-center text-[#0034AE] mb-10">Bienvenue sur  WildBlog</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-8 text-[#0034AE] ">
                <img className="w-full md:w-1/2 max-w-md rounded-lg object-cover md:ml-50" src={img1} alt="Home" />
                <div className="flex flex-col gap-2 flex-1 ">
                    <h1 className="text-2xl font-bold mx-10 ms-5 md:mx-70">Créer votre blog</h1>
                    <p className="text-base mx-10 ms-5 md:mx-70 ">Cet outil en ligne permet à n'importe qui de créer, gérer et publier facilement du contenu sur internet, 
                       sans avoir besoin de savoir coder. Son interface intuitive : on peut ajouter des textes, des images et 
                       personnaliser la mise en page en quelques clics. Il offre aussi des fonctionnalités puissantes comme le
                       référencement naturel (SEO), des statistiques de lecture, et la possibilité d'intéragir avec ses lecteurs. 
                       Grâce à ces outils, créer un blog devient accessible à tous, qu'on soit passionné d'écriture, professionnel 
                       ou simplement curieux de partager ses idées avec le monde</p>
                </div>
            </div>
            <div>
                <div className="flex flex-col md:flex-row gap-8 text-[#0034AE] mb-10 mt-10">
                    <div className="flex flex-col gap-8 flex-1 ">
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl font-bold mx-10 ms-5 md:mx-70">Large choix de thèmes</h2>
                            <p className="text-base mx-10 ms-5 md:mx-70">
                                Nous vous proposons différentes catégories de thèmes que vous pourrez personnaliser. Des catégories comme la cuisine, le sport, la nature, la technologie et bien d'autres encore.</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-bold mx-10 ms-5 md:mx-70">Editeur de texte</h3>
                            <p className="text-base mx-10 ms-5 md:mx-70">
                                Nous avons un éditeur de texte simple pour une prise en main facile avec diverses possibilités de typographies, couleurs, positionnements de texte etc...</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <h4 className="text-2xl font-bold mx-10 ms-5 md:mx-70">Intéraction avec les lecteurs</h4>
                            <p className="text-base mx-10 ms-5 md:mx-70">
                                Nos blogs permettent à vos lecteurs de laisser des commentaires, aimer vos articles et partager votre contenu sur les réseaux sociaux, favorisant ainsi l'engagement et la création d'une communauté autour de votre blog.</p>
                        </div>
                    </div>
                    <img className="w-full md:w-72 max-w-md rounded-lg object-cover md:mr-50" src={img2} alt="Home" />
                </div>
                
                <div className="!bg-wild-blue p-8 flex flex-col gap-8 text-center text-white items-center justify-center" style={{ backgroundColor: '#F8FBFF' }}>
                    <h5 className="text-4xl font-bold text-white">Le futur de votre contenu commence ici</h5>  
                    <p className="text-base text-white max-w-4xl">Le web est vaste, mais votre voix est unique. WildBlog vous donne les outils puissants nécessaires pour vous démarquer, bâtir votre audience et transformer votre passion en une présence numérique durable. Concentrez-vous sur l'écriture, nous gérons le reste.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
                        <div className="flex flex-col items-center gap-4 mx-20">
                            <BsBrush className="text-4xl" />
                            <h6 className="text-2xl font-bold text-white">Création Sans Limite</h6>
                            <p className="text-base text-white">
                                Grâce à notre éditeur de texte intuitif et notre large choix de thèmes, concevez des articles qui captivent.
                                Liberté de Design : Accédez à des options de typographie, de couleur et de mise en page illimitées.
                                Performance Optimale : Des modèles conçus pour un affichage parfait sur tous les appareils (Mobile, Tablette, Desktop).
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4 mx-20">
                            <FaChartLine className="text-4xl" />
                            <h6 className="text-2xl font-bold text-white">Audience et Visibilité</h6>
                            <p className="text-base text-white">
                                Augmentez la portée de votre blog grâce à des outils intégrés conçus pour la croissance.
                                SEO intégré : Nos outils vous guident pas à pas pour optimiser vos articles pour les moteurs de recherche (Google, Bing).
                                Interaction Facile : Gérez les commentaires et encouragez les échanges avec vos lecteurs pour fidéliser votre communauté.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4 mx-20">
                            <FaShieldAlt className="text-4xl" />
                            <h6 className="text-2xl font-bold text-white">Zéro Code, Zéro Stress</h6>
                            <p className="text-base text-white ">
                                Laissez les lignes de code aux professionnels et concentrez-vous sur le message.
                                Hébergement Inclus : Profitez d'une solution tout-en-un avec un hébergement fiable et performant. 
                                Mises à Jour Automatiques : Votre plateforme reste toujours sécurisée et à jour, sans intervention de votre part.
                            </p>
                        </div>
                    </div>
                </div>
                <FooterHome />
            </div> 
        </div>
    );
}