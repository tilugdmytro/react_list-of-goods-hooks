import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  default = '',
  name = 'name',
  length = 'length',
}

interface FilterParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.length:
          return good1.length - good2.length;

        case SortType.name:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  function isOriginalOrder(arr1: string[], arr2: string[]) {
    return !arr1.every((el, i) => el === arr2[i]);
  }

  const reset = () => {
    setSortField(SortType.default);
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isOriginalOrder(visibleGoods, goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
