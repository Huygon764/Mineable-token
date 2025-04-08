// Copyright (c) 2017 The Bitcoin developers

#ifndef BITCOIN_CONFIG_BITCOIN_CONFIG_H
#define BITCOIN_CONFIG_BITCOIN_CONFIG_H

#define PACKAGE_NAME ""

#define COPYRIGHT_YEAR ""
#define COPYRIGHT_HOLDERS ""
#define COPYRIGHT_HOLDERS_SUBSTITUTION ""
#define COPYRIGHT_HOLDERS_FINAL ""

#define HAVE_ENDIAN_H 1
/* #undef HAVE_SYS_ENDIAN_H */

#define HAVE_DECL_HTOLE16 1
#define HAVE_DECL_HTOBE16 1
#define HAVE_DECL_BE16TOH 1
#define HAVE_DECL_LE16TOH 1
#define HAVE_DECL_HTOBE32 1
#define HAVE_DECL_HTOLE32 1
#define HAVE_DECL_BE32TOH 1
#define HAVE_DECL_LE32TOH 1
#define HAVE_DECL_HTOBE64 1
#define HAVE_DECL_HTOLE64 1
#define HAVE_DECL_BE64TOH 1
#define HAVE_DECL_LE64TOH 1

#define HAVE_BYTESWAP_H 1

#define HAVE_DECL_BSWAP_16 1
#define HAVE_DECL_BSWAP_32 1
#define HAVE_DECL_BSWAP_64 1

#define HAVE_SYS_SELECT_H 1
#define HAVE_SYS_PRCTL_H 1

#define HAVE_DECL___BUILTIN_CLZ 1
#define HAVE_DECL___BUILTIN_CLZL 1
#define HAVE_DECL___BUILTIN_CLZLL 1
#define HAVE_DECL___BUILTIN_POPCOUNT 1

#define HAVE_MALLOPT_ARENA_MAX 1
#define HAVE_MALLOC_INFO 1

#define HAVE_DECL_STRNLEN 1
#define HAVE_DECL_DAEMON 1
#define HAVE_DECL_GETIFADDRS 1
#define HAVE_DECL_FREEIFADDRS 1
#define HAVE_GETENTROPY 1
#define HAVE_GETENTROPY_RAND 1
#define HAVE_SYS_GETRANDOM 1
/* #undef HAVE_SYSCTL_ARND */

/* #undef CHAR_EQUALS_INT8 */
#define HAVE_LARGE_FILE_SUPPORT 1

#define HAVE_FUNC_ATTRIBUTE_VISIBILITY 1
/* #undef HAVE_FUNC_ATTRIBUTE_DLLEXPORT */

/* #undef HAVE_DECL_EVP_MD_CTX_NEW */

#define FDELT_TYPE long int

/* #undef ENABLE_BIP70 */
/* #undef ENABLE_WALLET */
/* #undef ENABLE_ZMQ */

/* Define if QR support should be compiled in */
/* #undef USE_QRCODE */

/* UPnP support not compiled if undefined */
/* #undef ENABLE_UPNP */
#ifdef ENABLE_UPNP
/* Value (0 or 1) determines the UPnP default state at startup. */
#define USE_UPNP 0
#endif

/* Define if QtDBus support should be enabled */
/* #undef USE_DBUS */

#endif // BITCOIN_BITCOIN_CONFIG_H
