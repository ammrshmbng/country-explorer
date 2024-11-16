import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

describe('Home', () => {
  it('should render home page', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    
    const heading = screen.getByRole('heading', { level: 1 });
    
    expect(heading).toBeInTheDocument();
  });
});