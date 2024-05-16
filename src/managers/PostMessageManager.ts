class PostMessageManager {
  request<T>(name: string, value: string = ""): Promise<T> {
    return new Promise(resolve => {
      ;(window as any).opacityResponse[name] = ({ data }) => {
        resolve(data)
      }
      const requestData = value ? { name, value } : { name }
      ;(window as any).webkit.messageHandlers.opacityBrowser.postMessage(requestData)
    })
  }
}

export default PostMessageManager