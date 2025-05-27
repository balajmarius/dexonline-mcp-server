export type DexApiResponse = {
	word: string | undefined;
	definitions: ReadonlyArray<{ internalRep: string }>;
};
