import { Comments } from './commentType';

export const commentsMock: Comments = [
  {
    comment: 'cool',
    date: 'December 12, 2022',
    id: 1,
    rating: 8,
    user: {
      id: 1,
      name: 'Schwarz',
    },
  },
  {
    comment: 'so-so',
    date: 'December 13, 2022',
    id: 2,
    rating: 5,
    user: {
      id: 2,
      name: 'Nick Beam',
    },
  },
];
