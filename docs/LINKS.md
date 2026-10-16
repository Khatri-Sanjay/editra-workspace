# Links

Links let readers open a web page or an email address. The editor validates URLs before adding them to the document.

## Insert or edit a link

1. Select the text that should become a link.
2. Open the link tool and enter an absolute HTTPS URL, such as https://example.com/help.
3. Apply the dialog. To change an existing link, select its text and reopen the tool.

Email links can use mailto, such as mailto:help@example.com. Automatic link handling also recognizes supported web URLs while editing. New-tab links use noopener/noreferrer.

## URL rules

HTTPS is the default. Relative URLs, credentials in URLs, control characters, and javascript/data/file URLs are rejected. HTTP requires an explicit security configuration; only enable it for a deliberate application requirement.

```typescript
import type { EditraConfig } from 'ngx-editra';

export const config: EditraConfig = {
	security: { allowHttp: false },
};
```

A link target being valid does not mean its content is safe or available. Validate saved content on your server and apply your own authorization and URL policy. See [security](SECURITY.md).
