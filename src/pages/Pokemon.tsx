import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonData {
  abilities: Array<{
    ability: { name: string };
    is_hidden: boolean;
  }>;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
}

const limit = 20;

export function Pokemon() {
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [nextOffset, setNextOffset] = useState(0);

  async function getPokemon() {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(
        `/pokemon?offset=${nextOffset}&limit=${limit}`,
      );
      setPokemonList((prev) => [...prev, ...res.data.results]);
      const newOffset = res.data.next.match(/offset=([0-9]*)/)[1];
      setNextOffset(newOffset);

      setIsError(false);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPokemon();
  }, []);

  if (isError) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <ul css={styles.container}>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.url}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
      {isLoading && <span>loading</span>}
      <button onClick={getPokemon}>load more</button>
    </div>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getPokemon() {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(pokemon.url);
      setPokemonData(res.data);

      setIsError(false);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div css={styles.pokItem}>
      <img src={pokemonData?.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <span>{pokemonData?.types[0]?.type.name}</span>
      <ul>
        {pokemonData?.abilities.map((ability) => (
          <li>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    list-style: none;
    gap: 10px;
    align-items: center;
    margin: 0 auto;
  `,
  pokItem: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: antiquewhite;
    height: 200px;
    width: 200px;
    margin: 0 auto;
    border-radius: 4px;

    font-family: "Courier New", Courier, monospace;

    ul {
      padding: 0;
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      gap: 5px;

      li {
        font-size: 12px;
        padding: 3px;
        background-color: beige;
        border-radius: 2px;
      }
    }
  `,
};
