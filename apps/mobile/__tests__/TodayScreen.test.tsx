import { render, screen } from '@testing-library/react-native';

import { TodayScreen } from '../src/screens/TodayScreen';

describe('TodayScreen', () => {
  it('renders the plan CTA and mock timeline', () => {
    render(<TodayScreen />);

    expect(screen.getByText('Plan My Day')).toBeTruthy();
    expect(screen.getByText('Morning Run')).toBeTruthy();
  });
});
