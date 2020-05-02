export const defaultOptions = {
  /**
   * Lower all cases (A-Z -> a-z) or not, or set locale for `String.prototype.toLocaleLowerCase`
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase
   * @example
   * ```js
   * slugify('A') // a
   * slugify('A', { lowercase: false }) // A
   * slugify('\u0130', { lowercase: 'en-US' }) // '\u0069\u0307'
   * slugify('\u0130', { lowercase: 'tr' }) // '\u0069'
   * ```
   */
  lowercase: true,
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
   */
  normalize: 'NFKC',
  /**
   * Default replacement for reserved, unsafe characters
   * @example
   * ```js
   * slugify('a?# b') // a---b
   * slugify('a?# b', '_') // a___b
   * slugify('a?# b', { replacement: '_' }) // a___b
   * ```
   */
  replacement: '-',
  /**
   * Replace reserved characters or not, or set replacement only for reserved characters
   * @example
   * ```js
   * slugify('a?# b') // a---b
   * slugify('a?# b', { reserved: false }) // a?--b
   * slugify('a?# b', { reserved: '_' }) // a_--b
   * ```
   */
  reserved: true,
  /**
   * Replace unsafe characters (without spaces) or not, or set replacement only for unsafe characters
   * @example
   * ```js
   * slugify('a?# b') // a---b
   * slugify('a?# b', { unsafe: false }) // a-#-b
   * slugify('a?# b', { unsafe: '_' }) // a-_-b
   * ```
   */
  unsafe: true,
  /**
   * Trim spaces or not
   * @example
   * ```js
   * slugify(' a b ') // a-b
   * slugify(' a b ', { trim: false }) // -a-b-
   * ```
   */
  trim: true,
  /**
   * Space less, convert continuous spaces to single one
   * @example
   * ```js
   * slugify('a  b') // a-b
   * slugify('a  b', { spaceLess: false }) // a--b
   * ```
   */
  spaceLess: true,
  /**
   * Replace spaces or not, or set replacement only for spaces
   * @example
   * ```js
   * slugify('a?# b') // a---b
   * slugify('a?# b', { space: false }) // a-- b
   * slugify('a?# b', { space: '_' }) // a--_b
   * ```
   */
  space: true
}
export function slugify (str, options = {}) {
  if (typeof options === 'string') {
    options = {
      ...defaultOptions,
      replacement: options
    }
  } else {
    options = {
      ...defaultOptions,
      ...options
    }
  }
  let slug = str
  if (options.lowercase) {
    slug = slug.toLocaleLowerCase(options.lowercase)
  }
  if (options.normalize) {
    slug = slug.normalize(options.normalize)
  }
  // Reserved characters
  if (options.reserved) {
    let replacement
    if (options.reserved === true) {
      replacement = options.replacement
    } else {
      replacement = options.reserved
    }
    slug = slug.replace(/[;/?:@=&]/g, replacement)
  }
  // Unsafe characters without spaces
  if (options.unsafe) {
    let replacement
    if (options.unsafe === true) {
      replacement = options.replacement
    } else {
      replacement = options.unsafe
    }
    // eslint-disable-next-line no-useless-escape
    slug = slug.replace(/[<>#%{}|\^~\[\]]/g, replacement)
  }
  // handle spaces
  if (options.trim) {
    slug = slug.trim()
  }
  // turn multiple spaces to single space
  if (options.spaceLess) {
    slug = slug.replace(/\s+/g, ' ')
  }
  if (options.space) {
    let replacement
    if (options.space === true) {
      replacement = options.replacement
    } else {
      replacement = options.space
    }
    slug = slug.replace(/\s/g, replacement)
  }
  return slug
}
export class Slugify {
  constructor () {
    this.counter = {}
  }

  unique (str, sep) {
    if (Object.prototype.hasOwnProperty.call(this.counter, str)) {
      this.counter[str]++
      return this.unique(str + sep + this.counter[str], sep)
    }
    this.counter[str] = 0
    return str
  }

  slug (str, options = {}, sep = '.') {
    const slug = slugify(str, options)
    return this.unique(slug, sep)
  }

  reset () {
    this.counter = {}
  }
}
