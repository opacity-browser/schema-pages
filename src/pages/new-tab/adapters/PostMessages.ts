import PostMessageManager from '../../../managers/PostMessageManager'
import { IStringData } from '../interfaces/localizable'

class PostMessages {
  postMessage: PostMessageManager

  constructor() {
    this.postMessage = new PostMessageManager()
  }

}

export default new PostMessages()