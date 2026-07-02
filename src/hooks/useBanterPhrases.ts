import { useMemo } from 'react';
import { User } from '../constants/initialData';

/** Deterministically pick one from an array using a seed to avoid re-renders changing all at once */
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function generateBanterPhrases(users: User[], activeGame: string | null): string[] {
  if (!users || users.length === 0) return [];

  const withTotals = users.map(u => ({
    u,
    total: Object.values(u.scores).reduce((a, b) => a + b, 0) + (u.predictionPoints || 0),
  })).sort((a, b) => b.total - a.total);

  const hasData = withTotals.some(t => t.total > 0);
  if (!hasData) return [];

  const phrases: string[] = [];
  const leader = withTotals[0];
  const last = withTotals[withTotals.length - 1];
  const runnerUp = withTotals[1];
  const gap = leader.total - last.total;
  const tightGap = leader.total - runnerUp.total;

  // — Líder —
  phrases.push(
    pick([
      `${leader.u.name} va primero y ya se cree el puto amo de la LAN 👑`,
      `${leader.u.name} liderando... por ahora. Que no se confíe 😏`,
      `${leader.u.name} está que se sale, ¿alguien va a pagarle los pies? 🔥`,
      `Con esa carita que tiene ${leader.u.name} y encima va primero, qué vergüenza ajena`,
    ], leader.u.id)
  );

  // — Colista —
  if (last.total < leader.total && last.total >= 0) {
    phrases.push(
      pick([
        `${last.u.name} de último... 💀 algo es algo`,
        `${last.u.name} en el sótano del ranking. Dale un abrazo cuando le veas`,
        `Si hubiera premio al último, ${last.u.name} lo llevaría sin despeinarse`,
        `${last.u.name} de último, pero tiene mucho corazón (y pocos puntos) 💔`,
      ], last.u.id)
    );
  }

  // — Diferencia escandalosa —
  if (gap > 50) {
    phrases.push(`${leader.u.name} le saca ${gap} puntos a ${last.u.name}. Ya no es una competición, es bullying 😬`);
  } else if (gap > 30) {
    phrases.push(`Con ${gap} puntos de diferencia, la cosa ya está bastante clara... o no`);
  }

  // — Empate/muy igualados —
  if (tightGap <= 10 && tightGap >= 0 && runnerUp) {
    phrases.push(
      pick([
        `Solo ${tightGap} puntos entre ${leader.u.name} y ${runnerUp.u.name}. Esto se va a resolver a hostias 🤜🤛`,
        `${leader.u.name} y ${runnerUp.u.name} van igualados. La tensión se masca en el ambiente`,
        `¡${tightGap} puntitos de diferencia! ${runnerUp.u.name} le pisa los talones a ${leader.u.name}`,
      ], 1)
    );
  }

  // — Por juego —
  const allGames = new Set<string>();
  users.forEach(u => Object.keys(u.scores).forEach(g => allGames.add(g)));

  for (const game of allGames) {
    const byGame = users.map(u => ({ u, score: u.scores[game] || 0 })).sort((a, b) => b.score - a.score);
    const topGame = byGame[0];
    const bottomGame = byGame[byGame.length - 1];

    if (topGame.score > 0) {
      phrases.push(
        pick([
          `${topGame.u.name} domina el ${game} como si hubiera nacido con el mando en la mano 🎮`,
          `En el ${game}, ${topGame.u.name} es el rey indiscutible`,
          `${topGame.u.name} está que se sale en el ${game} 🚀`,
        ], topGame.u.id + game.length)
      );
    }

    if (bottomGame.score === 0 && topGame.score > 0) {
      phrases.push(
        pick([
          `${bottomGame.u.name} lleva 0 puntos en ${game}... presencia testimonial 👀`,
          `${bottomGame.u.name} y el ${game}: una relación que claramente no funciona`,
          `${bottomGame.u.name} en el ${game} está hecho una mierda, con cariño`,
        ], bottomGame.u.id + game.length + 1)
      );
    }
  }

  // — Juego activo —
  if (activeGame) {
    phrases.push(
      pick([
        `El ${activeGame} en curso... alguien va a salir muy contento y otro muy hundido 😬`,
        `Ahora mismo el honor está en juego en el ${activeGame} ⚔️`,
        `¿Quién va a dominar el ${activeGame}? La respuesta, en breve`,
      ], activeGame.length)
    );
  }

  // — Última ronda —
  const maxHistory = Math.max(...users.map(u => u.history?.length || 0));
  if (maxHistory > 2) {
    const lastGains = users.map(u => ({
      u,
      gain: (u.history[maxHistory - 1] || 0) - (u.history[maxHistory - 2] || 0),
    })).sort((a, b) => b.gain - a.gain);

    if (lastGains[0].gain > 0) {
      phrases.push(
        `Última ronda: ${lastGains[0].u.name} fue el que más puntúo 💪 El resto: a ponerse las pilas`
      );
    }
    if (lastGains[lastGains.length - 1].gain === 0) {
      phrases.push(
        `${lastGains[lastGains.length - 1].u.name} no sumó nada en la última ronda. Qué pena`
      );
    }
  }

  // — Predicciones —
  const predLeader = [...users].sort((a, b) => (b.predictionPoints || 0) - (a.predictionPoints || 0))[0];
  if ((predLeader.predictionPoints || 0) > 0) {
    phrases.push(`${predLeader.name} lleva ${predLeader.predictionPoints} puntos de predicciones. El oráculo de la LAN 🔮`);
  }

  return phrases.filter(Boolean);
}

/**
 * Returns the full array of phrases for the current state, and a hasData flag.
 * - No data  → geek quotes only
 * - Has data → banter phrases only (generated from live game data)
 *
 * The *cycling* is intentionally NOT done here — it lives in QuotesBanner
 * so the phrase only changes when the scroll animation ends (animationiteration event).
 */
export default function useBanterPhrases(
  users: User[],
  activeGame: string | null,
  geekQuotes: string[]
): { phrases: string[]; hasData: boolean } {
  const hasData = useMemo(
    () => users.some(u => Object.values(u.scores).some(s => s > 0) || (u.history?.length || 0) > 1),
    [users]
  );

  const phrases = useMemo(() => {
    if (!hasData) return [...geekQuotes];
    const banter = generateBanterPhrases(users, activeGame);
    return banter.length > 0 ? banter : [...geekQuotes];
  }, [hasData, users, activeGame, geekQuotes]);

  return { phrases, hasData };
}


