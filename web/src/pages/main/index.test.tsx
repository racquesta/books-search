import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockBookResponse } from './mockData';
import Main from './index';
describe('Main Component', () => {
  it('display fetch and display results properly', async () => {
    fetch.mockResponse(JSON.stringify(mockBookResponse));

    render(<Main />);

    const authorInput = screen.getByLabelText('Author');
    fireEvent.change(authorInput, { target: { value: 'blume' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(mockBookResponse.items?.length).toBe(2);
      (mockBookResponse.items || []).forEach((book) => {
        expect(screen.getByText(book.volumeInfo.title)).toBeInTheDocument();
      });
    });
  });
});
