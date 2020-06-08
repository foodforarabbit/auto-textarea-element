describe('auto-textarea-element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('auto-textarea')
      assert.equal('AUTO-TEXTAREA', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.AutoTextareaElement()
      assert.equal('AUTO-TEXTAREA', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    let autoTextarea
    let textarea

    beforeEach(function () {
      const container = document.createElement('div')
      container.innerHTML = `
        <auto-textarea id="test-id" class="test-class">
          text
        </auto-textarea>
      `
      document.body.append(container)

      autoTextarea = document.querySelector('auto-textarea')
      textarea = autoTextarea.querySelector('textarea')
    })

    afterEach(function () {
      document.body.innerHTML = ''
    })

    it('passes all attributes from itself', function () {
      assert.equal(autoTextarea.getAttribute('id'), null)
      assert.equal(autoTextarea.getAttribute('class'), null)
      assert.equal(textarea.getAttribute('id'), 'test-id')
      assert.equal(textarea.getAttribute('class'), 'test-class')
      assert.ok(textarea.textContent, 'textContent should be preserved')
    })

    it('autosizes', function () {
      const initialHeight = textarea.scrollHeight
      textarea.textContent = 'a\nb\nc\nd\ne\nf\ng\nh\n'
      const updatedHeight = textarea.scrollHeight
      assert.notEqual(initialHeight, updatedHeight)
      assert.ok(updatedHeight > initialHeight, 'updated height should be greater than initial height')
    })
  })
})
