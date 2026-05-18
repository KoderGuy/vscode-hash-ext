var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// qa/embedded-data.mjs
var embedded_data_exports = {};
__export(embedded_data_exports, {
  BASELINE: () => BASELINE,
  TEST_STRINGS: () => TEST_STRINGS
});
var BASELINE, TEST_STRINGS;
var init_embedded_data = __esm({
  "qa/embedded-data.mjs"() {
    "use strict";
    BASELINE = { "schema": 1, "generatedBy": "esbuild.mjs --qa (oracle: Node crypto)", "algorithms": [{ "id": "sha256", "cryptoName": "sha256", "label": "SHA-256", "legacy": false }, { "id": "sha384", "cryptoName": "sha384", "label": "SHA-384", "legacy": false }, { "id": "sha512", "cryptoName": "sha512", "label": "SHA-512", "legacy": false }, { "id": "sha512_256", "cryptoName": "sha512-256", "label": "SHA-512/256", "legacy": false }, { "id": "sha3_224", "cryptoName": "sha3-224", "label": "SHA3-224", "legacy": false }, { "id": "sha3_256", "cryptoName": "sha3-256", "label": "SHA3-256", "legacy": false }, { "id": "sha3_384", "cryptoName": "sha3-384", "label": "SHA3-384", "legacy": false }, { "id": "sha3_512", "cryptoName": "sha3-512", "label": "SHA3-512", "legacy": false }, { "id": "blake2b512", "cryptoName": "blake2b512", "label": "BLAKE2b-512", "legacy": false }, { "id": "blake2s256", "cryptoName": "blake2s256", "label": "BLAKE2s-256", "legacy": false }, { "id": "sha224", "cryptoName": "sha224", "label": "SHA-224", "legacy": false }, { "id": "sha512_224", "cryptoName": "sha512-224", "label": "SHA-512/224", "legacy": false }, { "id": "ripemd160", "cryptoName": "ripemd160", "label": "RIPEMD-160", "legacy": false }, { "id": "sm3", "cryptoName": "sm3", "label": "SM3", "legacy": false }, { "id": "sha1", "cryptoName": "sha1", "label": "SHA-1", "legacy": true }, { "id": "md5", "cryptoName": "md5", "label": "MD5", "legacy": true }], "strings": [{ "id": "alpha-lower", "category": "alpha, lowercase only", "value": "rojzqsjncruibzoqhusffjmrsnsrdoqs" }, { "id": "alpha-upper", "category": "alpha, UPPERCASE (= alpha-lower uppercased)", "value": "ROJZQSJNCRUIBZOQHUSFFJMRSNSRDOQS" }, { "id": "alpha-mixed", "category": "alpha, mixed-case (= alpha-lower letters, random case)", "value": "rOJzqSjnCRuIbzoqhuSFFJMRsNSRdoQs" }, { "id": "alnum-lower", "category": "alpha lowercase + numeric", "value": "ujd8y4q5fymiwa9kmwr8iyfh1tyv10yt" }, { "id": "alnum-mixed", "category": "alpha mixed-case + numeric", "value": "aQY9jlIw8CLAuCNToCdc3v8LC0hHk5iX" }, { "id": "alnum-safe-symbols", "category": "alphanumeric + safe symbols (RFC-3986 unreserved: - . _ ~)", "value": "7q0nXc8zzjTXanN8FtLVo_6QJHrIyIc~" }, { "id": "alnum-extended-symbols", "category": "alphanumeric + extended symbols (full ASCII keyboard punctuation)", "value": "+D:L]CnW`|q;D'1J)_]uI78%MhO7;ng(" }], "hashes": { "alpha-lower": { "sha256": { "hex": "a19d850c3e9981a3218c36b44f5f9083b0d47750c2fd0c9e3b71b4622dfddab9", "base64": "oZ2FDD6ZgaMhjDa0T1+Qg7DUd1DC/QyeO3G0Yi392rk=" }, "sha384": { "hex": "baedb7361a649da2551ae4b6d22d546b02ac820ef04a40eddff31402dcc4db539096f6ad3cac9eb931a84bcd6f700f99", "base64": "uu23NhpknaJVGuS20i1UawKsgg7wSkDt3/MUAtzE21OQlvatPKyeuTGoS81vcA+Z" }, "sha512": { "hex": "2104a9ec69fa88166c6138b6d3e38b95589652597faaa464cbd56045fe6a39f5b906f9bf302929a58fef623f1ed7cd25a419ff17556d2dc30a04cefca813efad", "base64": "IQSp7Gn6iBZsYTi20+OLlViWUll/qqRky9VgRf5qOfW5Bvm/MCkppY/vYj8e180lpBn/F1VtLcMKBM78qBPvrQ==" }, "sha512-256": { "hex": "059cd5b67fa9b22495375b27903241754afb3a8363319c3f934c106a88782401", "base64": "BZzVtn+psiSVN1snkDJBdUr7OoNjMZw/k0wQaoh4JAE=" }, "sha3-224": { "hex": "077ee458ce6b2f31c84139ad92883adca2a53e5195614afae83f6690", "base64": "B37kWM5rLzHIQTmtkog63KKlPlGVYUr66D9mkA==" }, "sha3-256": { "hex": "96237f58f43024bd9bf91ee7e8fae9437e45237b61cde714ad0267ec3ad79614", "base64": "liN/WPQwJL2b+R7n6PrpQ35FI3thzecUrQJn7DrXlhQ=" }, "sha3-384": { "hex": "1d3a3bce7274af184a57ddd40a755c622489e6580c1d9b472b75469e106df7d973bba7b4c4092cd364dfb0d6dff04fc8", "base64": "HTo7znJ0rxhKV93UCnVcYiSJ5lgMHZtHK3VGnhBt99lzu6e0xAks02TfsNbf8E/I" }, "sha3-512": { "hex": "3ebaadc3b294fb2ac83af57e0246b7eebfd46807c45733056ab3e0abd3ee3e1e9bb1975017164550d894fa0bcd214f54847fa54f9756cc2fd95d29a44c5dfd19", "base64": "Prqtw7KU+yrIOvV+Aka37r/UaAfEVzMFarPgq9PuPh6bsZdQFxZFUNiU+gvNIU9UhH+lT5dWzC/ZXSmkTF39GQ==" }, "blake2b512": { "hex": "e9256342a029fbb82493318b52e53405dc4a39c89386b84652e97e6ae0ca0702c16ba674f7d711678af6c757ce0ecadea04b44cca0a224990594884630f34dc5", "base64": "6SVjQqAp+7gkkzGLUuU0BdxKOciThrhGUul+auDKBwLBa6Z099cRZ4r2x1fODsreoEtEzKCiJJkFlIhGMPNNxQ==" }, "blake2s256": { "hex": "003886f90dd2a6df527d348c07ed3b7840e932ada450045e1b4751b29bbf282c", "base64": "ADiG+Q3Spt9SfTSMB+07eEDpMq2kUAReG0dRspu/KCw=" }, "sha224": { "hex": "1fad9c8a5cf258688c0d2cd5f5e038e63d09426bc01335dae40bcf1f", "base64": "H62cilzyWGiMDSzV9eA45j0JQmvAEzXa5AvPHw==" }, "sha512-224": { "hex": "e8e600cde0f9b5a678b2ad4279fe0f0bc09c09fb7f1cd7369062f47f", "base64": "6OYAzeD5taZ4sq1Cef4PC8CcCft/HNc2kGL0fw==" }, "ripemd160": { "hex": "1575510bee52cda9db3cfb5cf3a8ea19ed5aed8c", "base64": "FXVRC+5SzanbPPtc86jqGe1a7Yw=" }, "sm3": { "hex": "f843b11ed8cf09ff1b2419d39e189844ded6a4d62da65c37d327fe3474d6857e", "base64": "+EOxHtjPCf8bJBnTnhiYRN7WpNYtplw30yf+NHTWhX4=" }, "sha1": { "hex": "b02c46bd5b1842cf92b6389cca324d82f8df6004", "base64": "sCxGvVsYQs+StjicyjJNgvjfYAQ=" }, "md5": { "hex": "19a313da48a9c78df44c01e5c60e5ea5", "base64": "GaMT2kipx430TAHlxg5epQ==" } }, "alpha-upper": { "sha256": { "hex": "76b529867aa2cdc172179fb0b68a4a476fb303783f98beedb3f9be030eda8235", "base64": "drUphnqizcFyF5+wtopKR2+zA3g/mL7ts/m+Aw7agjU=" }, "sha384": { "hex": "d27b4bbdd08a43ddde94eb2feadc4f4443613a72886f6e0ebfb0c481ea7c72d1d3bf403884633e66e6abd41c413cd54f", "base64": "0ntLvdCKQ93elOsv6txPRENhOnKIb24Ov7DEgep8ctHTv0A4hGM+Zuar1BxBPNVP" }, "sha512": { "hex": "2229979265b3b7000a229c7708e5bde9bb662d8d5710208452fc3a3cfe8df722ead41a03e6e2f5ca2dc823807e8e57a7cd1edbf12de7317e874ab94d70fcc683", "base64": "IimXkmWztwAKIpx3COW96btmLY1XECCEUvw6PP6N9yLq1BoD5uL1yi3II4B+jlenzR7b8S3nMX6HSrlNcPzGgw==" }, "sha512-256": { "hex": "085e9f2f7b936cc88a3a3dc3b4c6dad939ec6271fd3c97bf25cc6addbd8ed7ae", "base64": "CF6fL3uTbMiKOj3DtMba2TnsYnH9PJe/Jcxq3b2O164=" }, "sha3-224": { "hex": "c033b7aea3ba0137024809fd32b6809f84bea1e3a89582834889ee63", "base64": "wDO3rqO6ATcCSAn9MraAn4S+oeOolYKDSInuYw==" }, "sha3-256": { "hex": "88f5be0b45be38817577b77ee71b7877e04cf1938bc2486e579a6348b437ff88", "base64": "iPW+C0W+OIF1d7d+5xt4d+BM8ZOLwkhuV5pjSLQ3/4g=" }, "sha3-384": { "hex": "0143bcc461c1738c79e44ec28fa9966f2384acb9dcbc941d5b13ea3e880e0bb2739ec533ac999ae8337bfb574214801a", "base64": "AUO8xGHBc4x55E7Cj6mWbyOErLncvJQdWxPqPogOC7JznsUzrJma6DN7+1dCFIAa" }, "sha3-512": { "hex": "58872ceb93d304325501c66b86b95e9528df4ba962c3f1fa5fa8bedf20eadaed106adea38b367c4cb4cf5bdcd731c59654e826dac45d8bc9d5e054473e0e3def", "base64": "WIcs65PTBDJVAcZrhrlelSjfS6liw/H6X6i+3yDq2u0Qat6jizZ8TLTPW9zXMcWWVOgm2sRdi8nV4FRHPg497w==" }, "blake2b512": { "hex": "7eb1dc6e9dddc63a11f76be0666be9b2f7dfb971eb98c573b814df541121f28eae08dde7d57818a40f491d74ff878dcbd1a28fc9e31a511877393a9e9905d878", "base64": "frHcbp3dxjoR92vgZmvpsvffuXHrmMVzuBTfVBEh8o6uCN3n1XgYpA9JHXT/h43L0aKPyeMaURh3OTqemQXYeA==" }, "blake2s256": { "hex": "12516f4a188eaec60e82e4ea985fd5ff7a8189f9f854a3f19acbcd06714eecc3", "base64": "ElFvShiOrsYOguTqmF/V/3qBifn4VKPxmsvNBnFO7MM=" }, "sha224": { "hex": "056569046647224202913450bb8b72005e4a09b44c94f319dc5c7d93", "base64": "BWVpBGZHIkICkTRQu4tyAF5KCbRMlPMZ3Fx9kw==" }, "sha512-224": { "hex": "a69b3802cea3fe183ed6c04a2d2168c6ab00e75bd265722c05c1c5cf", "base64": "pps4As6j/hg+1sBKLSFoxqsA51vSZXIsBcHFzw==" }, "ripemd160": { "hex": "e14f99a744afcb56c52958bf999a635210512867", "base64": "4U+Zp0Svy1bFKVi/mZpjUhBRKGc=" }, "sm3": { "hex": "b1db3fdea96c9e94455ed68ed119b766b14e5b07f85a0a6e3d31030d401a1928", "base64": "sds/3qlsnpRFXtaO0Rm3ZrFOWwf4WgpuPTEDDUAaGSg=" }, "sha1": { "hex": "f63d7fc6cbff0911b7c24e8daab2ac2f07df886f", "base64": "9j1/xsv/CRG3wk6NqrKsLwffiG8=" }, "md5": { "hex": "4c73ccab2129c4967b524520bee6214d", "base64": "THPMqyEpxJZ7UkUgvuYhTQ==" } }, "alpha-mixed": { "sha256": { "hex": "3029f3cb66a5bfc732325c092406cc8b1c141e7fc6f8a1e098fa7413b22f0edc", "base64": "MCnzy2alv8cyMlwJJAbMixwUHn/G+KHgmPp0E7IvDtw=" }, "sha384": { "hex": "83c5eaf8073cde5d9af567e32736510b73c344e3d30172e717a58fa83057ec981bced7c40dbbcedf3f63503e3c0c1739", "base64": "g8Xq+Ac83l2a9WfjJzZRC3PDROPTAXLnF6WPqDBX7JgbztfEDbvO3z9jUD48DBc5" }, "sha512": { "hex": "f5bc7c765bd3ee22f148c984c80c276422f0e7ab9a244920275e41a3bd8c69cd9dd6ae8994072c2c36dfe64a9d499a971429e02a3196a2827ae344c3694d0121", "base64": "9bx8dlvT7iLxSMmEyAwnZCLw56uaJEkgJ15Bo72Mac2d1q6JlAcsLDbf5kqdSZqXFCngKjGWooJ640TDaU0BIQ==" }, "sha512-256": { "hex": "a6e710702833114aa98b886baf35f4c005e7597bdc740d9681cc0d5d673cae7f", "base64": "pucQcCgzEUqpi4hrrzX0wAXnWXvcdA2WgcwNXWc8rn8=" }, "sha3-224": { "hex": "3237302d91a23fe03691cb54c526928b0374dc3b83920c03830dff67", "base64": "MjcwLZGiP+A2kctUxSaSiwN03DuDkgwDgw3/Zw==" }, "sha3-256": { "hex": "350781249974ff3e914c03587263bb2300b887e4d0669b12f43e2335690508b7", "base64": "NQeBJJl0/z6RTANYcmO7IwC4h+TQZpsS9D4jNWkFCLc=" }, "sha3-384": { "hex": "ff5314f281741945010be4ae354a9162da78e5723fb22ce823ea67d9bf72e15209682e1a6fa4c7e972a2675502ba582e", "base64": "/1MU8oF0GUUBC+SuNUqRYtp45XI/sizoI+pn2b9y4VIJaC4ab6TH6XKiZ1UCulgu" }, "sha3-512": { "hex": "3401bb4dd9203b87f6f83fb8309794d060a47426eb2215fe9f707236d06c1587857bf882a2fd54c5272396f1f25ae84e23d4d6c75013dd952906c920db7b1b0e", "base64": "NAG7TdkgO4f2+D+4MJeU0GCkdCbrIhX+n3ByNtBsFYeFe/iCov1UxScjlvHyWuhOI9TWx1AT3ZUpBskg23sbDg==" }, "blake2b512": { "hex": "8c7d9e67937e1482fb35e14330f3400a1483b20bf88b4f13bb159558e32c9f4ecc3f6ff167e5919f3d7ceebc86e707a2a4d85d27c8f5061c3ee62e37cd9099cc", "base64": "jH2eZ5N+FIL7NeFDMPNAChSDsgv4i08TuxWVWOMsn07MP2/xZ+WRnz187ryG5weipNhdJ8j1Bhw+5i43zZCZzA==" }, "blake2s256": { "hex": "1129daa8af216cb003b219b0be6f1718d618c4c5372e7fe7f2f3a2e2c92dc8a0", "base64": "ESnaqK8hbLADshmwvm8XGNYYxMU3Ln/n8vOi4sktyKA=" }, "sha224": { "hex": "67483326a95d3f39169b5a705daf81de93678772a718cb07d551d002", "base64": "Z0gzJqldPzkWm1pwXa+B3pNnh3KnGMsH1VHQAg==" }, "sha512-224": { "hex": "5d5ac73188aea3ae8a66cffc54e2477bb349022674aceeb0e3f2754f", "base64": "XVrHMYiuo66KZs/8VOJHe7NJAiZ0rO6w4/J1Tw==" }, "ripemd160": { "hex": "2b74873322479c74c7e8019a2d239dcb99191d2e", "base64": "K3SHMyJHnHTH6AGaLSOdy5kZHS4=" }, "sm3": { "hex": "3bab46fff5b9c41cf424578099b0bdfc598a486818b78f089d801fb1ceb585d0", "base64": "O6tG//W5xBz0JFeAmbC9/FmKSGgYt48InYAfsc61hdA=" }, "sha1": { "hex": "a1ff050d56824abf35a8891bb0d9a03f3b135034", "base64": "of8FDVaCSr81qIkbsNmgPzsTUDQ=" }, "md5": { "hex": "23a22d32868dacc6d66e30705830743a", "base64": "I6ItMoaNrMbWbjBwWDB0Og==" } }, "alnum-lower": { "sha256": { "hex": "9fe44b9fad718c2a70034ccefb3e7ee35315d8de9e97765b021ff0fbb6f37cd2", "base64": "n+RLn61xjCpwA0zO+z5+41MV2N6el3ZbAh/w+7bzfNI=" }, "sha384": { "hex": "656667487c5ce761df8d9516908a23a5535642468ca1ce753dfb7f4ccee8def0c214f06750b0a6069a45ccb4dc7c99e6", "base64": "ZWZnSHxc52HfjZUWkIojpVNWQkaMoc51Pft/TM7o3vDCFPBnULCmBppFzLTcfJnm" }, "sha512": { "hex": "1be4035589b617da60aa55c41aae6f9f66e4fde81a38cb64979ae731470ce7742a2fb09964a5f4c0d5313641069636759777a568c7ae3f06958fb5caaf0ec27d", "base64": "G+QDVYm2F9pgqlXEGq5vn2bk/egaOMtkl5rnMUcM53QqL7CZZKX0wNUxNkEGljZ1l3elaMeuPwaVj7XKrw7CfQ==" }, "sha512-256": { "hex": "0ddcd5843c618dcc32f627e74f08cc868ad0453a544be3b200bbd38c1e145995", "base64": "DdzVhDxhjcwy9ifnTwjMhorQRTpUS+OyALvTjB4UWZU=" }, "sha3-224": { "hex": "2d707c5b10caf5febc2420b5fba6c7acc71265a7b38e46f67a3799ba", "base64": "LXB8WxDK9f68JCC1+6bHrMcSZaezjkb2ejeZug==" }, "sha3-256": { "hex": "caa605fe4320fc8c08350980b9c160df55b73b985c3d762b325169fb081282bb", "base64": "yqYF/kMg/IwINQmAucFg31W3O5hcPXYrMlFp+wgSgrs=" }, "sha3-384": { "hex": "f1f255216b3b749756e01358384f093cb0ee458da97fa9958cf406ab04c0da96106eac9a267ccaba42f5792f8aa1c2d4", "base64": "8fJVIWs7dJdW4BNYOE8JPLDuRY2pf6mVjPQGqwTA2pYQbqyaJnzKukL1eS+KocLU" }, "sha3-512": { "hex": "19081fc6fe76286189e67ac933b74e101eef382d6de2233ae9daa39e3ea417db403b99fab065732de8a1d1b42a988dc082f228787ca96761262d0427f70d4bee", "base64": "GQgfxv52KGGJ5nrJM7dOEB7vOC1t4iM66dqjnj6kF9tAO5n6sGVzLeih0bQqmI3AgvIoeHypZ2EmLQQn9w1L7g==" }, "blake2b512": { "hex": "03f63e57e726edd17f58829bedf170f20c15f0b6c590c0ec419451598f1c28824b5bc9d5f0b45acaa1d31f0e7830717bcfcec8eb8b6b62fb93664b3a99599461", "base64": "A/Y+V+cm7dF/WIKb7fFw8gwV8LbFkMDsQZRRWY8cKIJLW8nV8LRayqHTHw54MHF7z87I64trYvuTZks6mVmUYQ==" }, "blake2s256": { "hex": "e2a2f1f7c9ee9644bcf3dc0f3ffd7391b052407568f3e5e73f29787286d326d0", "base64": "4qLx98nulkS889wPP/1zkbBSQHVo8+XnPyl4cobTJtA=" }, "sha224": { "hex": "4a531e14c40f13bab8f0c5cc844792d1d6f85ac87a97c20494d6abbd", "base64": "SlMeFMQPE7q48MXMhEeS0db4Wsh6l8IElNarvQ==" }, "sha512-224": { "hex": "ed8caed9a5881edef0eb0db3bcc14de5a323ab3fe8adb89a33fdd93a", "base64": "7Yyu2aWIHt7w6w2zvMFN5aMjqz/orbiaM/3ZOg==" }, "ripemd160": { "hex": "446df91b25c73c8fbbb57c2d9ccb1461a834f438", "base64": "RG35GyXHPI+7tXwtnMsUYag09Dg=" }, "sm3": { "hex": "37fdb9098dfcb0e4867e10191097170f87264fddc6a793fdb73f61443b5477c1", "base64": "N/25CY38sOSGfhAZEJcXD4cmT93Gp5P9tz9hRDtUd8E=" }, "sha1": { "hex": "48f8f25eca023489fafd9623a4e5c0f574713d05", "base64": "SPjyXsoCNIn6/ZYjpOXA9XRxPQU=" }, "md5": { "hex": "e2f7c29eeb8cd9d9d6137a150026fca2", "base64": "4vfCnuuM2dnWE3oVACb8og==" } }, "alnum-mixed": { "sha256": { "hex": "72475ba090c29f6a825b18946153a29cc3cef5c83cb92845d8ae32e3bb59407f", "base64": "ckdboJDCn2qCWxiUYVOinMPO9cg8uShF2K4y47tZQH8=" }, "sha384": { "hex": "6efb05a3520d135ba62973474fe6dd769a8181cc230d4a891a6ac74221247370c0486549332bec877a15aa765c30c189", "base64": "bvsFo1INE1umKXNHT+bddpqBgcwjDUqJGmrHQiEkc3DASGVJMyvsh3oVqnZcMMGJ" }, "sha512": { "hex": "b47fbdeb1224766121a9d4271c1bfa3f00b7c12f76e33768cc88092b6e46018bfc74f4f860b952b27621f1e88014795fd3efa94ec5b74f912f6183217bcd9c79", "base64": "tH+96xIkdmEhqdQnHBv6PwC3wS924zdozIgJK25GAYv8dPT4YLlSsnYh8eiAFHlf0++pTsW3T5EvYYMhe82ceQ==" }, "sha512-256": { "hex": "f504e442d228d089bcf0605ac11e573d99d66628cda9ade62fd940ba3fe495b2", "base64": "9QTkQtIo0Im88GBawR5XPZnWZijNqa3mL9lAuj/klbI=" }, "sha3-224": { "hex": "c3f2c4d2e4ab6ae6db9d69c0442899ee6324b52bf0042d64b7b3a245", "base64": "w/LE0uSraubbnWnARCiZ7mMktSvwBC1kt7OiRQ==" }, "sha3-256": { "hex": "bd3656a8faac965a8f3312edeb4dc9f83e0907edef4afdffe09febb95d2b58f3", "base64": "vTZWqPqsllqPMxLt603J+D4JB+3vSv3/4J/ruV0rWPM=" }, "sha3-384": { "hex": "bdd1bbf2dc8b52f1095ba5c3e79791f8a2340ca020f6b822db6d7fc0510e35d8366a2420c3523c2cc2e5bc268baa9d9e", "base64": "vdG78tyLUvEJW6XD55eR+KI0DKAg9rgi221/wFEONdg2aiQgw1I8LMLlvCaLqp2e" }, "sha3-512": { "hex": "02ef84060dc31a0c88695fc9f02eb03d5861472cc346e34c01b3912228a4f693f45b07a54050f36a988badb84e7f10b98ef897685faf3c42ed4aa7a72730dc25", "base64": "Au+EBg3DGgyIaV/J8C6wPVhhRyzDRuNMAbORIiik9pP0WwelQFDzapiLrbhOfxC5jviXaF+vPELtSqenJzDcJQ==" }, "blake2b512": { "hex": "08a1daa4bd695239618d3cae6dc1cd0848eb6c5ada51c73cc6cd345bb959e3abc2fe1afece2dcd96a9c59f77dff8eed4a5f20161993c1c497f4b281407eca103", "base64": "CKHapL1pUjlhjTyubcHNCEjrbFraUcc8xs00W7lZ46vC/hr+zi3NlqnFn3ff+O7UpfIBYZk8HEl/SygUB+yhAw==" }, "blake2s256": { "hex": "90248ee542414417184e2b6e3927c0ff1c359ba5ebbac6dc29e934a0969143c3", "base64": "kCSO5UJBRBcYTituOSfA/xw1m6XrusbcKek0oJaRQ8M=" }, "sha224": { "hex": "4fd4f3caee95a94133487c31fcd860e89d0587cef4356503e1219a9d", "base64": "T9Tzyu6VqUEzSHwx/Nhg6J0Fh870NWUD4SGanQ==" }, "sha512-224": { "hex": "4b96a15de74bf112140f986c4a8d7c39d8f418eece560c86af32d87f", "base64": "S5ahXedL8RIUD5hsSo18Odj0GO7OVgyGrzLYfw==" }, "ripemd160": { "hex": "a765e02906d4823892b020e5a1576ddf4a379927", "base64": "p2XgKQbUgjiSsCDloVdt30o3mSc=" }, "sm3": { "hex": "05bedd150e8889dd79137873f742749aa67801da39c1f245b02271c8c380a22d", "base64": "Bb7dFQ6Iid15E3hz90J0mqZ4Ado5wfJFsCJxyMOAoi0=" }, "sha1": { "hex": "3ed12f67a1b53f414e3a367d5864b5825fb93eaf", "base64": "PtEvZ6G1P0FOOjZ9WGS1gl+5Pq8=" }, "md5": { "hex": "d36ff919102fd77317b793e310f613e7", "base64": "02/5GRAv13MXt5PjEPYT5w==" } }, "alnum-safe-symbols": { "sha256": { "hex": "f2b99ce0b9b78e76db44f411e45b9d771240f1fa5d21aa9730ce14684de3eb20", "base64": "8rmc4Lm3jnbbRPQR5FuddxJA8fpdIaqXMM4UaE3j6yA=" }, "sha384": { "hex": "0cc12d16e26e879f63f8675f1650336c134d26aeb228180c335174faabd5e77f179cd7d75049be0ee3b6a12f34f732c0", "base64": "DMEtFuJuh59j+GdfFlAzbBNNJq6yKBgMM1F0+qvV538XnNfXUEm+DuO2oS809zLA" }, "sha512": { "hex": "8dd023962857cc5c95e505e619884fa7ad857828dc3ec821f75aeb6df1bde2ab0f4ceb3b3aa38f81784ce6960bbde10fa63099414e8ce00b2403913768ce4851", "base64": "jdAjlihXzFyV5QXmGYhPp62FeCjcPsgh91rrbfG94qsPTOs7OqOPgXhM5pYLveEPpjCZQU6M4AskA5E3aM5IUQ==" }, "sha512-256": { "hex": "4bb9b7c751ff16fc19124894423f852e32777b17f0ee2b45e02e65800cd3cf69", "base64": "S7m3x1H/FvwZEkiUQj+FLjJ3exfw7itF4C5lgAzTz2k=" }, "sha3-224": { "hex": "0332f8c89cab0749e0831267bd280221a9143bf9fd738ad35958b193", "base64": "AzL4yJyrB0nggxJnvSgCIakUO/n9c4rTWVixkw==" }, "sha3-256": { "hex": "ce17dd6fff07227eb90c65ef85738d87feedb1f159c28e62adaef5fb7cde878f", "base64": "zhfdb/8HIn65DGXvhXONh/7tsfFZwo5ira71+3zeh48=" }, "sha3-384": { "hex": "333c781bf3720f4b0aa45dcb48c6a3e662795fdc4d483e62a79a523d3fbf7d99f029037cf2c56763c446ac64b3d7fda5", "base64": "Mzx4G/NyD0sKpF3LSMaj5mJ5X9xNSD5ip5pSPT+/fZnwKQN88sVnY8RGrGSz1/2l" }, "sha3-512": { "hex": "9cd73e274a0b5e742b42da6c793fb06dbcbd29048f14ce62535ac6203a310f2952da8d082b4d09450fcf74d0c6cdf2712cb2a232f9f635960d7f8242958a2516", "base64": "nNc+J0oLXnQrQtpseT+wbby9KQSPFM5iU1rGIDoxDylS2o0IK00JRQ/PdNDGzfJxLLKiMvn2NZYNf4JClYolFg==" }, "blake2b512": { "hex": "76c32aef6ee9bec915f78a2c62184f79137085a966d618c7dd0f61b80bab6ad6c070b61badca82a8baa0584b06b3503597649347cfa9467c3cb7ee30fb89db5f", "base64": "dsMq727pvskV94osYhhPeRNwhalm1hjH3Q9huAuratbAcLYbrcqCqLqgWEsGs1A1l2STR8+pRnw8t+4w+4nbXw==" }, "blake2s256": { "hex": "b607298c493c0baf6987a28ec2a08d2b4586b86454054e5152f33b3c25b220b2", "base64": "tgcpjEk8C69ph6KOwqCNK0WGuGRUBU5RUvM7PCWyILI=" }, "sha224": { "hex": "fa58d8760ea45c219bc93c256901628157e8d11a43fa792d0877dd27", "base64": "+ljYdg6kXCGbyTwlaQFigVfo0RpD+nktCHfdJw==" }, "sha512-224": { "hex": "f6e9ffdf128d91c282f3aa9ab8a56911d23c27b1fba3e639bad36831", "base64": "9un/3xKNkcKC86qauKVpEdI8J7H7o+Y5utNoMQ==" }, "ripemd160": { "hex": "c2c66279154a5236084293660ba7750e925efbe0", "base64": "wsZieRVKUjYIQpNmC6d1DpJe++A=" }, "sm3": { "hex": "f1333347e7bcd447cc37347b2ce74966232d44502be12d8efbddb963eea637ca", "base64": "8TMzR+e81EfMNzR7LOdJZiMtRFAr4S2O+925Y+6mN8o=" }, "sha1": { "hex": "7f6982107d254a96d3a08516dd71e9fdb183b951", "base64": "f2mCEH0lSpbToIUW3XHp/bGDuVE=" }, "md5": { "hex": "eb30fb85c4cc1d76bf9336bf4693b6c7", "base64": "6zD7hcTMHXa/kza/RpO2xw==" } }, "alnum-extended-symbols": { "sha256": { "hex": "3235594598e7848de8c0f384c071c2ec32f99d4aefbd365d726c6581f1ae5d29", "base64": "MjVZRZjnhI3owPOEwHHC7DL5nUrvvTZdcmxlgfGuXSk=" }, "sha384": { "hex": "b95f22ab236421cc1e33dfe3782d90d39683d78f4cab704dddc85646a0af3da21f5ae318b89ea9ab51d0cdaa08ee0650", "base64": "uV8iqyNkIcweM9/jeC2Q05aD149Mq3BN3chWRqCvPaIfWuMYuJ6pq1HQzaoI7gZQ" }, "sha512": { "hex": "efa59e89c6db34e8c9a8065bf6ecd9018620631550e1a18bd9aa0ef4cf60ac8e9a565471f56df2cb2fd083c522587ef6b5a09e3b8c536f059a3cfeb2019af94e", "base64": "76WeicbbNOjJqAZb9uzZAYYgYxVQ4aGL2aoO9M9grI6aVlRx9W3yyy/Qg8UiWH72taCeO4xTbwWaPP6yAZr5Tg==" }, "sha512-256": { "hex": "297bd0660f944e17d5b4e60d33de1670d13fd4ef79098aa587ed43ead1169a84", "base64": "KXvQZg+UThfVtOYNM94WcNE/1O95CYqlh+1D6tEWmoQ=" }, "sha3-224": { "hex": "f86a42e4d6db0307b5f3c7cdef49d2682cdff68333fdf8ac09477534", "base64": "+GpC5NbbAwe188fN70nSaCzf9oMz/fisCUd1NA==" }, "sha3-256": { "hex": "4889155321728da58398d9f1158da1bb5b71a151fd4602f2b5c0a5e6617cadd7", "base64": "SIkVUyFyjaWDmNnxFY2hu1txoVH9RgLytcCl5mF8rdc=" }, "sha3-384": { "hex": "d9990b0c785bee2cabf3018495db0486fa9e853066792396e53eb62ff9ae40f75a5a9564fc9fa082243197ebb4238aeb", "base64": "2ZkLDHhb7iyr8wGEldsEhvqehTBmeSOW5T62L/muQPdaWpVk/J+ggiQxl+u0I4rr" }, "sha3-512": { "hex": "2a74e3d423d0715a1620318d5d34b2c53c317db4528d6816069257b3422c0905cdb96b092734c29acdf0f51dac8efdb5cb940a957d30f458db9e811833ff3f62", "base64": "KnTj1CPQcVoWIDGNXTSyxTwxfbRSjWgWBpJXs0IsCQXNuWsJJzTCms3w9R2sjv21y5QKlX0w9FjbnoEYM/8/Yg==" }, "blake2b512": { "hex": "dcd5d37cfe092074c79814dae63f7338107db9a9d31abec6bb0784f8c9111848f0eaeb6b423922a4530d1c8ba1505e559e0d3a149d1c04e22ab119e3dc4d8009", "base64": "3NXTfP4JIHTHmBTa5j9zOBB9uanTGr7GuweE+MkRGEjw6utrQjkipFMNHIuhUF5Vng06FJ0cBOIqsRnj3E2ACQ==" }, "blake2s256": { "hex": "72792761c973442d47d87c875911264da1940ee94b256b4525cd78afd371e069", "base64": "cnknYclzRC1H2HyHWREmTaGUDulLJWtFJc14r9Nx4Gk=" }, "sha224": { "hex": "f277a2a32d0de762d5519dd4a74c1cce0bf01cd1780e1a56723c3563", "base64": "8neioy0N52LVUZ3Up0wczgvwHNF4DhpWcjw1Yw==" }, "sha512-224": { "hex": "3552dd191d61169a5c5882ecd76839bbfc176d4e89dfc6ae644830c4", "base64": "NVLdGR1hFppcWILs12g5u/wXbU6J38auZEgwxA==" }, "ripemd160": { "hex": "c5f66ab600bea48c44c3259c546c911354409768", "base64": "xfZqtgC+pIxEwyWcVGyRE1RAl2g=" }, "sm3": { "hex": "9abb7eb070c03ba9bf9fcb61734d3c44f5592c72774e1da75963640ec7bd6d33", "base64": "mrt+sHDAO6m/n8thc008RPVZLHJ3Th2nWWNkDse9bTM=" }, "sha1": { "hex": "396664e92b3125f927d61a74d4a08f7644f28142", "base64": "OWZk6SsxJfkn1hp01KCPdkTygUI=" }, "md5": { "hex": "3b9887d4a35d3b7db97d415ae10c4ec3", "base64": "O5iH1KNdO325fUFa4QxOww==" } } } };
    TEST_STRINGS = { "_comment": "Canonical, FROZEN QA test strings. Do not change a value once committed \u2014 the baseline.json digests and every downstream comparison depend on these exact bytes. Each `value` is interpreted as UTF-8. Strings 1-3 deliberately share the same letters (lowercase / uppercased / random-case) so case-sensitivity is provable.", "strings": [{ "id": "alpha-lower", "category": "alpha, lowercase only", "value": "rojzqsjncruibzoqhusffjmrsnsrdoqs" }, { "id": "alpha-upper", "category": "alpha, UPPERCASE (= alpha-lower uppercased)", "value": "ROJZQSJNCRUIBZOQHUSFFJMRSNSRDOQS" }, { "id": "alpha-mixed", "category": "alpha, mixed-case (= alpha-lower letters, random case)", "value": "rOJzqSjnCRuIbzoqhuSFFJMRsNSRdoQs" }, { "id": "alnum-lower", "category": "alpha lowercase + numeric", "value": "ujd8y4q5fymiwa9kmwr8iyfh1tyv10yt" }, { "id": "alnum-mixed", "category": "alpha mixed-case + numeric", "value": "aQY9jlIw8CLAuCNToCdc3v8LC0hHk5iX" }, { "id": "alnum-safe-symbols", "category": "alphanumeric + safe symbols (RFC-3986 unreserved: - . _ ~)", "value": "7q0nXc8zzjTXanN8FtLVo_6QJHrIyIc~" }, { "id": "alnum-extended-symbols", "category": "alphanumeric + extended symbols (full ASCII keyboard punctuation)", "value": "+D:L]CnW`|q;D'1J)_]uI78%MhO7;ng(" }] };
  }
});

// qa/qa.mjs
import * as crypto from "crypto";
import { createRequire } from "module";
import * as path from "path";

// qa/vectors.mjs
var KAT = [
  { cryptoName: "sha256", input: "", expected: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
  { cryptoName: "sha256", input: "abc", expected: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad" },
  { cryptoName: "sha224", input: "abc", expected: "23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7" },
  { cryptoName: "sha384", input: "abc", expected: "cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7" },
  { cryptoName: "sha512", input: "abc", expected: "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f" },
  { cryptoName: "sha512-256", input: "abc", expected: "53048e2681941ef99b2e29b76b4c7dabe4c2d0c634fc6d46e0e2f13107e7af23" },
  { cryptoName: "sha512-224", input: "abc", expected: "4634270f707b6a54daae7530460842e20e37ed265ceee9a43e8924aa" },
  { cryptoName: "sha3-224", input: "abc", expected: "e642824c3f8cf24ad09234ee7d3c766fc9a3a5168d0c94ad73b46fdf" },
  { cryptoName: "sha3-256", input: "abc", expected: "3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532" },
  { cryptoName: "sha3-384", input: "abc", expected: "ec01498288516fc926459f58e2c6ad8df9b473cb0fc08c2596da7cf0e49be4b298d88cea927ac7f539f1edf228376d25" },
  { cryptoName: "sha3-512", input: "abc", expected: "b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e10e116e9192af3c91a7ec57647e3934057340b4cf408d5a56592f8274eec53f0" },
  { cryptoName: "blake2b512", input: "abc", expected: "ba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923" },
  { cryptoName: "blake2s256", input: "abc", expected: "508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982" },
  { cryptoName: "ripemd160", input: "abc", expected: "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc" },
  { cryptoName: "ripemd160", input: "", expected: "9c1185a5c5e9fc54612808977ee8f548b2258d31" },
  { cryptoName: "sm3", input: "abc", expected: "66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0" },
  { cryptoName: "sha1", input: "", expected: "da39a3ee5e6b4b0d3255bfef95601890afd80709" },
  { cryptoName: "sha1", input: "abc", expected: "a9993e364706816aba3e25717850c26c9cd0d89d" },
  { cryptoName: "md5", input: "", expected: "d41d8cd98f00b204e9800998ecf8427e" },
  { cryptoName: "md5", input: "abc", expected: "900150983cd24fb0d6963f7d28e17f72" }
];

// qa/corpus.mjs
function makeRng(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var RANDOM_CODEPOINTS = [
  // ASCII printable
  ...range(32, 126),
  // Latin-1 supplement
  ...range(161, 255),
  // a few CJK + emoji + combining marks for multi-byte coverage
  19990,
  30028,
  129408,
  128512,
  769,
  233,
  8364,
  9731
];
function range(lo, hi) {
  const out = [];
  for (let c = lo; c <= hi; c++) out.push(c);
  return out;
}
function randomString(rng, len) {
  let s = "";
  for (let i = 0; i < len; i++) {
    const cp = RANDOM_CODEPOINTS[Math.floor(rng() * RANDOM_CODEPOINTS.length)];
    s += String.fromCodePoint(cp);
  }
  return s;
}
function generateCorpus(seed = 12648430) {
  const rng = makeRng(seed);
  const items = [
    { name: "empty", value: "" },
    { name: "single-char", value: "a" },
    { name: "abc", value: "abc" },
    { name: "ascii-sentence", value: "The quick brown fox jumps over the lazy dog." },
    { name: "unicode", value: "Hello, \u4E16\u754C \u{1F980} \u2014 caf\xE9 \u2014 \u03A9" },
    { name: "whitespace-only", value: "   	 \n  " },
    { name: "multi-line", value: "line one\nline two\r\nline three\n" },
    { name: "control-chars", value: "\0\x07\x1B[31mred\x1B[0m\x7F" },
    { name: "json-ish", value: '{"k":"v\\"x","n":[1,2,3],"u":"\\u00e9"}' },
    { name: "long-100k", value: "A".repeat(100 * 1024) },
    { name: "repeated-unicode", value: "\u4E16\u754C".repeat(4096) }
  ];
  for (let i = 0; i < 24; i++) {
    const len = 1 + Math.floor(rng() * 64);
    items.push({ name: `rand-${i}-len${len}`, value: randomString(rng, len) });
  }
  return items;
}

// qa/qa.mjs
var require2 = createRequire(import.meta.url);
var repoRoot = process.cwd();
var prod;
try {
  prod = require2(path.join(repoRoot, "qa", "algorithms.cjs"));
} catch (e) {
  console.error(
    "FATAL  qa/algorithms.cjs missing \u2014 run `npm run build:test` first.\n" + String(e)
  );
  process.exit(1);
}
var { ALGORITHMS, TRANSCODERS, computeDigest } = prod;
var DATA;
try {
  DATA = await Promise.resolve().then(() => (init_embedded_data(), embedded_data_exports));
} catch {
  console.error(
    "FATAL  No embedded baseline. This harness runs only from the committed QA package via `npm run qa` (which executes qa-dist/qa.pkg.mjs). To rebuild it: edit sources \u2192 `npm run gen:qa` \u2192 review/revalidate \u2192 `npm run qa:promote` \u2192 `git add qa-dist && git commit`."
  );
  process.exit(1);
}
var baseline = DATA.BASELINE;
var canonicalStrings = DATA.TEST_STRINGS.strings;
var QUIET = process.env.QA_QUIET === "1" || process.argv.includes("--quiet");
var FULL = process.env.QA_FULL === "1";
var SEED = process.env.QA_SEED && Number(process.env.QA_SEED) || 24301;
var passCount = 0;
var failCount = 0;
var sectionStats = [];
function fingerprint(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex").slice(0, 8);
}
function reprInput(s) {
  if (s.length <= 60) return JSON.stringify(s);
  return `${JSON.stringify(s.slice(0, 24))}\u2026${JSON.stringify(s.slice(-12))} (len=${s.length}, sha256=${fingerprint(s)})`;
}
function shortVal(v) {
  v = String(v);
  if (v.length <= 96) return v;
  return `${v.slice(0, 72)}\u2026${v.slice(-12)} (len=${v.length})`;
}
function diff(expected, got) {
  let lenNote;
  if (expected.length !== got.length) {
    lenNote = `lengths differ: expected ${expected.length}, got ${got.length}`;
  }
  const n = Math.min(expected.length, got.length);
  let i = 0;
  for (; i < n; i++) if (expected[i] !== got[i]) break;
  if (i === n && !lenNote) return "identical (unexpected)";
  const at = i < n ? i : n;
  const parts = [];
  if (lenNote) parts.push(lenNote);
  if (i < n) {
    const eWin = expected.slice(Math.max(0, at - 8), at + 8);
    const gWin = got.slice(Math.max(0, at - 8), at + 8);
    parts.push(
      `first differs at index ${at}: expected ${JSON.stringify(expected[at])} vs got ${JSON.stringify(got[at])}`
    );
    parts.push(`  expected \u2026${eWin}\u2026`);
    parts.push(`  got      \u2026${gWin}\u2026`);
    parts.push(`           ${" ".repeat(Math.min(8, at) + 1)}^`);
  }
  return parts.join("\n        ");
}
function pass(section, label, expected, got) {
  passCount++;
  if (!QUIET) {
    const tail = expected === void 0 ? "" : `  expected=${shortVal(expected)}  got=${shortVal(got)}`;
    console.log(`PASS  ${section}  ${label}${tail}`);
  }
}
function fail(section, label, expected, got, extra) {
  failCount++;
  console.log(`FAIL  ${section}  ${label}`);
  if (expected !== void 0) {
    console.log(`        expected: ${shortVal(expected)}`);
    console.log(`        got:      ${shortVal(got)}`);
    console.log(`        diff:     ${diff(String(expected), String(got))}`);
  }
  if (extra) console.log(`        note:     ${extra}`);
}
function check(section, label, expected, got, extra) {
  const ok = expected === got;
  if (ok) pass(section, label, expected, got);
  else fail(section, label, expected, got, extra);
  return ok;
}
function expectThrow(section, label, fn) {
  let threw = false;
  let msg = "";
  try {
    fn();
  } catch (e) {
    threw = true;
    msg = e instanceof Error ? e.message : String(e);
  }
  if (threw) {
    passCount++;
    if (!QUIET) console.log(`PASS  ${section}  ${label}  (rejected: ${msg})`);
  } else {
    failCount++;
    console.log(`FAIL  ${section}  ${label}`);
    console.log("        note:     expected the decode to throw, but it did not");
  }
}
function banner(t) {
  console.log(`
=== ${t} ===`);
}
function endSection(name) {
  sectionStats.push({ name, pass: passCount, fail: failCount });
}
function printSummaryAndExit() {
  banner("SUMMARY");
  let lp = 0;
  let lf = 0;
  for (const s of sectionStats) {
    console.log(
      `  ${s.name.padEnd(24)}  ${s.pass - lp} passed, ${s.fail - lf} failed`
    );
    lp = s.pass;
    lf = s.fail;
  }
  console.log(
    `
  TOTAL: ${passCount} passed, ${failCount} failed (seed=0x${SEED.toString(16)}, ${FULL ? "FULL" : "subset"})`
  );
  console.log(
    failCount > 0 ? "\nRESULT: FAIL \u2014 packaging must not proceed." : "\nRESULT: PASS \u2014 safe to package."
  );
  process.exit(failCount > 0 ? 1 : 0);
}
banner("1. Oracle validation (published KAT vectors)");
var availableHashes = new Set(crypto.getHashes());
var abort = false;
for (const v of KAT) {
  const label = `${v.cryptoName}(${JSON.stringify(v.input)})`;
  if (!availableHashes.has(v.cryptoName)) {
    fail("kat", label, v.expected, "<algorithm unavailable in this Node build>");
    abort = true;
    continue;
  }
  const oracle = crypto.createHash(v.cryptoName).update(v.input, "utf8").digest("hex");
  if (!check("kat", label, v.expected, oracle)) abort = true;
}
endSection("oracle/KAT");
if (abort) {
  console.log(
    "\nFATAL  The oracle (Node crypto) does not reproduce the published vectors. Refusing to validate against an untrustworthy oracle."
  );
  printSummaryAndExit();
}
banner("2. Baseline integrity (qa/baseline.json vs oracle + canonical strings)");
{
  const a = JSON.stringify(canonicalStrings);
  const b = JSON.stringify(baseline.strings);
  if (!check(
    "baseline",
    "strings == test-strings.json",
    a,
    b,
    "baseline is stale vs canonical strings \u2014 run `npm run gen:baseline`"
  )) {
    abort = true;
  }
}
{
  const reg = ALGORITHMS.map((a) => a.cryptoName).sort().join(",");
  const base = baseline.algorithms.map((a) => a.cryptoName).sort().join(",");
  if (!check(
    "baseline",
    "algorithms == production registry",
    reg,
    base,
    "extension algorithm set changed \u2014 regenerate the baseline"
  )) {
    abort = true;
  }
}
for (const s of baseline.strings) {
  for (const algo of baseline.algorithms) {
    const cell = baseline.hashes[s.id]?.[algo.cryptoName];
    if (!cell) {
      fail("baseline", `${s.id}/${algo.cryptoName} present`, "<hex+base64>", "<missing>");
      abort = true;
      continue;
    }
    const raw = crypto.createHash(algo.cryptoName).update(s.value, "utf8").digest();
    if (!check(
      "baseline",
      `${s.id} ${algo.label} hex (oracle)`,
      raw.toString("hex"),
      cell.hex,
      "baseline hex differs from oracle \u2014 tampered or env drift"
    )) abort = true;
    if (!check(
      "baseline",
      `${s.id} ${algo.label} b64 (oracle)`,
      raw.toString("base64"),
      cell.base64,
      "baseline base64 differs from oracle \u2014 tampered or env drift"
    )) abort = true;
  }
}
endSection("baseline integrity");
if (abort) {
  console.log(
    "\nFATAL  Baseline failed integrity. The frozen dataset is not trustworthy in this environment; aborting before testing the extension. Investigate, then `npm run gen:baseline` and review."
  );
  printSummaryAndExit();
}
banner("3. Extension production output vs frozen baseline");
for (const s of baseline.strings) {
  for (const algo of baseline.algorithms) {
    const cell = baseline.hashes[s.id][algo.cryptoName];
    const inputRepr = `${s.id} (${reprInput(s.value)})`;
    check(
      "hash",
      `${algo.label} hex   ${inputRepr}`,
      cell.hex,
      computeDigest(algo.cryptoName, s.value, "hex", false)
    );
    check(
      "hash",
      `${algo.label} b64   ${inputRepr}`,
      cell.base64,
      computeDigest(algo.cryptoName, s.value, "base64", false)
    );
  }
}
var spotAlgos = ["sha256", "sha3-512", "blake2b512", "md5"];
for (const s of baseline.strings.slice(0, 3)) {
  for (const name of spotAlgos) {
    const raw = crypto.createHash(name).update(s.value, "utf8").digest();
    check(
      "hash",
      `${name} base64url  ${s.id}`,
      raw.toString("base64url"),
      computeDigest(name, s.value, "base64url", false)
    );
    check(
      "hash",
      `${name} HEX-upper  ${s.id}`,
      raw.toString("hex").toUpperCase(),
      computeDigest(name, s.value, "hex", true)
    );
  }
}
endSection("extension vs baseline");
banner(
  `4. Transcoders (${FULL ? "FULL corpus" : "random subset"}, seed=0x${SEED.toString(16)})`
);
var pairs = /* @__PURE__ */ new Map();
for (const t of TRANSCODERS) {
  const p = pairs.get(t.label) || { label: t.label };
  p[t.direction] = t;
  pairs.set(t.label, p);
}
var encodeOracle = {
  Base64: (s) => Buffer.from(s, "utf8").toString("base64"),
  Base64URL: (s) => Buffer.from(s, "utf8").toString("base64url"),
  "URL (percent)": (s) => encodeURIComponent(s),
  Hex: (s) => Buffer.from(s, "utf8").toString("hex"),
  "HTML Entities": (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])
};
var corpus = generateCorpus();
var hashPayloads = baseline.strings.slice(0, 4).map((s) => baseline.hashes[s.id].sha256.hex);
var fuzzPool = [...corpus.map((c) => c.value), ...hashPayloads];
var fuzz;
if (FULL) {
  fuzz = fuzzPool;
} else {
  const rng = makeRng(SEED);
  const picked = /* @__PURE__ */ new Set();
  const want = Math.min(10, fuzzPool.length);
  while (picked.size < want) picked.add(Math.floor(rng() * fuzzPool.length));
  fuzz = [...picked].map((i) => fuzzPool[i]);
}
var payloads = [...baseline.strings.map((s) => s.value), ...fuzz];
for (const [label, pair] of pairs) {
  const oracle = encodeOracle[label];
  for (const payload of payloads) {
    const enc = pair.encode.run(payload);
    check(
      "transcode",
      `${label} encode  input=${reprInput(payload)}`,
      oracle(payload),
      enc
    );
    let rt;
    try {
      rt = pair.decode.run(enc);
    } catch (e) {
      fail(
        "transcode",
        `${label} roundtrip  input=${reprInput(payload)}`,
        payload,
        `<decode threw: ${e instanceof Error ? e.message : e}>`
      );
      continue;
    }
    check("transcode", `${label} roundtrip  input=${reprInput(payload)}`, payload, rt);
  }
}
banner("5. Decoder rejects malformed input");
for (const [label, bad] of [
  ["Base64", "@@@@@"],
  ["Base64URL", "@@@@@"],
  ["Hex", "zzzz"],
  ["Hex", "abc"],
  ["URL (percent)", "%"],
  ["URL (percent)", "%zz"]
]) {
  const dec = pairs.get(label).decode;
  expectThrow(
    "transcode",
    `${label} decode rejects ${JSON.stringify(bad)}`,
    () => dec.run(bad)
  );
}
check(
  "transcode",
  "HTML Entities decode plain+entity text",
  `plain & <b>bold</b> "q" 'a'`,
  pairs.get("HTML Entities").decode.run("plain &amp; &lt;b&gt;bold&lt;/b&gt; &quot;q&quot; &#39;a&#39;")
);
endSection("transcoders");
printSummaryAndExit();
