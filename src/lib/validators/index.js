import * as _ from 'lodash';

const consolidate = (...entities) => {
  const mergedEntities = _.transform(
    _.compact(entities),
    (memo, entity) => {
      _.merge(memo, entity);
    },
    {},
  );

  return _.isEmpty(mergedEntities) ? null : mergedEntities;
};

const compose = (...fns) => entity => fns.reduce((memo, fn) => fn(memo), entity);

const initialize = props => entity => ({ ...entity, ...props });

const fieldExtract = key => entity => {
  const extracted = entity[key];
  if (_.isEmpty(extracted)) return null;

  return _.transform(
    extracted,
    (memo, value, subkey) => {
      memo[subkey] = _.head(value);
    },
    {},
  );
};

const length = ({ min = 0, max = Number.POSITIVE_INFINITY }) => entity => {
  const [{ length }] = Object.values(entity);
  let error = [];

  if (length < min) error.push(`can't be less ${min}`);
  if (length > max) error.push(`can't be more ${max}`);

  return error.length !== 0
    ? mergeErrors({ entity, error })
    : entity;
};

const format = ({ format, message = 'invalid format' }) => entity => {
  const [value] = Object.values(entity);
  let error = [];

  if (value.match(format) === null) error.push(message);

  return error.length !== 0
    ? mergeErrors({ entity, error })
    : entity;
};

const mergeErrors = ({ entity, error }) => {
  const { errors } = entity;
  const [key] = Object.keys(entity);
  const currentErrors = errors[key] || [];

  return { ...entity, errors: { ...errors, [key]: [...currentErrors, ...error] } };
};

export { compose, initialize, fieldExtract, length, format, consolidate };
