/* eslint-disable no-underscore-dangle */
export const sustitution = (value) => value ?? '-';

export const dateFormatter = (value) =>
  value?._seconds
    ? new Date(value._seconds * 1000).toLocaleDateString('es-CO', {
        timeZone: 'UTC'
      })
    : '--/--/----';
