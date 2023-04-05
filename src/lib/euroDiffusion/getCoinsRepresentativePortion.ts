export const getCountsRepresentativePortion = (totalCoinsOfOneMotif: number): number => {
    return Math.floor(totalCoinsOfOneMotif / 1000);
}