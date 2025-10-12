// components/scoring.tsx

export interface AnswerInput {
  domain: string;
  facet?: number;
  score: number;
}

export interface FacetResult {
  score: number;
  count: number;
  result: string;
}

export interface DomainResult {
  score: number;
  count: number;
  result: string;
  facet: Record<number, FacetResult>;
}

export type Results = Record<string, DomainResult>;

export function calculateResult(score: number, count: number): string {
  const avg = score / count;
  if (avg > 3.5) return "high";
  if (avg < 2.5) return "low";
  return "neutral";
}

export function processAnswers(answersList: AnswerInput[]): Results {
  const result: Results = {};

  answersList.forEach(({ domain, facet, score }) => {
    if (!result[domain]) {
      result[domain] = { score: 0, count: 0, result: "neutral", facet: {} };
    }
    const domainEntry = result[domain];
    domainEntry.score += score;
    domainEntry.count += 1;

    if (facet !== undefined) {
      if (!domainEntry.facet[facet]) {
        domainEntry.facet[facet] = { score: 0, count: 0, result: "neutral" };
      }
      const facetEntry = domainEntry.facet[facet];
      facetEntry.score += score;
      facetEntry.count += 1;
    }
  });

  Object.values(result).forEach((domainEntry) => {
    domainEntry.result = calculateResult(domainEntry.score, domainEntry.count);
    Object.values(domainEntry.facet).forEach((facetEntry) => {
      facetEntry.result = calculateResult(facetEntry.score, facetEntry.count);
    });
  });

  return result;
}
