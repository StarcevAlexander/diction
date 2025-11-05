export interface Exercise {
  id: number;
  title: string;
  description: string;
  duration: number;
  timeLeft: number;
  status: 'waiting' | 'active' | 'running' | 'completed' | 'paused';
  completed: boolean;
}
