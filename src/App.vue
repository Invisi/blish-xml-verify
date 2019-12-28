<template>
  <div id="app">
    <textarea :value="input" @input="update"></textarea>
    <textarea v-html="xml"></textarea>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import parser from 'fast-xml-parser'
import xmllint from 'xmllint'

import schema from '@/assets/schema.xsd'
import example from '@/assets/example.xml'

// TODO: https://www.npmjs.com/package/xml-formatter

const parserConfig = {
  attributeNamePrefix: '',
  attrNodeName: '@',
  ignoreAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  decodeHTMLchar: false,
  format: true,
  indentBy: '  ',
  supressEmptyNode: false
}

export default {
  name: 'app',
  components: {},
  data: () => ({
    input: example
  }),
  computed: {
    xml() {
      let lintData = {
        xml: this.input,
        schema: schema,
        arguments: ['--schema', 'file.xsd', 'file.xml']
      }

      let linter = xmllint.validateXML(lintData)

      if (linter.errors) {
        return linter.errors
      }
      return parser.parse(this.input, parserConfig)
    }
  },
  methods: {
    update: debounce(function(e) {
      this.input = e.target.value
    }, 300),
    htmlEncode: function(val) {
      return val.replace('<', '&lt;').replace('>', '&gt;')
    }
  }
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 99.9%; /* Let's cheat a bit */
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea,
#app div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
