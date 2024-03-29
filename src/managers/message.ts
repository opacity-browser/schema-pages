class BrowserMessageManager {
  request(name: string, value: string = ""): any {
    return new Promise(resolve => {
      ;(window as any).opacityResponse[name] = ({ data }) => {
        console.log(data)
        resolve(data)
      }
      const requestData = value ? { name, value } : { name }
      ;(window as any).webkit.messageHandlers.opacityBrowser.postMessage(requestData)
    })
  }
}

export default new BrowserMessageManager()