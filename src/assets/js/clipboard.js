// import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess () {
  alert("复制成功!");
}

function clipboardError () {
  alert("失败！！！");
}

export function handleClipboard (text, event, onSuccess, onError) {
  event = event || {}
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    onSuccess ? onSuccess() : clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    onError ? onError() : clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
