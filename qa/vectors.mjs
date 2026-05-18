/**
 * Published Known-Answer Test (KAT) vectors — external ground truth.
 *
 * Sources: NIST CSRC example values (SHA-1/2/3), RFC 1321 (MD5),
 * RFC 7693 Appendix A/B (BLAKE2), the SM3 draft test vector, and the
 * ISO/IEC RIPEMD-160 reference values.
 *
 * The QA runner first proves Node's `crypto` (the oracle) reproduces every
 * one of these. If any fails, the environment/oracle is untrustworthy and the
 * whole run aborts — we never validate the extension against a bad oracle.
 *
 * Keyed by Node crypto name; hex digest of the given UTF-8 input.
 */
export const KAT = [
  { cryptoName: 'sha256', input: '', expected: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  { cryptoName: 'sha256', input: 'abc', expected: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' },
  { cryptoName: 'sha224', input: 'abc', expected: '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7' },
  { cryptoName: 'sha384', input: 'abc', expected: 'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7' },
  { cryptoName: 'sha512', input: 'abc', expected: 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f' },
  { cryptoName: 'sha512-256', input: 'abc', expected: '53048e2681941ef99b2e29b76b4c7dabe4c2d0c634fc6d46e0e2f13107e7af23' },
  { cryptoName: 'sha512-224', input: 'abc', expected: '4634270f707b6a54daae7530460842e20e37ed265ceee9a43e8924aa' },
  { cryptoName: 'sha3-224', input: 'abc', expected: 'e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf' },
  { cryptoName: 'sha3-256', input: 'abc', expected: '3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532' },
  { cryptoName: 'sha3-384', input: 'abc', expected: 'ec01498288516fc926459f58e2c6ad8df9b473cb0fc08c2596da7cf0e49be4b298d88cea927ac7f539f1edf228376d25' },
  { cryptoName: 'sha3-512', input: 'abc', expected: 'b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e10e116e9192af3c91a7ec57647e3934057340b4cf408d5a56592f8274eec53f0' },
  { cryptoName: 'blake2b512', input: 'abc', expected: 'ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923' },
  { cryptoName: 'blake2s256', input: 'abc', expected: '508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982' },
  { cryptoName: 'ripemd160', input: 'abc', expected: '8eb208f7e05d987a9b044a8e98c6b087f15a0bfc' },
  { cryptoName: 'ripemd160', input: '', expected: '9c1185a5c5e9fc54612808977ee8f548b2258d31' },
  { cryptoName: 'sm3', input: 'abc', expected: '66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0' },
  { cryptoName: 'sha1', input: '', expected: 'da39a3ee5e6b4b0d3255bfef95601890afd80709' },
  { cryptoName: 'sha1', input: 'abc', expected: 'a9993e364706816aba3e25717850c26c9cd0d89d' },
  { cryptoName: 'md5', input: '', expected: 'd41d8cd98f00b204e9800998ecf8427e' },
  { cryptoName: 'md5', input: 'abc', expected: '900150983cd24fb0d6963f7d28e17f72' },
];
