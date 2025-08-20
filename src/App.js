import React, { useState } from 'react';

// Gegevens van de teamleden
const teamData = [
  {
    category: "Directie",
    members: [
      { 
        name: "Luc de Groen", 
        title: "Artistiek directeur", 
        email: "luc@cafetheaterfestival.nl", 
        phone: "+31 6 81947800", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/luc-ctf-2025-crew-5.jpg" 
      },
      { 
        name: "Christiaan Uytdehaage", 
        title: "Zakelijk directeur", 
        email: "christiaan@cafetheaterfestival.nl", 
        phone: "+31 6 21507713", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-12.jpg" 
      },
    ]
  },
  {
    category: "Artistiek team",
    members: [
      { 
        name: "Derk Stenvers", 
        title: "Programmeur", 
        email: "derk@cafetheaterfestival.nl", 
        phone: "+31 6 48258390", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/derk-ctf-2025-crew-4.jpg" 
      },
    ]
  },
  {
    category: "Productie team",
    members: [
      { 
        name: "Anita Schuurmans", 
        title: "Hoofd productie", 
        email: "anita@cafetheaterfestival.nl", 
        phone: "+31 6 11710228", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-14.jpg" 
      },
      { 
        name: "Merel Smeets", 
        title: "Producent Utrecht", 
        email: "merelsmeets@cafetheaterfestival.nl", 
        phone: "+31 6 41259904", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-13.jpg" 
      },
      { 
        name: "Nina de Wringer", 
        title: "Producent Arnhem", 
        email: "nina@cafetheaterfestival.nl", 
        phone: "+31 6 21520253", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-9.jpg" 
      },
      { 
        name: "Maud van Almkerk", 
        title: "Producent Rotterdam", 
        email: "maud@cafetheaterfestival.nl", 
        phone: "+31 6 17330779", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2024/08/MaudvAlmerk-Shoot-17.jpg" 
      },
      { 
        name: "Armani van Engelen", 
        title: "Technisch producent", 
        email: "Techniek@cafetheaterfestival.nl", 
        phone: null, 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-8.jpg" 
      },
      { 
        name: "Ira Helfferich", 
        title: "Technisch producent", 
        email: "Techniek@cafetheaterfestival.nl", 
        phone: null, 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-7.jpg" 
      },
      { 
        name: "Merel de Vries", 
        title: "Kantoorcoördinator", 
        email: "Merel@cafetheaterfestival.nl", 
        phone: null, 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/ctf-2025-crew-11.jpg" 
      },
    ]
  },
  {
    category: "Marketing Team",
    members: [
      { 
        name: "Marius Zürcher", 
        title: "Hoofd marketing", 
        email: "marius@cafetheaterfestival.nl", 
        phone: "+31 6 14743554", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2024/06/Smoelenboek-Organisatie-Marius.jpg"
      },
      { 
        name: "Maurijn Teunissen", 
        title: "Marketeer Arnhem", 
        email: "Maurijn@cafetheaterfestival.nl", 
        phone: "+31 6 50555157", 
        photo: "https://cafetheaterfestival.nl/wp-content/uploads/2025/01/maurijn-ctf-2025-crew-1.jpg" 
      },
    ]
  }
];

// Component voor een individueel teamlid
const TeamMemberCard = ({ member }) => {
  const { name, title, email, phone, photo } = member;

  return (
    <a href={`mailto:${email}`} className="group relative block overflow-hidden rounded-lg shadow-lg">
      <img
        src={photo}
        alt={`Foto van ${name}`}
        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/20747f/FFFFFF?text=Foto+niet+gevonden'; }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm">{title}</p>
        <div className="mt-2 border-t border-gray-400 pt-2 text-xs">
          <p>{email}</p>
          {phone && <p>{phone}</p>}
        </div>
      </div>
    </a>
  );
};

// Hoofdcomponent van de app
export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#20747f] font-sans text-white">
      <header className="flex items-center justify-between p-6">
        <h1 className="text-4xl font-bold">Wie is wie?</h1>
        <a href="https://cafetheaterfestival.nl/" target="_blank" rel="noopener noreferrer">
            <img 
                src="https://cafetheaterfestival.nl/wp-content/uploads/2025/06/Logo_Web_Trans_Wit.png" 
                alt="Logo Café Theater Festival" 
                className="h-16 w-auto"
                onError={(e) => { e.target.style.display='none'; }}
            />
        </a>
      </header>
      
      <main className="p-6">
        {teamData.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="mb-6 text-3xl font-semibold border-b-2 border-white/50 pb-2">{section.category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {section.members.map((member, memberIndex) => (
                <TeamMemberCard key={memberIndex} member={member} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
