# Content policy and security

All HTML is parsed with parse5 and reconstructed as supported schema nodes/marks.
Executable/foreign subtrees are dropped, unknown wrappers are unwrapped, and only explicit
attributes survive. Output text and attributes are escaped. HTML sanitization is not regex-based.
Regexes are used only for constrained scalar validation, URL recognition and literal search.

EditraHtmlPipe passes only the output of staticPreview's schema-based parsing and serialization
to Angular's bypassSecurityTrustHtml API. This preserves validated formatting and approved media
when rendering content. It does not make arbitrary HTML trustworthy. Keep this trust operation
centralized in the pipe and never pass raw input directly to it. Custom extension schemas and
serializers are trusted application code and can affect this guarantee.

URLs require absolute HTTPS by default. HTTP is explicitly opt-in. Credentials, control/space
characters, javascript/data/file URLs and unsupported providers are rejected. Links also
permit mailto. New-tab links have noopener/noreferrer. CSS values are bounded numbers,
enumerated alignments/borders, approved fonts, and hex/RGB colours; arbitrary CSS is dropped.

YouTube/Vimeo match exact hostnames and paths and create canonical HTTPS iframe URLs.
Custom providers must declare exact allowed embed origins. Iframes use a restricted sandbox,
lazy loading, referrer policy and fullscreen/picture-in-picture permissions. No autoplay permission
is granted. Providers are trusted application code, not user-controlled configuration.

Suggested CSP policy additions for enabled features:

```text
frame-src https://www.youtube-nocookie.com https://player.vimeo.com;
img-src 'self' https:;
media-src 'self' https:;
style-src-attr 'unsafe-inline';
```

Prefer narrower image/media origins for your application. Angular/application script and style
policies need their normal nonce/hash configuration. Generated content uses bounded inline style
attributes, so style-src-attr must permit them; this does not require unsafe-inline scripts.
Applications prohibiting style attributes need a class-based renderer to preserve all formatting.
Never permit arbitrary frame origins.
Third-party providers may have additional requirements and may block playback or embedding.

Client sanitization is not a replacement for server validation, authorization or safe redisplay.
Revalidate stored HTML/JSON on the server with the same content policy. Limits are one million
input characters and 100 nesting levels. Extension serializers/plugins are trusted application
code and need an independent audit; they must not emit unsafe tags/URLs or perform uploads.

See [Angular security guidance](https://angular.dev/best-practices/security) and
[CSP style attribute behavior](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr).
