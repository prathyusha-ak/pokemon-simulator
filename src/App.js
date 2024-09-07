import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [showMoves, setShowMoves] = useState(false);
  const [battleLog, setBattleLog] = useState("");

  useEffect(() => {
    // PART-1 Fetch two random Pokémon initially when the component loads
    fetchRandomPokemons();
  }, []);

  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; // PART-2 Fetch random Pokémon from the first 151
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    return response.data;
  };

  const getPokemonMove = async (pokemon) => {
    // PART-3 Filter moves that have valid power and return a random one
    const validMoves = pokemon.moves.filter(
      (move) =>
        move.move.name &&
        move.version_group_details.some(
          (detail) => detail.move_learn_method.name === "level-up"
        )
    );
    if (validMoves.length === 0) {
      return { name: "Struggle", power: 50 }; // PART-4 Default move if no valid moves are available
    }
    const selectedMove =
      validMoves[Math.floor(Math.random() * validMoves.length)].move;
    const response = await axios.get(selectedMove.url);
    return response.data;
  };

  const fetchRandomPokemons = async () => {
    const poke1 = await getRandomPokemon();
    const poke2 = await getRandomPokemon();

    setPokemon1(poke1);
    setPokemon2(poke2);
    setShowMoves(false); // Reset the moves display
    setBattleLog(""); // PART-5 Clear previous battle log
  };

  const startBattle = async () => {
    if (!pokemon1 || !pokemon2) return;

    const move1 = await getPokemonMove(pokemon1);
    const move2 = await getPokemonMove(pokemon2);

    setPokemon1({ ...pokemon1, selectedMove: move1 });
    setPokemon2({ ...pokemon2, selectedMove: move2 });

    setShowMoves(true);

    // PART-6 Simple battle outcome based on move power
    let result;
    if (move1.power > move2.power) {
      result = `${pokemon1.name} wins with ${move1.name}! It's super effective!`;
    } else if (move1.power < move2.power) {
      result = `${pokemon2.name} wins with ${move2.name}! ${pokemon1.name} faints!`;
    } else {
      result = "It's a tie! Both Pokémon used equally powerful moves!";
    }

    setBattleLog(result);
  };

  return (
    <div className="battle-container">
      
      <h1>Pokémon Battle Simulator</h1>

      <div className="pokemon-details">
        {/* Pokémon 1 */}
        {pokemon1 && (
          <div className="pokemon-block">
            <div className="pokemon-row">
              <div className="message-body">
                <h3>{pokemon1.name}</h3>
                {showMoves && (
                  <p className="upt">
                    {pokemon1.selectedMove.name}:{" "}
                    {pokemon1.selectedMove.power || "N/A"}
                  </p>
                )}
              </div>
              <img
                src={pokemon1.sprites.front_default}
                alt={pokemon1.name}
                className="pokemon-image"
              />
            </div>
          </div>
        )}

        {/* Pokémon 2 */}
        {pokemon2 && (
          <div className="pokemon-block">
            <div className="pokemon-row">
              <img
                src={pokemon2.sprites.back_default}
                alt={pokemon2.name}
                className="pokemon-image"
              />
              <div className="message-body">
                <h3>{pokemon2.name}</h3>
                {showMoves && (
                  <p className="upt2">
                    {pokemon2.selectedMove.name}:{" "}
                    {pokemon2.selectedMove.power || "N/A"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="Flex">
        <div className="message-body2">
          <h2 className="battle-log-title">Battle Log!!!</h2>
          <p style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '18px' }}>
            {battleLog}
          </p>
        </div>

        {/* Buttons for starting the battle and getting random Pokémon */}
        <div className="button-container">
          <button className="btn1" onClick={fetchRandomPokemons}>
            Random Pokémon
          </button>
          <button className="btn1" onClick={startBattle}>
            Start Battle!
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
