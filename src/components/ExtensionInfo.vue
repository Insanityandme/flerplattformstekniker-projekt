<script setup lang="ts"></script>
<template>
  <p>
    A Chrome extension available for Url Toolbox, providing quick access to the URL Shortener
    directly from your browser toolbar.
  </p>
  <div class="ext-container">
    <img class="ext-img" alt="Chrome Extension" src="../../assets/extension.png" />
    <ol>
      <li>
        <a href="https://github.com/Insanityandme/url-toolbox/releases"
          >Download the latest <code>chrome-extension.crx</code></a
        >
        from the GitHub releases page.
      </li>
      <li>
        Open your browser’s extensions page:
        <ul>
          <li><code>chrome://extensions/</code> (for Chrome)</li>
          <li><code>brave://extensions/</code> (for Brave)</li>
        </ul>
      </li>
      <li>Enable <strong>Developer mode</strong> (top right).</li>
      <li>Drag and drop the <code>.crx</code> file onto the page.</li>
      <li>Click <strong>“Add Extension”</strong> when prompted.</li>
    </ol>
  </div>
</template>

<style scoped>
.ext-container {
  width: 100%;
  margin-top: 2rem;
  display: flex;
}

.ext-img {
  max-width: 100%;
  height: auto;
}
@media (max-width: 880px) {
  .ext-container {
    flex-direction: column;
    align-items: center;
  }
  .ext-img {
    margin-bottom: 2rem;
  }
}
</style>
