export type TimelineContext = 'work' | 'home' | 'wellness' | 'focus' | 'errand';

export type TimelineItem = {
  id: string;
  time: string;
  title: string;
  context: TimelineContext;
};
