#!/usr/bin/env node
const expect = require('chai').expect

if (!process.env.ENTRY) {
  process.env.ENTRY = 'lib'
}
const {
  slugify,
  Slugify
} = require(`../${process.env.ENTRY}/index.js`)

describe(`slugify (entry: ${process.env.ENTRY})`, () => {
  it('basic usage', () => {
    for (const v of [
      [slugify('I ♥'), 'i-♥'],
      [slugify('大好き ♥', '_'), '大好き_♥']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('lowercase', () => {
    for (const v of [
      [slugify('A'), 'a'],
      [slugify('A', { lowercase: false }), 'A'],
      [slugify('\u0130', { lowercase: 'en-US' }), '\u0069\u0307'],
      [slugify('\u0130', { lowercase: 'tr' }), '\u0069']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('replacement', () => {
    for (const v of [
      [slugify('a?# b'), 'a---b'],
      [slugify('a?# b', '_'), 'a___b'],
      [slugify('a?# b', { replacement: '_' }), 'a___b']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('reserved', () => {
    for (const v of [
      [slugify('a?# b'), 'a---b'],
      [slugify('a?# b', { reserved: false }), 'a?--b'],
      [slugify('a?# b', { reserved: '_' }), 'a_--b']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('unsafe', () => {
    for (const v of [
      [slugify('a?# b'), 'a---b'],
      [slugify('a?# b', { unsafe: false }), 'a-#-b'],
      [slugify('a?# b', { unsafe: '_' }), 'a-_-b']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('trim', () => {
    for (const v of [
      [slugify(' a b '), 'a-b'],
      [slugify(' a b ', { trim: false }), '-a-b-']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('spaceLess', () => {
    for (const v of [
      [slugify('a  b'), 'a-b'],
      [slugify('a  b', { spaceLess: false }), 'a--b']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('space', () => {
    for (const v of [
      [slugify('a?# b'), 'a---b'],
      [slugify('a?# b', { space: false }), 'a-- b'],
      [slugify('a?# b', { space: '_' }), 'a--_b']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
})

describe('Slugify', () => {
  it('should be unique', () => {
    const s = new Slugify()
    for (const v of [
      [s.slug('大好き ♥'), '大好き-♥'],
      [s.slug('大好き ♥'), '大好き-♥.1']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
  it('reset should work', () => {
    const s = new Slugify()
    s.slug('大好き ♥')
    s.reset()
    expect(s.slug('大好き ♥')).to.eql('大好き-♥')
  })
  it('should pass options to slugify method', () => {
    const s = new Slugify()
    expect(
      s.slug('大好き ♥', { space: '_' })
    ).to.eql('大好き_♥')
  })
  it('the sep parameter should work', () => {
    const s = new Slugify()
    for (const v of [
      [s.slug('大好き ♥', {}, '_'), '大好き-♥'],
      [s.slug('大好き ♥', {}, '_'), '大好き-♥_1'],
      [s.slug('大好き ♥_1', {}, '_'), '大好き-♥_1_1']
    ]) {
      expect(v[0]).to.eql(v[1])
    }
  })
})
