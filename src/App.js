import React, { Component } from 'react';

import './App.css';

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';


import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

class App extends Component {
  componentDidMount() {

    window.onblur = function (event) {
      if (document.fullscreenElement) {
        event.preventDefault()
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }


    this.player = videojs(this.videoNode, this.props, () => {
      // print version information at startup
      const version_info = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      videojs.log(version_info);
    });

    this.player.on('deviceReady', () => {
      this.player.record().start();
      document.addEventListener('fullscreenchange', (event) => {
        if (document.fullscreenElement) {
          console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
        } else {
          event.preventDefault();
          var question = window.confirm('Apakah anda yakin untuk keluar mode fullscreen? ')
          if (!question) {
            this.fullscreen();
          } else {
            this.player.record().stopDevice();
          }
        }
      });

    });

    this.player.on('startRecord', () => {
      this.fullscreen();
    });

    this.player.on('finishRecord', () => {
      this.player.record().saveAs({ 'video': 'video1.mp4' });
    });

    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  fullscreen() {
    var elem = document.getElementById("myVideo")
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        alert(`coba lagi ada kemungkina error ketika menggunakan button ESC`);
      });
    }
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }


  render() {
    return (
      <div>

        <div data-vjs-player>
          <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
        </div>
        <button onClick={() => { this.player.record().getDevice() }}>PLAY</button>

        <button onClick={() => { this.player.record().stopDevice() }}>STOP</button>
      </div>
    );
  }
}

export default App;