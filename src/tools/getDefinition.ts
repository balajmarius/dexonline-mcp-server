import { z } from "zod";

import { respond } from "@/utils/helpers";

type DexApiResponse = {
  word: string | undefined;
  definitions: string[];
};

export const name = "getDefinition";
export const url = "https://dexonline.ro/definitie/";

export const schema = {
  query: z.string().describe("The word to look up in the dictionary"),
};

export const handler = async (input: { query: string }) => {
  try {
    const result = await fetch(url + input.query + "/json");
    const data: DexApiResponse = await result.json();

    if (data?.word) {
      return respond(data.definitions);
    }
    return respond("I couldn’t find a definition");
  } catch {
    return respond("An error occurred while fetching the definition");
  }
};
