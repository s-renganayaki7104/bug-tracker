export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  reporter: string;
  assignedTo: string;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export type NewBugInput = Omit<Bug, 'id' | 'createdAt' | 'resolvedAt' | 'resolvedBy'>;
