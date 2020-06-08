# &lt;auto-textarea&gt; element

A web-component textarea that only resizes itself

## Installation

```
$ npm install --save auto-textarea-element
```

## Usage

### Script

Import as ES modules:

```js
import 'auto-textarea-element'
```

Include with a script tag:

```html
<script type="module" src="./node_modules/auto-textarea-element/dist/index.js">
```

### Markup

```html
<auto-textarea id="id" class="class" name="name" maxlength="50">prefilled text</auto-textarea>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements
