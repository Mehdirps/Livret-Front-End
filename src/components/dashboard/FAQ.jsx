import React from "react";
import FaqItem from "./FaqItem";

const Faq = () => {
  return (
    <div className="col-12">
      <h2>Comment fonctionne l'application</h2>
      <div className="accordion" id="faqAccordion">
        <FaqItem
          number={"One"}
          title={"Comment modifier mes informations et celle de mon livret ?"}
          text={
            "Pour modifier vos informations, vous devez vous rendre dans la section Mon profil de votre compte. Vous pouvez modifier votre nom, prénom, email, mot de passe, etc. Pour modifier les informations de votre livret, vous devez vous rendre dans la section Mon profil. Vous pouvez modifier le nom de votre livret, la description, ajout un logo etc."
          }
        />
        <FaqItem
          number={"Two"}
          title={"Comment changer le fond d'écran de mon livret ?"}
          text={
            "Pour changer le fond d'écran de votre livret, vous devez vous rendre dans la section \"Mon livret d'accueil\" de votre compte. Vous pouvez choisir un fond parmi les images disponibles. Plusieurs catégories d'images sont disponibles."
          }
        />
        <FaqItem
          number={"Three"}
          title={"Comment fonctionne les statistiques ?"}
          text={
            'Les statistiques vous permettent de voir le nombre de vue de votre livret en vous rendant dans la section "Statistiques" de votre compte. Vous pouvez voir le nombre de vues par jour, par semaine, par mois, et sélectionner une période personnalisée.'
          }
        />
        <FaqItem
          number={"Four"}
          title={"Comment voir mon livret en tant qu'utilisateur ?"}
          text={
            'Pour voir votre livret en tant qu\'utilisateur, vous devez vous rendre dans la section "Mon livret d\'accueil" de votre compte et cliquer sur "voir".'
          }
        />
        <FaqItem
          number={"Five"}
          title={"Comment nous contacter ?"}
          text={
            'Pour nous contacter, rien de plus simple. Cliquez sur le bouton "Nous contacter" en bas de la page et remplissez le formulaire de contact. Nous vous recontacterons dans les plus brefs délais.'
          }
        />
      </div>
    </div>
  );
};

export default Faq;
