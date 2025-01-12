# Video-calling-app-using-WebRTC

**How WebRTC works in the browser?**

WEBRTC is basically web real-time communication through browsers. It allows communication between browsers. A WEBRTC web application is programmed as a mixture of HTML and JavaScript.The user can also use CSS to customize the look of communication. It works and communicates with web browsers through the standardized WebRTC API. The WebRTC API must, therefore, provide a range of utilities. Some of them are like connection management (in a peer-to-peer manner), encoding/decoding capabilities negotiation, selection, and control, media control, firewall etc. To understand WEBRTC communication in browsers you must go through the different components and architecture.

The scope of implementation in WebRTC is very high as it is highly customizable. The functioning of WEBRTC can be divided into ***three components***:

1.  **MediaStream**: The first step is to have the data that the user want to share. In this case, the stream that user want (audio/video), the mode of communication to establish is captured. Local media stream grants the browser to have access to stream devices such as the camera, web microphone. It also allows the browser to capture media. A user can make use of *`getUserMedia()`* function to get the access from the browser.
2.  **RTCPeerConnection**: Once the user has decided stream of communication then the next step is to connect it with the partner's system. It allows your browser to exchange data directly with partner browsers (peers) for voice and video calls. It allows the association between the sender and the receiver through *STUN *and *TURN *servers.
3.  **RTCDataChannel**: It grants the browsers to exchange data bidirectional peer-to-peer. `CreateDataChannel()` function is called for the first time on an instantiated PeerConnection object.

**WebRTC Triangle:**

<p align="center">
  <img src="https://media.geeksforgeeks.org/wp-content/uploads/Untitled-drawing-46.jpg" alt="WebRTC Triangle" width="70%">
</p>





-   WEBRTC contains *three different layers* of API for web developers. The first layer contains all the APIs web developer demands, including RTCPeerConnection, RTCDataChannel, and media stream objects and their functions. Second is the API for browser makers. The third is the Overridable API, which browser makers can hook.
-   If you look at the WebRTC architecture from the client-server side then you can see that one of the most commonly used models is inspired by the SIP(Session Initiation Protocol) Trapezoid.
-   Imagine you and your friend are running WEBRTC application. You want to communicate with your friend. Then the signaling messages are used whose work is to set up and end communications.
-   These messages are transported to web servers by the HTTP or WebSocket protocol that can modify, translate, or manage them as needed.
-   As to the data path, a PeerConnection allows media to flow directly between browsers without any intervening servers. The two web servers can communicate using a standard signaling protocol and communication is established between you and your friend.

**Limitations of WebRTC:**

-   One must have access to a fast internet connection to communicate with WEBRTC.
-   It does not offer any offline services.
-   It is not available in all the browsers.
-   There is no fixed service providing a base for every browser. It is constantly updating and some software may offer more sophisticated services than others with easy access and other facilities.

**Future of WebRTC:** In the world of social media, there are more than 5 billion users which are using online communication. You can observe the one-touch video calling feature on your mobile or system without installing any plugins and downloads. WebRTC is currently improving the quality of video calling in case of poor connection or slow internet access. Soon WebRTC will become the standard for the companies which offer customer service. It will be the future of business communication.
