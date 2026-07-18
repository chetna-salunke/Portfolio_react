/**
 * @file __tests__/Skills.test.tsx
 * @description Unit tests for the Skills component.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from '../components/Skills';

// Mock react-intersection-observer so inView is always true in tests
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true }),
}));

describe('Skills component', () => {
  beforeEach(() => {
    render(<Skills />);
  });

  it('renders the skills section', () => {
    expect(screen.getByTestId('skills')).toBeInTheDocument();
  });

  it('displays the section heading', () => {
    expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
  });

  it('renders All filter tab by default', () => {
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders .NET MAUI skill by default', () => {
    expect(screen.getByText('.NET MAUI')).toBeInTheDocument();
  });

  it('filters to mobile skills when Mobile tab is clicked', () => {
    const mobileBtn = screen.getByText(/Mobile/i);
    fireEvent.click(mobileBtn);
    expect(screen.getByText('.NET MAUI')).toBeInTheDocument();
    expect(screen.queryByText('React.js')).not.toBeInTheDocument();
  });

  it('filters to frontend skills when Frontend tab is clicked', () => {
    const frontendBtn = screen.getByText(/Frontend/i);
    fireEvent.click(frontendBtn);
    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.queryByText('.NET MAUI')).not.toBeInTheDocument();
  });

  it('restores all skills when All tab is clicked after filtering', () => {
    // Click mobile
    fireEvent.click(screen.getByText(/Mobile/i));
    // Click All again
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.getByText('.NET MAUI')).toBeInTheDocument();
  });
});
