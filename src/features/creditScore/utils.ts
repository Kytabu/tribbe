
export interface CreditLevel {
  name: string;
  color: string;
  minScore: number;
}

export const streetCredLevels: CreditLevel[] = [
  { name: "The Newbie", color: "#FFCA99", minScore: 300 },
  { name: "The Builder", color: "#F9FE03", minScore: 580 },
  { name: "The Trailblazer", color: "#88D3FE", minScore: 670 },
  { name: "The Innovator", color: "#A9FF22", minScore: 740 },
  { name: "The Legend", color: "#C699FF", minScore: 800 }
];

export const getCurrentLevel = (score: number): CreditLevel => {
  return streetCredLevels
    .slice()
    .reverse()
    .find(level => score >= level.minScore) || streetCredLevels[0];
};
