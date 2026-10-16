/** Complete sample shared by the editable document and saved-HTML preview. */
export const demoContent = `<h1>A calmer place to write</h1>
<p>A complete <strong>ngx-editra</strong> sample document. Edit any section, then compare it with the rendered HTML below. Use <strong>Reset form</strong> to restore this example.</p>

<h2>1. Text formatting</h2>
<p>Try <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <strong><em>combined formatting</em></strong>. Write formulas such as H<sub>2</sub>O and x<sup>2</sup>, or add a code block from the toolbar.</p>
<p><span style="color:#1763d1">Blue text</span>, <span style="color:#b42318">red text</span>, <span style="background-color:#fff2a8">highlighted words</span>, and <span style="font-family:Georgia;font-size:24px">a larger Georgia font</span> can all appear together.</p>
<p>Visit <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer">Angular documentation</a> or <a href="mailto:hello@example.com">email the fictional team</a>.</p>
<p>This line has a hard break.<br>The next line stays in the same paragraph.</p>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>

<h2>2. Alignment, indentation and spacing</h2>
<p style="text-align:left">Left aligned: project notes and everyday writing.</p>
<p style="text-align:center">Centre aligned: a short announcement.</p>
<p style="text-align:right">Right aligned: prepared by the Editra demo team.</p>
<p style="text-align:justify;line-height:2">Justified text with double line spacing. This longer paragraph shows how alignment and line height affect the rhythm of a document. Resize the page to compare its appearance in the editor and in the saved HTML preview.</p>
<p style="margin-left:24px">One level of indentation.</p>
<p style="margin-left:48px">Two levels of indentation.</p>

<h2>3. Lists and quotations</h2>
<ul>
  <li><p>Plan the next release.</p><ul><li><p>Gather customer feedback.</p></li><li><p>Review accessibility and mobile layouts.</p></li></ul></li>
  <li><p>Write the implementation notes.</p></li>
  <li><p>Share the completed document.</p></li>
</ul>
<ol>
  <li><p>Create a draft.</p></li>
  <li><p>Add tables, media and code examples.</p></li>
  <li><p>Save the HTML and render it below.</p></li>
</ol>
<p>An ordered list can also start at a custom number:</p>
<ol start="4"><li><p>Review the published result.</p></li><li><p>Collect feedback for the next revision.</p></li></ol>
<blockquote><p>Good tools make room for clear thinking.</p><p>A quotation can contain <strong>formatting</strong> and multiple paragraphs.</p></blockquote>

<h2>4. Tables</h2>
<p>A project tracker with a shaded header, merged cells, custom column widths and a coloured status cell:</p>
<table style="width:100%;border:1px solid #b8c2d0">
  <tbody>
    <tr><th colspan="3" style="background-color:#dce9ff"><p>Fictional release plan</p></th></tr>
    <tr><th data-colwidth="240" style="background-color:#e9edf3"><p>Feature</p></th><th data-colwidth="160" style="background-color:#e9edf3"><p>Owner</p></th><th data-colwidth="180" style="background-color:#e9edf3"><p>Status</p></th></tr>
    <tr><td rowspan="2" data-colwidth="240"><p>Content rendering</p></td><td data-colwidth="160"><p>Alex</p></td><td data-colwidth="180" style="background-color:#dcfce7"><p><strong>Complete</strong></p></td></tr>
    <tr><td data-colwidth="160"><p>Sam</p></td><td data-colwidth="180" style="background-color:#fff2a8"><p>In review</p></td></tr>
    <tr><td data-colwidth="240"><p>Documentation</p><p><em>Includes examples</em></p></td><td data-colwidth="160"><p>Jordan</p></td><td data-colwidth="180"><p>Planned</p></td></tr>
  </tbody>
</table>
<p>A narrower table with a different border style:</p>
<table style="width:75%;border:2px dashed #b8c2d0"><tbody><tr><th><p>Metric</p></th><th><p>Sample value</p></th></tr><tr><td><p>Documents</p></td><td><p>128</p></td></tr><tr><td><p>Contributors</p></td><td><p>12</p></td></tr></tbody></table>

<h2>5. Images and captions</h2>
<p>A centred image with fixed dimensions, rounded corners and a caption. Select it to try resizing or changing its appearance.</p>
<figure data-editra-image="" data-aspect="true" style="text-align:center;margin-top:16px;margin-bottom:16px">
  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&amp;fit=crop&amp;w=960&amp;q=80" alt="Sunlight filtering through a green forest" width="640" height="360" style="border-radius:12px;border:1px solid #b8c2d0">
  <figcaption>A forest scene used as sample content. Image loaded from Unsplash.</figcaption>
</figure>
<p>The same image can fill the content width:</p>
<figure data-editra-image="" data-full-width="true" data-aspect="true" style="text-align:center">
  <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&amp;fit=crop&amp;w=960&amp;q=80" alt="A wide view of the sunlit forest" width="640" height="360" style="border-radius:8px">
  <figcaption>Responsive, full-width image with a caption.</figcaption>
</figure>

<h2>6. Video</h2>
<p>A direct MP4 video with native playback controls and a caption. Playback requires a network connection.</p>
<figure data-editra-video="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" data-aspect="true" style="text-align:center">
  <video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" width="640" height="360" controls></video>
  <figcaption>A short flower video from the MDN interactive examples.</figcaption>
</figure>
<p>The video dialog also accepts supported YouTube and Vimeo links.</p>

<h2>7. Code blocks</h2>
<p>Code blocks preserve indentation, blank lines and special characters. Use the language selector and copy control in the editor.</p>
<h3>TypeScript</h3>
<pre data-language="typescript"><code>interface Project {
  title: string;
  complete: boolean;
}

const project: Project = {
  title: 'Editra demo',
  complete: true,
};

console.log(project.title);</code></pre>
<h3>HTML / Angular template</h3>
<pre data-language="html"><code>&lt;div
  class="editra-content"
  editraCodeCopy
  [innerHTML]="savedHtml | editraHtml: config"
&gt;&lt;/div&gt;</code></pre>
<h3>Java</h3>
<pre data-language="java"><code>public class Welcome {
    public static void main(String[] args) {
        System.out.println("Hello from Editra!");
    }
}</code></pre>
<h3>Plain text</h3>
<pre><code>release-notes/
  draft.md
  screenshots/
  checklist.txt</code></pre>

<h2>8. Two-column layout</h2>
<p>Each column can hold its own headings, paragraphs, lists and other blocks. The columns stack on narrow screens.</p>
<div data-editra-columns="true">
  <div data-editra-column="true" data-column-weight="40">
    <h3>At a glance</h3>
    <p><strong>Project:</strong> Editra sample</p>
    <p><strong>Stage:</strong> Ready for review</p>
    <ul><li><p>Responsive layout</p></li><li><p>Saved HTML preview</p></li></ul>
  </div>
  <div data-editra-column="true" data-column-weight="60">
    <h3>Release notes</h3>
    <p>This wider column gives the main story more room. Drag the column divider in the editor to change the proportions.</p>
    <blockquote><p>Keep the message clear and the layout useful.</p></blockquote>
  </div>
</div>

<h2>9. Dividers</h2>
<p>Solid</p><hr data-line-style="solid" data-line-weight="1">
<p>Dashed</p><hr data-line-style="dashed" data-line-weight="2">
<p>Dotted</p><hr data-line-style="dotted" data-line-weight="2">
<p>Double</p><hr data-line-style="double" data-line-weight="3">
<h2>Try the editor</h2>
<p>Select text to change its case, colour, font or alignment. Try find and replace, undo and redo, theme switching, read-only mode and fullscreen. The rendered document below follows your edits.</p>`;
