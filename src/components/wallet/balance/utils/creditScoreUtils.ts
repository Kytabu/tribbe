
export const getCreditScoreColor = (score: number): string => {
  if (score >= 800) return "from-[#C699FF] to-[#9b87f5]";
  if (score >= 740) return "from-[#A9FF22] to-[#79CFFF]";
  if (score >= 670) return "from-[#79CFFF] to-[#33C3F0]";
  if (score >= 580) return "from-[#F6D83E] to-[#F97316]";
  return "from-[#ea384c] to-[#ef4444]";
};
