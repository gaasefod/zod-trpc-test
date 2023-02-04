import { procedure, router } from "@/server/trpc";
import { z } from "zod";

const PokedexName = [
  "national",
  "kanto",
  "letsgo-kanto",
  "original-johto",
  "updated-johto",
  "hoenn",
  "updated-hoenn",
  "original-sinnoh",
  "extended-sinnoh",
  "original-unova",
  "updated-unova",
  "kalos",
  "original-alola",
  "updated-alola",
  "galar",
  "hisui",
] as const;

const pokedexSchema = z.object({
  name: z.enum(PokedexName),
  id: z.number(),
  is_main_series: z.boolean(),
  pokemon_entries: z.array(
    z.object({
      entry_number: z.number(),
      pokemon_species: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
  version_groups: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

const appRouter = router({
  test: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  pokedex: procedure
    .input(
      z.object({
        name: z.enum(PokedexName),
      })
    )
    .query(async ({ input }) => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokedex/" + input.name
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pokedex");
      }

      const data = await response.json();

      return pokedexSchema.parse(data);
    }),
});

type AppRouter = typeof appRouter;

export { appRouter };
export type { AppRouter };
