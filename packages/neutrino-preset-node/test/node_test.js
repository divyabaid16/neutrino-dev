import test from 'ava';
import { validate } from 'webpack';
import { Neutrino } from 'neutrino';

test('loads preset', t => {
  t.notThrows(() => require('..'));
});

test('uses preset', t => {
  const api = Neutrino();

  t.notThrows(() => api.use(require('..')));
});

test('uses preset with custom entry', t => {
  const api = Neutrino({ entry: 'server' });

  t.notThrows(() => api.use(require('..')));
  t.true(api.config.entryPoints.has('server'));
});

test('valid preset production', t => {
  const api = Neutrino({ env: { NODE_ENV: 'production' } });
  
  api.use(require('..'));

  const errors = validate(api.config.toConfig());

  t.is(errors.length, 0);
});

test('valid preset development', t => {
  const api = Neutrino({ 'env': { NODE_ENV: 'development' } });

  api.use(require('..'));

  const errors = validate(api.config.toConfig());

  t.is(errors.length, 0);
});
