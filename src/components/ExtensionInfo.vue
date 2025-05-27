<script setup lang="ts"></script>
<template>
  <strong id="prerequisites">Prerequisites</strong>
  <ul>
    <li><strong>Url Toolbox</strong> must be running at <code>http://localhost:5173</code></li>
  </ul>
  <hr />
  <h4 id="chrome-brave">Chrome / Brave</h4>
  <h5 id="installation-steps">Installation Steps</h5>
  <ol>
    <li>
      <a href="https://github.com/Insanityandme/url-toolbox/releases"
        >Download the latest <code>chrome-extension.zip</code></a
      >
      from the GitHub releases page.
    </li>
    <li>Unzip the file to a folder on your computer.</li>
    <li>
      <p>Open your browser’s extensions page:</p>
      <ul>
        <li><code>chrome://extensions/</code> (for Chrome)</li>
        <li><code>brave://extensions/</code> (for Brave)</li>
      </ul>
    </li>
    <li>
      <p>Enable <strong>Developer mode</strong> (toggle in the top-right).</p>
    </li>
    <li>Click <strong>&quot;Load unpacked&quot;</strong> and select the unzipped folder.</li>
    <li>
      Go to <code>http://localhost:5173</code> and refresh the page to activate the extension.
    </li>
  </ol>
  <hr />
  <h4 id="firefox">Firefox</h4>
  <h5 id="installation-steps">Installation Steps</h5>
  <ol>
    <li>
      <a href="https://github.com/Insanityandme/url-toolbox/releases"
        >Download the latest <code>firefox-extension.zip</code></a
      >
      from the GitHub releases page.
    </li>
    <li>Unzip the file to a folder on your computer.</li>
    <li>Open <code>about:debugging#/runtime/this-firefox</code> in Firefox.</li>
    <li>Click <strong>&quot;Load Temporary Add-on&quot;</strong>.</li>
    <li>Select the <code>manifest.json</code> file from inside the unzipped folder.</li>
    <li>
      Go to <code>http://localhost:5173</code> and refresh the page to activate the extension.
    </li>
  </ol>
  <blockquote>
    <p>
      Note: This install is temporary because the extension isn’t signed by Firefox Add-ons (AMO).
      Firefox removes unsigned extensions when the browser closes.
    </p>
  </blockquote>
</template>

<style scoped>
#prerequisites {
  margin-top: 1rem;
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
