import { persistState } from '@storeon/localstorage';
import { createStoreon } from 'storeon';

import { Events, manager, State } from './manager';

export const store = createStoreon<State, Events>([manager, persistState(['manager'])]);
