# Videos

Insert a supported video URL rather than pasting iframe markup. The editor creates a constrained embed or direct video element and saves the original URL with the document.

## Insert a video

1. Place the caret and open the video tool.
2. Paste a supported public YouTube, Vimeo, or direct MP4 URL.
3. Apply, then select the video to edit its layout, caption, or dimensions.
4. Use the resize handle or full-content-width setting and save the normal HTML form value.

If playback fails, check the host's permissions and your application's CSP. Private/protected media, blocked providers, and arbitrary embed HTML are not made accessible by the editor. See [troubleshooting](TROUBLESHOOTING.md).

## Providers and sizing

Supported public URLs: YouTube watch/shortened/Shorts URLs with valid video IDs, numeric Vimeo
URLs and direct MP4 paths. Other providers require explicit registration. Original URL is persisted
alongside canonical provider-generated embedding. Unsupported providers/paths produce dialog errors.

The video dialog edits URL, dimensions, alignment, caption, aspect ratio and direct playback controls.
Width and height start blank (Auto). Direct video uses its intrinsic size once metadata loads;
provider embeds use a responsive preview up to 640 px wide with a 16:9 default ratio.
These preview defaults are not written as fixed document dimensions. Full content width
fills the content area responsively. Left/centre/right alignment positions custom or automatic sizes.
`videoExtension()` supplies pointer/keyboard resizing. Responsive CSS constrains width to the editor.
The corner handle follows the video and resizes from its displayed dimensions. Maintain aspect
ratio preserves proportions; disabling it allows independent width/height changes. A drag commits
one undoable transaction; Escape cancels. Resizing full-width video switches to a saved custom size.
Embeds load lazily; direct video uses metadata preload. Successful embedding/playback is not
guaranteed by syntactic URL validity. There is no upload or automatic autoplay.

```typescript
import type { EditraVideoProvider } from 'ngx-editra';
export const provider: EditraVideoProvider = {
	id: 'example',
	embedOrigins: ['https://media.example.com'],
	matches: (url) => url.hostname === 'media.example.com' && /^\/watch\/\d+$/.test(url.pathname),
	getEmbedUrl: (url) =>
		new URL(url.pathname.replace('/watch/', '/embed/'), 'https://media.example.com'),
};
// Register with config.video.providers = [provider].
```

Provider code is trusted and must follow exact-host/path restrictions. See SECURITY.md for CSP.
