/**
 * @file __tests__/Hero.test.tsx
 * @description Unit tests for the Hero component.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../components/Hero';

describe('Hero component', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it('renders the hero section', () => {
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });

  it('displays the developer name', () => {
    expect(screen.getByTestId('hero-name')).toBeInTheDocument();
    expect(screen.getByTestId('hero-name')).toHaveTextContent('Chetna');
  });

  it('renders the "View My Work" CTA button', () => {
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
  });

  it('renders the "Get In Touch" CTA button', () => {
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  it('View My Work link points to projects section', () => {
    const link = screen.getByText(/View My Work/i).closest('a');
    expect(link).toHaveAttribute('href', '#projects');
  });

  it('shows Open to Work badge', () => {
    expect(screen.getByText(/Open to Work/i)).toBeInTheDocument();
  });
});
