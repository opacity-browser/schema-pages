export default class PostMessage {
  request<T>(name: string, value: string = ""): Promise<T> {
    return new Promise((resolve) => {
      ;(window as any).opacityResponse = (window as any).opacityResponse || {}
      ;(window as any).opacityResponse[name] = ({ data }: { data: T }) => {
        resolve(data)
      }
      const requestData = value ? { name, value } : { name }
      ;(window as any).webkit.messageHandlers.opacityBrowser.postMessage(
        requestData
      )
    })
  }
}
