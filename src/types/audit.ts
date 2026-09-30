export interface AuditBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Simulation {
  title: string;
  opponentArgument: string;
  themisCounter: string;
}

export interface AuditIssue {
  id: string;
  title: string;
  reasoning: string;
  savings: number;
  severity: number;
  box: AuditBox;
}

export interface AuditResponse {
  docType: 'medical' | 'lease' | 'contract' | 'other';
  overallSeverity: number;
  winProbability: number;
  reasoningSteps: string[];
  simulations: Simulation[];
  issues: AuditIssue[];
}
