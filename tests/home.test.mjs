import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('preserves the page title and opening copy', () => {
  assert.match(html, /<title>Peter Pistorius<\/title>/);
  assert.match(html, /<h1>Hi, my name is Peter\.<\/h1>/);
  assert.match(
    html,
    /I'm a South African living in Berlin\. I love programming and it tends to take all of my time, so I try to balance my life with friendship, cycling, hiking and woodwork\./,
  );
});

test('preserves the social links and their destinations', () => {
  assert.match(html, /<a href="https:\/\/twitter\.com\/appfactory\/">Twitter<\/a>/);
  assert.match(html, /<a href="https:\/\/github\.com\/peterp\/">GitHub<\/a>/);
});

test('preserves the side project list and all four entries', () => {
  const entries = [
    ['https://redwoodjs.com', 'RedwoodJS', 'Bringing full-stack to the JAMstack'],
    ['https://machinen.dev', 'Machinen', 'Coming soon...'],
    ['https://github.com/peterp/Blackspace', 'Blackspace', 'Add blank spaces to your macOS Dock'],
    ['http://billable.me', 'Billable', 'Billing Made Simple. Period.'],
  ];

  for (const [href, label, description] of entries) {
    assert.match(html, new RegExp(`<a href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`, 'i'));
    assert.match(html, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('keeps the narrow reading width and relaxed spacing rules', () => {
  assert.match(html, /max-width:\s*480px;/);
  assert.match(html, /line-height:\s*1\.6;/);
  assert.match(html, /padding:\s*20px;/);
});
