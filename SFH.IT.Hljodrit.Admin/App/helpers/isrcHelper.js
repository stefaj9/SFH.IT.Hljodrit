import _ from 'lodash';

export function padIsrcNumber(isrcNumber) {
    return _.padStart(isrcNumber, 5, '0');
}