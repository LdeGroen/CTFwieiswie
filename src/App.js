import React, { useEffect, useState } from 'react';

// Productie-backend; via REACT_APP_API_URL override-baar lokaal.
const API_URL = process.env.REACT_APP_API_URL || 'https://backend.cafetheaterfestival.nl';

// Hulp: standaard ophalen van een publiek endpoint, met een 15s timeout
// zodat een hangende server niet de hele app blokkeert.
async function fetchPublic(path) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`${API_URL}${path}`, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } finally {
    clearTimeout(timer);
  }
}

// Component voor een individueel teamlid
const TeamMemberCard = ({ member }) => {
  const photo = member.Foto || 'https://placehold.co/400x400/20747f/FFFFFF?text=Geen+foto';
  const title = Array.isArray(member.functie) && member.functie.length > 0 ? member.functie[0] : (member.Role || '');

  return (
    <a href={member.Email ? `mailto:${member.Email}` : '#'} className="group relative block overflow-hidden rounded-lg shadow-lg aspect-square">
      <img
        src={photo}
        alt={`Foto van ${member.Name}`}
        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/20747f/FFFFFF?text=Foto+niet+gevonden'; }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <h3 className="text-lg font-bold">{member.Name}</h3>
        {title && <p className="text-sm">{title}</p>}
        <div className="mt-2 border-t border-gray-400 pt-2 text-xs">
          {member.Email && <p>{member.Email}</p>}
          {member.Phone && <p>{member.Phone}</p>}
        </div>
      </div>
    </a>
  );
};

// Hoofdcomponent
export default function App() {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Parallel ophalen — scheelt een ronde latency.
        const [teamsRes, membersRes] = await Promise.all([
          fetchPublic('/api/public/teams?per_page=200'),
          fetchPublic('/api/public/team-members?per_page=500'),
        ]);
        if (cancelled) return;
        // Sorteer teams op Volgorde (null/undefined achteraan)
        const sortedTeams = [...teamsRes].sort((a, b) => {
          const va = a.Volgorde ?? 9999;
          const vb = b.Volgorde ?? 9999;
          return va - vb;
        });
        setTeams(sortedTeams);
        setMembers(membersRes);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Onbekende fout');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Groepeer leden per team-id (string-key voor robustheid)
  const membersByTeam = React.useMemo(() => {
    const map = new Map();
    for (const m of members) {
      const key = m.Team_ID ? String(m.Team_ID) : 'none';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(m);
    }
    // Sorteer leden binnen elk team op naam
    for (const arr of map.values()) {
      arr.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
    }
    return map;
  }, [members]);

  return (
    <div className="min-h-screen w-full bg-[#20747f] font-sans text-white">
      <header className="flex items-center justify-between p-6">
        <h1 className="text-4xl font-bold">Wie is wie?</h1>
        <a href="https://cafetheaterfestival.nl/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cafetheaterfestival.nl/wp-content/uploads/2025/06/Logo_Web_Trans_Wit.png"
            alt="Logo Café Theater Festival"
            className="h-16 w-auto"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </a>
      </header>

      <main className="p-6">
        {loading && <p className="text-center opacity-70">Bezig met laden…</p>}
        {error && <p className="text-center text-red-200">Kon teamgegevens niet laden: {error}</p>}

        {!loading && !error && teams.length === 0 && (
          <p className="text-center opacity-70">Geen teams om te tonen.</p>
        )}

        {!loading && !error && teams.map(team => {
          const leden = membersByTeam.get(String(team.id)) || [];
          if (leden.length === 0) return null;
          return (
            <section key={team.id} className="mb-12">
              <h2 className="mb-6 text-3xl font-semibold border-b-2 border-white/50 pb-2">{team.Naam}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {leden.map(m => (
                  <TeamMemberCard key={m.id} member={m} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
