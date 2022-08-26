import { createStoreon } from 'storeon';
import { persistState } from '@storeon/localstorage';

import { Events, manager, State } from './manager';

export const store = createStoreon<State, Events>([manager, persistState()]);
