# Email export

Use `exportEmail` to turn saved editor HTML into a separate email document and plain-text
alternative. The normal form value, viewer and HTML pipe target websites. Email export
does not change saved editor content.

## Export an email

```typescript
import { exportEmail } from 'ngx-editra';

const email = exportEmail(savedHtml, {
	title: 'Your project update',
	preheader: 'The latest news from our team',
	width: 600,
	language: 'en',
});

// Pass these bodies to your own backend or email provider.
const message = { html: email.html, text: email.text };
console.log(email.warnings);
```

`html` is a complete document with inline styles, presentation tables, a fluid container
and an Outlook conditional width fallback. `text` includes link/image URLs. Supply both
using your provider's multipart message API. The library does not send email or supply
SMTP credentials, recipients, subjects, unsubscribe links, tracking or deliverability.
`title` is HTML metadata, not the Subject header.

On the sending backend, validate/authorize the saved document and export with the
same policies again. Do not trust arbitrary HTML submitted by a browser as a ready-to-send body.

Pass an optional third `EditraConfig` argument for input policies and extension parsing:

```typescript
const email = exportEmail(savedHtml, { width: 640 }, editorConfig);
```

Width defaults to 600; integer widths 360–800 are accepted. Language defaults to `en`.
Title and preheader are escaped. The function works without browser DOM globals and
makes no network requests. It does not run extension lifecycle hooks or custom serializers.

## Content behavior

| Content                              | Email behavior                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| Headings, paragraphs and text marks  | Static HTML with inline typography                                                 |
| Links, colours, highlights and sizes | Validated URLs/values with inline styles                                           |
| Fonts                                | Common email fonts preserved; others fall back to Arial                            |
| Lists                                | Semantic lists with ordered starting numbers                                       |
| Tables                               | Static tables with merged cells, borders and cell backgrounds                      |
| Table sizing                         | Container-constrained width; custom cell widths normalized and row heights omitted |
| Images                               | Allowed external URLs, alt text, captions and bounded dimensions; wrapping removed |
| Columns                              | Stacked in reading order using presentation-table rows                             |
| Video/iframe embeds                  | Safe text links instead of embedded playback                                       |
| Code                                 | Escaped static text without copy buttons or highlighting                           |
| Quotes and lines                     | Simplified static email presentation                                               |
| Custom nodes/marks                   | Supported children/text retained where possible; unsupported presentation omitted  |

Use publicly accessible HTTPS PNG/JPEG/GIF images. Recipients can block remote images;
SVG support varies. The current URL policy does not support relative URLs, data URLs
or `cid:` attachments. Invalid sources can be removed during input validation. Do not
convey essential information only through images.

## Warnings and validation

Warnings are deduplicated `{ code, message }` entries: `columns-stacked`, `video-link`,
`remote-images`, `svg-image`, `image-wrap`, `font-fallback`, `table-widths`, `row-heights`,
`code-wrapping`, `large-html`, and unsupported node/mark codes. HTML over 100 KB gets
an early clipping warning; smaller messages are not guaranteed to avoid clipping.

Input is rebuilt through schema and URL policies. Warnings describe email conversions,
not every element discarded during parsing. Custom importers remain trusted code. The
exporter does not copy arbitrary CSS or custom serializers. An empty warning list is
not a security audit or an email-client compatibility certificate.

## Preview and client testing

Open **Email export** in the playground to copy HTML/text, inspect warnings and use the
sandboxed browser preview. The preview accepts only freshly exported HTML and blocks
scripts, forms, same-origin access and top navigation. Opening it can load referenced
external images. It does not emulate an email client.

The exporter targets a conservative baseline for Gmail, Outlook and Apple Mail. Automated
checks cover structure, escaping, URL policies, conversions, limits, browser preview and
SSR execution. Real inbox rendering still needs these checks before production:

1. Send generated HTML and text through the actual delivery provider.
2. Check Gmail web/mobile, classic Outlook for Windows, new Outlook/web, and Apple Mail
   on macOS/iOS. Outlook variants use different rendering engines.
3. Test narrow screens, light/dark modes, blocked images, long links/code and merged tables.
4. Review reading order, alt text, link destinations, plain-text readability and message size.
5. Record client/version, date and screenshots; repeat after template/provider changes.

Clients can rewrite colours, fonts, spacing and links. Pixel-identical output and verified
inbox compatibility are not claimed. Actual account/device tests remain outstanding.

References: [Gmail CSS support](https://developers.google.com/workspace/gmail/design/css),
[HTML email limitations](https://mailchimp.com/help/limitations-of-html-email/), and
[email development practices](https://templates.mailchimp.com/getting-started/html-email-basics/).
